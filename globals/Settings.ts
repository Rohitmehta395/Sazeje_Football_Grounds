import type { GlobalConfig } from 'payload'
import { autoTranslateSettingsHook } from '../lib/services/cmsAutoTranslate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
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
      name: 'contactEmail',
      type: 'email',
      required: false,
      admin: {
        description: 'Primary contact/inquiry email address',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'siteTagline',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Short website tagline/meta description (Dutch)',
          },
        },
        {
          name: 'siteTaglineEn',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Short website tagline/meta description (English)',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      admin: {
        description: 'Social media profile URLs',
      },
      fields: [
        {
          name: 'instagram',
          type: 'text',
          required: false,
          admin: {
            description: 'Instagram profile URL (e.g. https://instagram.com/sazejefootball)',
          },
        },
        {
          name: 'x',
          type: 'text',
          required: false,
          admin: {
            description: 'X / Twitter profile URL (e.g. https://x.com/sazejefootball)',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          required: false,
          admin: {
            description: 'Facebook page URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          required: false,
          admin: {
            description: 'YouTube channel URL',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [autoTranslateSettingsHook],
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/', 'layout')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}

