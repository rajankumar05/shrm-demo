/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import carouselPromoParser from './parsers/carousel-promo.js';
import cardsNewsParser from './parsers/cards-news.js';
import cardsStatsParser from './parsers/cards-stats.js';
import tabsBenefitsParser from './parsers/tabs-benefits.js';
import heroCtaParser from './parsers/hero-cta.js';
import cardsToolsParser from './parsers/cards-tools.js';
import heroCertParser from './parsers/hero-cert.js';
import cardsEventsParser from './parsers/cards-events.js';
import heroBusinessParser from './parsers/hero-business.js';
import carouselLogosParser from './parsers/carousel-logos.js';

// TRANSFORMER IMPORTS
import shrmCleanupTransformer from './transformers/shrm-cleanup.js';
import shrmSectionsTransformer from './transformers/shrm-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'carousel-promo': carouselPromoParser,
  'cards-news': cardsNewsParser,
  'cards-stats': cardsStatsParser,
  'tabs-benefits': tabsBenefitsParser,
  'hero-cta': heroCtaParser,
  'cards-tools': cardsToolsParser,
  'hero-cert': heroCertParser,
  'cards-events': cardsEventsParser,
  'hero-business': heroBusinessParser,
  'carousel-logos': carouselLogosParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'SHRM homepage with hero, featured content, and promotional sections',
  urls: [
    'https://www.shrm.org/home',
  ],
  blocks: [
    { name: 'hero-banner', instances: ['#homehero'] },
    { name: 'carousel-promo', instances: ['#carousel-6016e49ff8'] },
    { name: 'cards-news', instances: ['.newsfeed.list.withImage'] },
    { name: 'cards-stats', instances: ['.metricicon'] },
    { name: 'tabs-benefits', instances: ['.verticalTabs.tabs'] },
    { name: 'hero-cta', instances: ['.video-background.color-overlay'] },
    { name: 'cards-tools', instances: ['.newsfeed.list.withoutImage'] },
    { name: 'hero-cert', instances: ['.hero.bg-green'] },
    { name: 'cards-events', instances: ['#container-b03f3a4eaf'] },
    { name: 'hero-business', instances: ['.hero.bg-orange'] },
    { name: 'carousel-logos', instances: ['.ticker-container'] },
  ],
  sections: [
    { id: 'section-1', name: 'Hero', selector: '#homehero', style: null, blocks: ['hero-banner'], defaultContent: [] },
    { id: 'section-2', name: 'Promotional Carousel', selector: '.video-background.color-overlay-gradient', style: 'dark', blocks: ['carousel-promo'], defaultContent: [] },
    { id: 'section-3', name: "Today's Top Workplace News", selector: '#container-e8b2f0146a', style: null, blocks: ['cards-news'], defaultContent: ['#title-5b9fc5d4e3', '#text-a38e945f20'] },
    { id: 'section-4', name: 'Impact Stats', selector: '#container-4ba180259b', style: 'dark', blocks: ['cards-stats'], defaultContent: ['#title-daf55258c4', '#text-cddf6eef86', '#button-4a1ce903c5'] },
    { id: 'section-5', name: 'Premier Benefits', selector: '#container-2a40fd32e1', style: null, blocks: ['tabs-benefits'], defaultContent: ['#title-a43e3bb7d0', '#text-2f7017193e'] },
    { id: 'section-6', name: 'BEAM Framework CTA', selector: '.video-background.color-overlay', style: null, blocks: ['hero-cta'], defaultContent: [] },
    { id: 'section-7', name: 'Top Tools and Programs', selector: '#container-4e69f443ad', style: null, blocks: ['cards-tools'], defaultContent: ['#title-81e6a0dc5d', '#text-b03a8e34be'] },
    { id: 'section-8', name: 'SHRM Certification', selector: '.hero.bg-green', style: null, blocks: ['hero-cert'], defaultContent: [] },
    { id: 'section-9', name: 'Premier Events', selector: '#container-b03f3a4eaf', style: null, blocks: ['cards-events'], defaultContent: ['#title-36649b4c90', '#text-8ad5715611'] },
    { id: 'section-10', name: 'SHRM Business', selector: '#container-3e5aa060d0', style: null, blocks: ['hero-business'], defaultContent: [] },
    { id: 'section-11', name: 'Trusted By', selector: '#video-background-70353e2857', style: null, blocks: ['carousel-logos'], defaultContent: ['#title-9b9206e1ac'] },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  shrmCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [shrmSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Remove any remaining elements with bracket-containing URLs (tracking pixels)
    // These break WebImporter.rules.adjustImageUrls regex
    // Also scan full document since adjustImageUrls may scan beyond main
    [main, document.body, document.documentElement].forEach((root) => {
      if (!root) return;
      root.querySelectorAll('img, iframe, script').forEach((el) => {
        const src = el.getAttribute('src') || '';
        if (src.includes('[') || src.includes('usbrowserspeed') || src.includes('dpmsrv')) {
          el.remove();
        }
      });
    });

    // 6. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 7. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
