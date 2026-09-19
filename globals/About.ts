import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
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
                description: 'Eyebrow tag in Dutch (e.g. OVER & DOELEN)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. ABOUT & GOALS)',
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
                description: 'Hero title in Dutch (e.g. Over SaZeJe Football)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. About SaZeJe Football)',
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
            description: 'Custom background image for the About Hero banner (optional)',
          },
        },
      ],
    },
    {
      name: 'story',
      type: 'group',
      label: 'Bio & Groundhopper Story',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'badge',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Bio tag in Dutch (e.g. GROUNDHOPPER & VERZAMELAAR)',
              },
            },
            {
              name: 'badgeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Bio tag in English (e.g. GROUNDHOPPER & COLLECTOR)',
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
                description: 'Bio heading in Dutch (e.g. Het Verhaal Achter SaZeJe)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Bio heading in English (e.g. The Story Behind SaZeJe)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'lead',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Bold editorial intro/quote in Dutch',
              },
            },
            {
              name: 'leadEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Bold editorial intro/quote in English',
              },
            },
          ],
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Story Paragraphs',
          admin: {
            description: 'Add as many paragraphs as you like for the story',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paragraph',
                  type: 'textarea',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Paragraph content (Dutch)',
                  },
                },
                {
                  name: 'paragraphEn',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                    description: 'Paragraph content (English)',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quote',
              type: 'text',
              admin: {
                width: '70%',
                description: 'Inspirational groundhopping quote/motto',
              },
            },
            {
              name: 'quoteAuthor',
              type: 'text',
              admin: {
                width: '30%',
                description: 'Quote attribution (e.g. SaZeJe Football)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'group',
      label: 'About Photos & Showcase',
      fields: [
        {
          name: 'secondaryImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Featured showcase photo (e.g. stadium atmosphere or matchday)',
          },
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Additional Gallery Photos',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Photo caption (Dutch)',
                  },
                },
                {
                  name: 'captionEn',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Photo caption (English)',
                  },
                },
              ],
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
          revalidatePath('/about')
          revalidatePath('/about/goals')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
