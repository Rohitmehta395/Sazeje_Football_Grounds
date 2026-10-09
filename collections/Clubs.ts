import type { CollectionConfig } from 'payload'
import { getMediaId, safeDeleteMedia } from '../lib/services/cloudinaryCleanup'

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'logo', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ req, previousDoc, doc, operation }) => {
        if (operation === 'update') {
          const oldLogoId = getMediaId(previousDoc?.logo)
          const newLogoId = getMediaId(doc?.logo)
          if (oldLogoId && oldLogoId !== newLogoId) {
            await safeDeleteMedia(req.payload, oldLogoId)
          }
        }
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        const logoId = getMediaId(doc?.logo)
        if (logoId) {
          await safeDeleteMedia(req.payload, logoId)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
