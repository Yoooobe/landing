import {defineField, defineType} from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Sessão: Hero Principal',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Título Principal (Headline)',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtítulo',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do Botão CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link do Botão',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Hero Block (Vazio)',
        subtitle: subtitle,
      }
    }
  }
})
