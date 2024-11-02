import {defineField} from 'sanity'

export default defineField({
  name: 'specs',
  title: 'Product Specs',
  type: 'array',
  of: [
    {
      name: 'spec',
      title: 'Product Spec',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          title: 'title',
          description: 'description',
        },
        prepare(selection) {
          const {title, description} = selection
          const descriptionText = description?.[0]?.children
            ? description[0].children.map((child: any) => child.text).join(' ')
            : 'No description'

          return {
            title: title,
            subtitle: descriptionText,
          }
        },
      },
    },
  ],
})
