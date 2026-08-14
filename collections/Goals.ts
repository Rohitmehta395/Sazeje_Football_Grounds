import type { CollectionConfig } from 'payload'

export const Goals: CollectionConfig = {
  slug: 'goals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'currentCount', 'targetCount', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'number',
      type: 'number',
      required: true,
      unique: true,
      admin: {
        description: 'Goal display order number (e.g. 1, 2, 3)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Goal objective title (e.g. 50 Grounds in Europa, 100 Sjaals)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Goal description and motivation',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'currentCount',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Current progress count',
          },
        },
        {
          name: 'targetCount',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            description: 'Target goal count',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'in_progress',
      options: [
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        description: 'Current achievement status',
      },
    },
    {
      name: 'details',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Extra milestones or notes',
      },
    },
  ],
}
