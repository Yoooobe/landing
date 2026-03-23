import {defineField, defineType} from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menu de Navegação',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Itens do Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Rótulo'}),
            defineField({name: 'url', type: 'string', title: 'URL'}),
          ]
        }
      ]
    })
  ]
})
