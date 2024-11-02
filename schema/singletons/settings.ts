import {CogIcon, EarthGlobeIcon, ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const TITLE = 'Settings'

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'layout',
      title: 'Layout',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Announcement
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'string',
      group: 'layout',
    }),
    // Shop Menu
    defineField({
      name: 'shopMenu',
      title: 'Shop Menu',
      type: 'array',
      group: 'layout',
      of: [
        {
          name: 'productCollection',
          title: 'Product Collection',
          type: 'reference',
          to: [{type: 'productCollection'}],
        },
      ],
    }),
    // Image Carousel
    defineField({
      name: 'imageCarousel',
      title: 'Image Carousel',
      type: 'array',
      icon: ImageIcon,
      group: 'layout',
      of: [
        {
          type: 'image',
          name: 'image',
          title: 'Image',
        },
      ],
    }),
    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      icon: EarthGlobeIcon,
      group: 'layout',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({title, subtitle}) {
              return {
                title: title === 'other' ? 'Other' : title.charAt(0).toUpperCase() + title.slice(1),
                subtitle: subtitle,
              }
            },
          },
        },
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Defaults for every page',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Site title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (rule) =>
            rule.max(150).warning('Longer descriptions may be truncated by search engines'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
