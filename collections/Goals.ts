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
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/about')
          if (doc?.number) {
            revalidatePath(`/about/goals/${doc.number}`)
            revalidatePath(`/about/goals/doel${doc.number}`)
          }
          if (doc?.id) {
            revalidatePath(`/about/goals/${doc.id}`)
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
          revalidatePath('/about')
          if (doc?.number) {
            revalidatePath(`/about/goals/${doc.number}`)
            revalidatePath(`/about/goals/doel${doc.number}`)
          }
          if (doc?.id) {
            revalidatePath(`/about/goals/${doc.id}`)
          }
        } catch {
          // Safe catch during static builds/scripts
        }
      },
    ],
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
        description: 'Goal objective title (Dutch - e.g. 50 Grounds in Europa, 100 Sjaals)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'titleEn',
          type: 'text',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of goal title',
          },
        },
        {
          name: 'titleEnStatus',
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
        description: 'Goal description and motivation (Dutch)',
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
            description: 'English translation of goal description',
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
        description: 'Extra milestones or notes (Dutch)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'detailsEn',
          type: 'textarea',
          required: false,
          admin: {
            width: '75%',
            description: 'English translation of extra milestones/notes',
          },
        },
        {
          name: 'detailsEnStatus',
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
  ],
}
