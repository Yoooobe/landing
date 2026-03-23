import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Páginas da Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo (Sessões)',
      type: 'array',
      of: [
        { type: 'heroBlock' }
      ]
    })
  ]
})
