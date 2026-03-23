import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO Otimização',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Titles longos são cortados no Google')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160).warning('Descrições muito longas são cortadas')
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Imagem de Compartilhamento (Open Graph)',
      type: 'image',
    })
  ]
})
