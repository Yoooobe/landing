import { type SchemaTypeDefinition } from 'sanity'

import { menuType } from './menuType'
import { pageType } from './pageType'
import { heroBlock } from './blocks/heroBlock'
import { seoType } from './seoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    menuType,
    pageType,
    heroBlock,
    seoType,
  ],
}
