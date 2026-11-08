import type { CollectionConfig } from 'payload'
import { autoTranslateScarfHook } from '../lib/services/cmsAutoTranslate'

export const Scarves: CollectionConfig = {
  slug: 'scarves',
  admin: {
    useAsTitle: 'club',
    defaultColumns: ['club', 'category', 'country', 'type', 'photo'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [autoTranslateScarfHook],
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/scarves')
          if (doc?.category) {
            revalidatePath(`/scarves/${doc.category}`)
            if (doc?.country) {
              revalidatePath(
                `/scarves/${doc.category}/${encodeURIComponent(doc.country)}`
              )
            }
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
          revalidatePath('/scarves')
          if (doc?.category) {
            revalidatePath(`/scarves/${doc.category}`)
            if (doc?.country) {
              revalidatePath(
                `/scarves/${doc.category}/${encodeURIComponent(doc.country)}`
              )
            }
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'New (Self-Bought at Ground)', value: 'new' },
        { label: 'Secondhand / Gifted', value: 'secondhand' },
        { label: 'Special Editions (Anniversary / Limited)', value: 'special-editions' },
        { label: 'Matchdays (Duels & Finals)', value: 'matchdays' },
      ],
      admin: {
        description: 'Scarf category (New, Secondhand, Special Editions, or Matchdays)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'club',
          type: 'text',
          required: true,
          admin: {
            width: '60%',
            description: 'Club name (e.g. Real Madrid, Arsenal, Ajax, SK Brann, Werder Bremen)',
          },
        },
        {
          name: 'clubLogo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            width: '40%',
            description: 'Club logo (upload image or select from Media)',
          },
        },
      ],
    },
    {
      name: 'clubRelationship',
      type: 'relationship',
      relationTo: 'clubs',
      required: false,
      admin: {
        description: 'Optional link to a Club record from Clubs collection',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          admin: {
            width: '34%',
            description: 'Country name in Dutch matching static country list (e.g. Nederland, Spanje, Engeland, Noorwegen)',
          },
        },
        {
          name: 'countryFlag',
          type: 'text',
          required: false,
          admin: {
            width: '33%',
            description: 'Country flag emoji or code (e.g. 🇳🇴, 🇬🇧, 🇪🇸, 🇩🇪, 🇳🇱). If left empty, auto-resolves from Country.',
          },
        },
        {
          name: 'league',
          type: 'text',
          required: false,
          admin: {
            width: '33%',
            description: 'League / competition name (e.g. Eliteserien, Premier League, La Liga, or 🇳🇴 Eliteserien)',
          },
        },
      ],
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Scarf type / material (e.g. Geweven sjaal, HD Jacquard, Barscarf)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'typeEn',
          type: 'text',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of scarf type / material (Auto-translated or edited)',
          },
        },
        {
          name: 'typeEnStatus',
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
        description: 'Scarf design description (Dutch)',
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
            description: 'English translation of scarf description',
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
      type: 'row',
      fields: [
        {
          name: 'stadium',
          type: 'text',
          required: true,
          admin: {
            width: '60%',
            description: 'Club stadium name (e.g. Anfield, Weserstadion)',
          },
        },
        {
          name: 'town',
          type: 'text',
          required: false,
          admin: {
            width: '40%',
            description: 'Town or city (e.g. Liverpool, Bremen, Bergen)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'founded',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'Club founding year (e.g. 1892, 1899)',
          },
        },
        {
          name: 'seasonsInTopDivision',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Seasons in top division (e.g. 63 seasons, 35 seizoenen)',
          },
        },
      ],
    },
    {
      name: 'clubCategory',
      type: 'text',
      required: false,
      admin: {
        description: 'Club category/status (e.g. Professional, Amateur). If left empty, uses category.',
      },
    },
    {
      name: 'trophies',
      type: 'text',
      required: true,
      admin: {
        description: 'Key honors / prizes summary (Prizes)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'trophiesEn',
          type: 'text',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of trophy summary',
          },
        },
        {
          name: 'trophiesEnStatus',
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
      name: 'funFact',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Interesting trivia or fun fact about the club/scarf (Dutch)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'funFactEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of fun fact',
          },
        },
        {
          name: 'funFactEnStatus',
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
        description: 'Single high-quality photo of the scarf',
      },
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
