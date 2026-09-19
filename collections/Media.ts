import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { autoTranslateMediaHook } from '../lib/services/cmsAutoTranslate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [autoTranslateMediaHook],
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
