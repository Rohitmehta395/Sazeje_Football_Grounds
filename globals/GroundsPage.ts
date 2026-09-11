import type { GlobalConfig } from 'payload'

export const GroundsPage: GlobalConfig = {
  slug: 'grounds-page',
  label: 'Grounds Page',
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
                description: 'Eyebrow tag in Dutch (e.g. GROUNDHOPPING ARCHIEF • EST. 2024)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. GROUNDHOPPING ARCHIVE • EST. 2024)',
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
                description: 'Hero title in Dutch (e.g. Bezochte Grounds & Stadions)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. Visited Grounds & Stadiums)',
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
            description: 'Custom background image for the Grounds Hero banner (optional)',
          },
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      label: 'Editorial Intro & Philosophy',
      fields: [
        {
          name: 'showIntro',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show editorial intro card above stadium filters',
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
                description: 'Badge/tag in Dutch (e.g. AUTHENTIEKE SUPPORTERSCULTUUR)',
              },
            },
            {
              name: 'badgeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Badge/tag in English (e.g. AUTHENTIC TERRACE CULTURE)',
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
                description: 'Editorial description in Dutch',
              },
            },
            {
              name: 'textEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Editorial description in English',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Grounds Stats Counter',
      fields: [
        {
          name: 'showStats',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show live dynamic stats banner (Total Grounds, Countries, Competitions)',
          },
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
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/grounds')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
