import type { GlobalConfig } from 'payload'
import { autoTranslateHomePageHook } from '../lib/services/cmsAutoTranslate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
      name: 'hero',
      type: 'group',
      label: 'Hero Section & Slideshow',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in Dutch (e.g. WELKOM BIJ SAZEJE GROUNDHOPPING)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. WELCOME TO SAZEJE GROUNDHOPPING)',
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
                description: 'Hero title in Dutch (e.g. SAZEJE GROUNDHOPPING ARCHIEF)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. SAZEJE GROUNDHOPPING ARCHIVE)',
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
          type: 'row',
          fields: [
            {
              name: 'topbarLabel',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Archive badge label in Dutch (e.g. SAZEJE GROUNDHOPPING ARCHIEF • 2024–2026)',
              },
            },
            {
              name: 'topbarLabelEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Archive badge label in English (e.g. SAZEJE GROUNDHOPPING ARCHIVE • 2024–2026)',
              },
            },
          ],
        },
        {
          name: 'slides',
          type: 'array',
          label: 'Hero Slideshow Images',
          admin: {
            description:
              'Upload and manage multiple stadium photos for the looping homepage hero slideshow. Drag to reorder.',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Select or upload a stadium background image',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Stadium name or match description (e.g. "MHPArena, Stuttgart • Europa League")',
                  },
                },
                {
                  name: 'captionEn',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Stadium name or match description in English',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'slideshowSettings',
          type: 'group',
          label: 'Slideshow Settings',
          admin: {
            description: 'Configure loop timing and autoplay for the hero slideshow.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'interval',
                  type: 'number',
                  defaultValue: 6,
                  min: 2,
                  max: 30,
                  admin: {
                    width: '50%',
                    description: 'Slide interval (seconds)',
                  },
                },
                {
                  name: 'enableAutoplay',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    width: '50%',
                    description: 'Auto-advance slides in a loop',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Metadata',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Page title tag in Dutch',
              },
            },
            {
              name: 'metaTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Page title tag in English',
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
                description: 'Meta description in Dutch',
              },
            },
            {
              name: 'metaDescriptionEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Meta description in English',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [autoTranslateHomePageHook],
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
