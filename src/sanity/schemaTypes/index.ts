import { type SchemaTypeDefinition } from "sanity";

import { blogPostType } from "./blogPostType";
import { caseStudyGridBlock } from "./blocks/caseStudyGridBlock";
import { contentMirrorType } from "./contentMirrorType";
import { ctaBlock } from "./blocks/ctaBlock";
import { faqBlock } from "./blocks/faqBlock";
import { featureGridBlock } from "./blocks/featureGridBlock";
import { homeShowcaseMediaType } from "./homeShowcaseMediaType";
import { gamificacaoShowcaseMediaType } from "./gamificacaoShowcaseMediaType";
import { apiIntegracoesShowcaseMediaType } from "./apiIntegracoesShowcaseMediaType";
import { menuType } from "./menuType";
import { pageType } from "./pageType";
import { platformShowcaseMediaType } from "./platformShowcaseMediaType";
import { heroBlock } from "./blocks/heroBlock";
import { legacySectionBlock } from "./blocks/legacySectionBlock";
import { logoStripBlock } from "./blocks/logoStripBlock";
import { logoCollectionType } from "./logoCollectionType";
import { richTextSection } from "./blocks/richTextSection";
import { seoType } from "./seoType";
import { siteSettingsType } from "./siteSettingsType";
import { splitContentBlock } from "./blocks/splitContentBlock";
import { statsBlock } from "./blocks/statsBlock";
import { testimonialBlock } from "./blocks/testimonialBlock";
import { marketingPageType } from "./marketingPageType";
import { marketingStrategyType } from "./marketingStrategyType";
import { workvivoShowcaseMediaType } from "./workvivoShowcaseMediaType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    menuType,
    pageType,
    blogPostType,
    caseStudyGridBlock,
    contentMirrorType,
    marketingPageType,
    marketingStrategyType,
    heroBlock,
    legacySectionBlock,
    richTextSection,
    ctaBlock,
    faqBlock,
    featureGridBlock,
    homeShowcaseMediaType,
    gamificacaoShowcaseMediaType,
    apiIntegracoesShowcaseMediaType,
    splitContentBlock,
    logoStripBlock,
    logoCollectionType,
    platformShowcaseMediaType,
    statsBlock,
    testimonialBlock,
    seoType,
    siteSettingsType,
    workvivoShowcaseMediaType,
  ],
};
