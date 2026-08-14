import type { CollectionConfig } from 'payload'

export const Scarves: CollectionConfig = {
  slug: 'scarves',
  admin: {
    useAsTitle: 'club',
    defaultColumns: ['club', 'category', 'country', 'type', 'photo'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'New (Self-Bought at Ground)', value: 'new' },
        { label: 'Secondhand / Gifted', value: 'secondhand' },
      ],
      admin: {
        description: 'Scarf category (New or Secondhand)',
      },
    },
    {
      name: 'club',
      type: 'text',
      required: true,
      admin: {
        description: 'Club name (e.g. Real Madrid, Arsenal, Ajax)',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      admin: {
        description: 'Country name in Dutch matching static country list (e.g. Nederland, Spanje, Engeland)',
      },
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
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Scarf design description',
      },
    },
    {
      name: 'stadium',
      type: 'text',
      required: true,
      admin: {
        description: 'Club stadium name',
      },
    },
    {
      name: 'founded',
      type: 'text',
      required: true,
      admin: {
        description: 'Club founding year (e.g. 1899, 1900)',
      },
    },
    {
      name: 'trophies',
      type: 'text',
      required: true,
      admin: {
        description: 'Key honors / trophy summary',
      },
    },
    {
      name: 'funFact',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Interesting trivia or fun fact about the club/scarf',
      },
    },
    {
      name: 'purchaseDate',
      type: 'date',
      required: false,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        description: 'Purchase date (optional, relevant for new scarves)',
      },
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
