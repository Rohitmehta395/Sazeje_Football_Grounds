import type { GlobalConfig } from 'payload'
import { autoTranslateContactPageHook } from '../lib/services/cmsAutoTranslate'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
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
                description: 'Eyebrow tag in Dutch (e.g. COMMUNITY & VERBINDING)',
              },
            },
            {
              name: 'eyebrowEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Eyebrow tag in English (e.g. COMMUNITY & CONNECT)',
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
                description: 'Hero title in Dutch (e.g. Neem Contact Op)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Hero title in English (e.g. Get in Touch)',
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
            description: 'Custom background image for the Contact Hero banner (optional)',
          },
        },
      ],
    },
    {
      name: 'directInfo',
      type: 'group',
      label: 'Direct Contact Info Card',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'badge',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Card badge in Dutch (e.g. DIRECT CONTACT)',
              },
            },
            {
              name: 'badgeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Card badge in English (e.g. DIRECT CHANNELS)',
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
                description: 'Heading in Dutch (e.g. Direct Contact & Matchday Vragen)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Heading in English (e.g. Direct Contact & Matchday Inquiries)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Description in Dutch',
              },
            },
            {
              name: 'descriptionEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Description in English',
              },
            },
          ],
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Contact email (leave blank to use General Settings email)',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'responseTime',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Response time in Dutch (e.g. Binnen 24-48 uur)',
              },
            },
            {
              name: 'responseTimeEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Response time in English (e.g. Within 24-48 hours)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'location',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Location in Dutch (e.g. Nederland (Reizend door Europa))',
              },
            },
            {
              name: 'locationEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Location in English (e.g. Netherlands (Traveling Europe))',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      label: 'Social Media Section',
      fields: [
        {
          name: 'showSocials',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display social channel links in the contact sidebar',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Socials card title in Dutch (e.g. Volg SaZeJe Football)',
              },
            },
            {
              name: 'titleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Socials card title in English (e.g. Follow SaZeJe Football)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Socials card subtitle in Dutch',
              },
            },
            {
              name: 'subtitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Socials card subtitle in English',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'reasons',
      type: 'group',
      label: 'Why Connect Cards (Community Highlights)',
      fields: [
        {
          name: 'showReasons',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display "Why Connect" cards on the contact page',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sectionTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Section heading in Dutch (e.g. Waarom Contact Opnemen?)',
              },
            },
            {
              name: 'sectionTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Section heading in English (e.g. Why Connect With Us?)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sectionSubtitle',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Section subtitle in Dutch',
              },
            },
            {
              name: 'sectionSubtitleEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'Section subtitle in English',
              },
            },
          ],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Highlight Cards',
          labels: {
            singular: 'Card',
            plural: 'Cards',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Tag in Dutch (e.g. GROUNDHOPPING)',
                  },
                },
                {
                  name: 'tagEn',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Tag in English',
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
                    description: 'Title in Dutch',
                  },
                },
                {
                  name: 'titleEn',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Title in English',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                    description: 'Description in Dutch',
                  },
                },
                {
                  name: 'descriptionEn',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                    description: 'Description in English',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'ground',
                  options: [
                    { label: 'Stadium / Ground (Groundhopping)', value: 'ground' },
                    { label: 'Scarf (Vintage Scarf Swap)', value: 'scarf' },
                    { label: 'Camera (Matchday Photography & Stories)', value: 'camera' },
                    { label: 'Handshake / Collaboration', value: 'collab' },
                    { label: 'Chat / General Inquiry', value: 'general' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'defaultTopic',
                  type: 'select',
                  defaultValue: 'ground_tip',
                  options: [
                    { label: '🏟️ Ground Tip', value: 'ground_tip' },
                    { label: '🧣 Scarf Swap Offer', value: 'scarf_swap' },
                    { label: '🤝 Collaboration', value: 'collaboration' },
                    { label: '💬 General Question', value: 'general' },
                  ],
                  admin: {
                    width: '50%',
                    description: 'Topic to automatically activate in the form on click',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'Frequently Asked Questions (FAQ)',
      fields: [
        {
          name: 'showFaq',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display FAQ accordion section',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sectionTitle',
              type: 'text',
              admin: {
                width: '50%',
                description: 'FAQ section title in Dutch (e.g. Veelgestelde Vragen)',
              },
            },
            {
              name: 'sectionTitleEn',
              type: 'text',
              admin: {
                width: '50%',
                description: 'FAQ section title in English (e.g. Frequently Asked Questions)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sectionSubtitle',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'FAQ section subtitle in Dutch',
              },
            },
            {
              name: 'sectionSubtitleEn',
              type: 'textarea',
              admin: {
                width: '50%',
                description: 'FAQ section subtitle in English',
              },
            },
          ],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Questions & Answers',
          labels: {
            singular: 'FAQ',
            plural: 'FAQs',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Question in Dutch',
                  },
                },
                {
                  name: 'questionEn',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Question in English',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'answer',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                    description: 'Answer in Dutch',
                  },
                },
                {
                  name: 'answerEn',
                  type: 'textarea',
                  admin: {
                    width: '50%',
                    description: 'Answer in English',
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
      label: 'Search Engine Optimization (SEO)',
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
    beforeChange: [autoTranslateContactPageHook],
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/contact')
          revalidatePath('/')
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
  },
}
