import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { autoTranslateMediaHook } from '../lib/services/cmsAutoTranslate'
import { deleteAssetFromCloudinary } from '../lib/services/cloudinaryCleanup'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
    staticDir: path.resolve(dirname, '../public/media'),
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [
      autoTranslateMediaHook,
      async ({ req, operation, originalDoc }) => {
        if (operation === 'update' && (req as any).file) {
          const oldPublicId = (originalDoc as any)?.cloudinaryPublicId || (originalDoc as any)?.public_id
          const oldUrl = (originalDoc as any)?.url || (originalDoc as any)?.cloudinaryUrl
          if (oldPublicId || oldUrl) {
            await deleteAssetFromCloudinary(oldPublicId, oldUrl)
          }
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const publicId = (doc as any)?.cloudinaryPublicId || (doc as any)?.public_id
        const url = (doc as any)?.url || (doc as any)?.cloudinaryUrl
        if (publicId || url) {
          await deleteAssetFromCloudinary(publicId, url)
        }
      },
    ],
  },
  fields: [
    {
      name: 'autoTranslateUI',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/AutoTranslateBar#AutoTranslateBar',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Descriptive alt text for accessibility and SEO (Dutch)',
      },
    },
    {
      name: 'altEn',
      type: 'text',
      required: false,
      admin: {
        description: 'Descriptive alt text for accessibility and SEO (English)',
      },
    },
  ],
}
