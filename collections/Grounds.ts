import type { CollectionConfig } from 'payload'
import { autoTranslateGroundHook } from '../lib/services/cmsAutoTranslate'

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const Grounds: CollectionConfig = {
  slug: 'grounds',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'club', 'country', 'visitDate', 'published'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
    beforeChange: [autoTranslateGroundHook],
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
          revalidatePath('/grounds')
          revalidatePath('/map')
          if (doc?.slug) {
            revalidatePath(`/grounds/${doc.slug}`)
          }
          if (doc?.id) {
            revalidatePath(`/grounds/${doc.id}`)
          }
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
          revalidatePath('/grounds')
          revalidatePath('/map')
          if (doc?.slug) {
            revalidatePath(`/grounds/${doc.slug}`)
          }
          if (doc?.id) {
            revalidatePath(`/grounds/${doc.id}`)
          }
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique URL slug (auto-generated from name if left empty)',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Set to true to publish this ground on the live site',
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'club',
          type: 'relationship',
          relationTo: 'clubs',
          required: false,
          admin: {
            width: '50%',
            description: 'Home club (select or create a Club with logo)',
          },
        },
        {
          name: 'awayClub',
          type: 'relationship',
          relationTo: 'clubs',
          required: false,
          admin: {
            width: '50%',
            description: 'Away club for match fixture (select or create a Club with logo)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'Country name in Dutch matching static country list (e.g. Nederland, Spanje, Duitsland)',
          },
        },
        {
          name: 'countryFlag',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            width: '50%',
            description: 'Custom country flag image (optional - overrides default flag)',
          },
        },
      ],
    },
    {
      name: 'competition',
      type: 'text',
      required: true,
      admin: {
        description: 'Competition/League name (e.g. Eredivisie, La Liga, Champions League)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            description: 'Latitude coordinate',
          },
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            description: 'Longitude coordinate',
          },
        },
      ],
    },
    {
      name: 'visitDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        description: 'Date of ground visit',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'spectators',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Toeschouwers / Attendance (e.g. 53.289)',
          },
        },
        {
          name: 'ticketPrice',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Ticketprijs / Ticket price (e.g. € 35, £ 45)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'weather',
          type: 'text',
          required: false,
          admin: {
            width: '40%',
            description: 'Weer / Weather (Dutch, e.g. Bewolkt, 8°C)',
          },
        },
        {
          name: 'weatherEn',
          type: 'text',
          required: false,
          admin: {
            width: '35%',
            description: 'English translation of weather (e.g. Cloudy, 8°C)',
          },
        },
        {
          name: 'weatherEnStatus',
          type: 'select',
          required: true,
          defaultValue: 'auto',
          options: [
            { label: '⚡ Auto (Machine)', value: 'auto' },
            { label: '✏️ Edited (Human)', value: 'edited' },
          ],
          admin: {
            width: '25%',
            description: 'Translation status',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Primary ground description (Dutch)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'descriptionEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation (Auto-translated or edited)',
          },
        },
        {
          name: 'descriptionEnStatus',
          type: 'select',
          required: true,
          defaultValue: 'auto',
          options: [
            { label: '⚡ Auto (Machine)', value: 'auto' },
            { label: '✏️ Edited (Human)', value: 'edited' },
          ],
          admin: {
            width: '25%',
            description: 'Translation status',
          },
        },
      ],
    },
    {
      name: 'story',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Personal visit story/experience (Dutch)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'storyEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of visit story',
          },
        },
        {
          name: 'storyEnStatus',
          type: 'select',
          required: true,
          defaultValue: 'auto',
          options: [
            { label: '⚡ Auto (Machine)', value: 'auto' },
            { label: '✏️ Edited (Human)', value: 'edited' },
          ],
          admin: {
            width: '25%',
            description: 'Translation status',
          },
        },
      ],
    },
    {
      name: 'matchInfo',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Match details (Dutch - e.g. fixture, score, attendance)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'homeTeamLogo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            width: '50%',
            description: 'Custom home team logo override (falls back to Home Club logo)',
          },
        },
        {
          name: 'awayTeamLogo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            width: '50%',
            description: 'Custom away team logo override (falls back to Away Club logo)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'matchInfoEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of match details',
          },
        },
        {
          name: 'matchInfoEnStatus',
          type: 'select',
          required: true,
          defaultValue: 'auto',
          options: [
            { label: '⚡ Auto (Machine)', value: 'auto' },
            { label: '✏️ Edited (Human)', value: 'edited' },
          ],
          admin: {
            width: '25%',
            description: 'Translation status',
          },
        },
      ],
    },
    {
      name: 'extra',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Additional notes or highlights (Dutch)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'extraEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of additional notes',
          },
        },
        {
          name: 'extraEnStatus',
          type: 'select',
          required: true,
          defaultValue: 'auto',
          options: [
            { label: '⚡ Auto (Machine)', value: 'auto' },
            { label: '✏️ Edited (Human)', value: 'edited' },
          ],
          admin: {
            width: '25%',
            description: 'Translation status',
          },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Primary/cover photo of the ground',
      },
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        description: 'Gallery photos of the visit',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'dateAdded',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
