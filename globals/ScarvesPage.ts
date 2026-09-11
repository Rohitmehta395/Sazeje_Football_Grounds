import type { GlobalConfig } from 'payload'

export const ScarvesPage: GlobalConfig = {
  slug: 'scarves-page',
  label: 'Scarves Page',
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
                description: 'Eyebrow tag in Dutch (e.g. SJAALCOLLECTIE • EST. 2024)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. SCARF COLLECTION • EST. 2024)',
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
                description: 'Hero title in Dutch (e.g. Sjaalcollectie)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. Scarf Collection)',
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
            description: 'Custom background image for the Scarves Hero banner (optional)',
          },
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      label: 'Editorial Intro & Collection Philosophy',
      fields: [
        {
          name: 'showIntro',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show editorial intro card above category chooser',
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
                description: 'Badge/tag in Dutch (e.g. DRAAG JE KLEUREN)',
              },
            },
            {
              name: 'badgeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Badge/tag in English (e.g. WEAR YOUR COLOURS)',
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
      name: 'categories',
      type: 'group',
      label: 'Category Cards Content',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'newTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'New scarves title in Dutch (e.g. Nieuwe Sjaals)',
              },
            },
            {
              name: 'newTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'New scarves title in English (e.g. New Scarves)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'newDesc',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'New scarves description in Dutch',
              },
            },
            {
              name: 'newDescEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'New scarves description in English',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondhandTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Secondhand scarves title in Dutch (e.g. Tweedehands Sjaals)',
              },
            },
            {
              name: 'secondhandTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Secondhand scarves title in English (e.g. Secondhand Scarves)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondhandDesc',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Secondhand scarves description in Dutch',
              },
            },
            {
              name: 'secondhandDescEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Secondhand scarves description in English',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Live Stats Counter',
      fields: [
        {
          name: 'showStats',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show live dynamic stats ribbon (Total Scarves, Unique Clubs, Countries)',
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
          revalidatePath('/scarves')
          revalidatePath('/scarves/new')
          revalidatePath('/scarves/secondhand')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
