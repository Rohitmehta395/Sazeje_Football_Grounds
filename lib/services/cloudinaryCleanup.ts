import { v2 as cloudinary } from 'cloudinary'
import type { Payload } from 'payload'

function ensureCloudinaryConfig() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || ''
  const api_key = process.env.CLOUDINARY_API_KEY || ''
  const api_secret = process.env.CLOUDINARY_API_SECRET || ''

  if (cloud_name && api_key && api_secret) {
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    })
    return true
  }

  if (process.env.CLOUDINARY_URL?.startsWith('cloudinary://')) {
    try {
      const parsed = new URL(process.env.CLOUDINARY_URL)
      cloudinary.config({
        cloud_name: parsed.hostname,
        api_key: decodeURIComponent(parsed.username),
        api_secret: decodeURIComponent(parsed.password),
      })
      return true
    } catch {}
  }

  return false
}

export function extractCloudinaryPublicId(urlOrFilename?: string | null): string | null {
  if (!urlOrFilename) return null
  try {
    if (urlOrFilename.includes('cloudinary.com')) {
      const parts = urlOrFilename.split('/')
      const uploadIndex = parts.findIndex((part) => part === 'upload')
      if (uploadIndex !== -1 && uploadIndex < parts.length - 1) {
        // Strip version parameter if present (e.g. v1791575893)
        const afterUpload = parts.slice(uploadIndex + 1)
        const cleanParts = afterUpload[0]?.startsWith('v') && !isNaN(Number(afterUpload[0].slice(1)))
          ? afterUpload.slice(1)
          : afterUpload
        const fullPath = cleanParts.join('/')
        return fullPath.substring(0, fullPath.lastIndexOf('.'))
      }
    }
    if (urlOrFilename.includes('.')) {
      return urlOrFilename.substring(0, urlOrFilename.lastIndexOf('.'))
    }
    return urlOrFilename
  } catch {
    return null
  }
}

/**
 * Directly removes an asset from Cloudinary by its public ID or URL
 */
export async function deleteAssetFromCloudinary(publicId?: string | null, url?: string | null): Promise<void> {
  const targetId = publicId || extractCloudinaryPublicId(url)
  if (!targetId) return

  if (!ensureCloudinaryConfig()) return

  try {
    const res = await cloudinary.uploader.destroy(targetId, {
      resource_type: 'image',
      invalidate: true,
    })
    try {
      await cloudinary.api.delete_derived_resources([targetId], { resource_type: 'image' })
    } catch {}
    console.log(`[Cloudinary Cleanup] Deleted asset "${targetId}" from Cloudinary:`, res?.result || res)
  } catch (error) {
    console.warn(`[Cloudinary Cleanup] Failed to delete asset "${targetId}":`, error)
  }
}

/**
 * Extracts a numeric or string ID from a relationship field value
 */
export function getMediaId(val: unknown): number | string | null {
  if (!val) return null
  if (typeof val === 'number' || typeof val === 'string') return val
  if (typeof val === 'object' && 'id' in val) {
    return (val as { id: number | string }).id
  }
  return null
}

/**
 * Deletes a media document by ID from Payload CMS and Cloudinary
 */
export async function safeDeleteMedia(payload: Payload, mediaId: number | string | null | undefined): Promise<void> {
  if (!mediaId) return

  try {
    // 1. Fetch document first to grab cloudinary details
    const mediaDoc = await payload.findByID({
      collection: 'media',
      id: mediaId,
    })

    if (!mediaDoc) return

    // 2. Delete from Cloudinary directly as a guarantee
    const publicId = (mediaDoc as any).cloudinaryPublicId || (mediaDoc as any).public_id
    const url = (mediaDoc as any).url || (mediaDoc as any).cloudinaryUrl
    await deleteAssetFromCloudinary(publicId, url)

    // 3. Delete media doc from database (also triggers storage plugin hooks)
    await payload.delete({
      collection: 'media',
      id: mediaId,
    })
    console.log(`[Media Cleanup] Deleted orphaned media doc #${mediaId}`)
  } catch (err) {
    console.warn(`[Media Cleanup] Could not delete media doc #${mediaId}:`, err)
  }
}
