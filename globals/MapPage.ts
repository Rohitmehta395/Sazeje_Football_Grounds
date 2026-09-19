import type { GlobalConfig } from 'payload'
import { autoTranslateMapPageHook } from '../lib/services/cmsAutoTranslate'

export const MapPage: GlobalConfig = {
  slug: 'map-page',
  label: 'Map Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in Dutch (e.g. INTERACTIEVE KAART • EUROPA)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. INTERACTIVE MAP • EUROPE)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in Dutch (e.g. Stadionkaart Europa)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. Stadium Map Europe)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Hero subtitle in Dutch',
              },
            },
            {
              name: 'subtitleEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Hero subtitle in English',
              },
            },
          ],
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom background image for the Map Hero banner (optional)',
          },
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      label: 'Editorial Intro & Instructions',
      fields: [
        {
          name: 'showIntro',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show editorial intro card above the stadium map',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'badge',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Badge/tag in Dutch (e.g. GEOGRAFIE VAN HET VOETBAL)',
              },
            },
            {
              name: 'badgeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Badge/tag in English (e.g. FOOTBALL GEOGRAPHY)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'heading',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Heading in Dutch',
              },
            },
            {
              name: 'headingEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Heading in English',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Editorial description / instructions in Dutch',
              },
            },
            {
              name: 'textEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Editorial description / instructions in English',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Meta Settings',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Page title for SEO in Dutch',
              },
            },
            {
              name: 'metaTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Page title for SEO in English',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Meta description for SEO in Dutch',
              },
            },
            {
              name: 'metaDescriptionEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Meta description for SEO in English',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [autoTranslateMapPageHook],
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/map')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
