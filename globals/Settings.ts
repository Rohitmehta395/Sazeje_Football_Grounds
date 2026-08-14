import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'email',
      required: false,
      admin: {
        description: 'Primary contact/inquiry email address',
      },
    },
    {
      name: 'siteTagline',
      type: 'text',
      required: false,
      admin: {
        description: 'Short website tagline/meta description',
      },
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
}
