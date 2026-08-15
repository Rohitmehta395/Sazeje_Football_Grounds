import type { CollectionConfig } from 'payload'

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
      name: 'club',
      type: 'text',
      required: true,
      admin: {
        description: 'Home club name (e.g. AFC Ajax, FC Barcelona)',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country name in Dutch matching static country list (e.g. Nederland, Spanje, Duitsland)',
      },
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
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Primary ground description',
      },
    },
    {
      name: 'story',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Personal visit story/experience',
      },
    },
    {
      name: 'matchInfo',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Match details (e.g. fixture, score, attendance)',
      },
    },
    {
      name: 'extra',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Additional notes or highlights',
      },
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
