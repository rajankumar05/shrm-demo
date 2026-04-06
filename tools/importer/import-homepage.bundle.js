var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1, .mimic-h1");
    const description = element.querySelector(".cmp-text p");
    const ctaLinks = Array.from(element.querySelectorAll(".button__bdl"));
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    ctaLinks.forEach((link) => contentCell.push(link));
    const cells = [contentCell];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-promo.js
  function parse2(element, { document }) {
    const slides = element.querySelectorAll(".cmp-carousel__item");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".cmp-image__image");
      const heading = slide.querySelector(".mimic-h1, h2, h1");
      const cta = slide.querySelector(".button__bdl");
      const description = slide.querySelector(".cmp-text p");
      const imageCell = img ? [img] : [];
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (description) contentCell.push(description);
      if (cta) contentCell.push(cta);
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([...imageCell, ...contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse3(element, { document }) {
    const storycards = element.querySelectorAll(".storycard");
    const cells = [];
    storycards.forEach((card) => {
      const img = card.querySelector(".cmp-image__image");
      const category = card.querySelector(".storycard__type-text");
      const titleLink = card.querySelector(".storycard__title-text a");
      const desc = card.querySelector(".storycard__description-text");
      const imageCol = img ? [img] : [];
      const textCol = [];
      if (category) textCol.push(category);
      if (titleLink) {
        const h = document.createElement("h3");
        h.append(titleLink);
        textCol.push(h);
      }
      if (desc) textCol.push(desc);
      if (imageCol.length > 0) {
        cells.push([imageCol, textCol]);
      } else {
        cells.push([textCol]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse4(element, { document }) {
    const counters = element.querySelectorAll(".counter-grid-column");
    const cells = [];
    counters.forEach((counter) => {
      const number = counter.querySelector(".counter-grid-title");
      const text = counter.querySelector(".counter-grid-text");
      const contentCell = [];
      if (number) contentCell.push(number);
      if (text) contentCell.push(text);
      if (contentCell.length > 0) {
        cells.push([contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-benefits.js
  function parse5(element, { document }) {
    const tabLabels = element.querySelectorAll(".cmp-tabs__tab");
    const tabPanels = element.querySelectorAll(".cmp-tabs__tabpanel");
    const cells = [];
    tabLabels.forEach((label, i) => {
      const panel = tabPanels[i];
      const labelText = label.textContent.trim();
      const contentCell = [];
      if (panel) {
        const img = panel.querySelector(".cmp-image__image");
        const heading = panel.querySelector("h3");
        const desc = panel.querySelector(".cmp-text p, .cmp-tabscard p");
        const cta = panel.querySelector(".button__bdl, a[href]");
        if (img) contentCell.push(img);
        if (heading) contentCell.push(heading);
        if (desc) contentCell.push(desc);
        if (cta) contentCell.push(cta);
      }
      cells.push([[labelText], contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-benefits", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cta.js
  function parse6(element, { document }) {
    const icon = element.querySelector(".icon-xlarge .cmp-image__image, .image.icon-xlarge img");
    const heading = element.querySelector("h2.cmp-title__text, .cmp-title h2");
    const description = element.querySelector(".cmp-text p");
    const cta = element.querySelector(".button__bdl");
    const cells = [];
    if (icon) cells.push([icon]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (cta) contentCell.push(cta);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tools.js
  function parse7(element, { document }) {
    const storycards = element.querySelectorAll(".storycard");
    const cells = [];
    storycards.forEach((card) => {
      const category = card.querySelector(".storycard__type-text");
      const titleLink = card.querySelector(".storycard__title-text a");
      const desc = card.querySelector(".storycard__description-text");
      const contentCell = [];
      if (category) contentCell.push(category);
      if (titleLink) {
        const h = document.createElement("h3");
        h.append(titleLink);
        contentCell.push(h);
      }
      if (desc) contentCell.push(desc);
      cells.push([contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-tools", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cert.js
  function parse8(element, { document }) {
    const heroImage = element.querySelector(".hero__picture-wrapper img, .hero__image img");
    const heading = element.querySelector(".hero__content h2");
    const paragraphs = Array.from(element.querySelectorAll(".hero__content p"));
    const ctaLinks = Array.from(element.querySelectorAll(".hero__button-wrapper .button__bdl, .hero__button-wrapper a"));
    const cells = [];
    if (heroImage) cells.push([heroImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    paragraphs.forEach((p) => contentCell.push(p));
    ctaLinks.forEach((link) => contentCell.push(link));
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cert", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-events.js
  function parse9(element, { document }) {
    const storycards = element.querySelectorAll(".storycard");
    const cells = [];
    storycards.forEach((card) => {
      const img = card.querySelector(".cmp-image__image");
      const title = card.querySelector(".storycard__title-text a, .storycard__title-text");
      const desc = card.querySelector(".storycard__description-text, .storycard__description p");
      const cta = card.querySelector(".storycard__buttons-wrapper .button__bdl, .storycard__link a");
      const imageCol = img ? [img] : [];
      const textCol = [];
      if (title) {
        const h = document.createElement("h3");
        if (title.tagName === "A") {
          h.append(title);
        } else {
          h.textContent = title.textContent.trim();
        }
        textCol.push(h);
      }
      if (desc) textCol.push(desc);
      if (cta) textCol.push(cta);
      if (imageCol.length > 0) {
        cells.push([imageCol, textCol]);
      } else {
        cells.push([textCol]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-events", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-business.js
  function parse10(element, { document }) {
    const heroImage = element.querySelector(".hero__picture-wrapper img, .hero__image img");
    const heading = element.querySelector(".hero__content h2");
    const description = element.querySelector(".hero__content p");
    const cta = element.querySelector(".hero__button-wrapper .button__bdl, .hero__button-wrapper a");
    const cells = [];
    if (heroImage) cells.push([heroImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (cta) contentCell.push(cta);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-business", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse11(element, { document }) {
    const items = element.querySelectorAll(".ticker-item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        cells.push([[img]]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/shrm-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "access-widget-ui",
        ".acsb-sr-alert",
        ".acsb-sr-only",
        ".infonotificationbar",
        ".content-metering-card",
        ".pop-over__container",
        ".cmp-page__skiptomaincontent",
        "#onetrust-consent-sdk",
        "#ot-sdk-btn-floating"
      ]);
      element.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src.includes("[") || src.includes("]")) img.remove();
      });
      element.querySelectorAll("iframe").forEach((iframe) => {
        const src = iframe.getAttribute("src") || "";
        if (src.includes("[") || src.includes("]") || src.includes("usbrowserspeed") || src.includes("dpmsrv")) iframe.remove();
      });
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".layout-container__wave-wrapper",
        ".overlay-solid",
        ".overlay-gradient",
        "link",
        "noscript",
        "iframe"
      ]);
      element.querySelectorAll('img[src*="["], img[src*="]"]').forEach((img) => img.remove());
      element.querySelectorAll('a[href*="usbrowserspeed"], a[href*="dpmsrv"]').forEach((a) => a.remove());
    }
  }

  // tools/importer/transformers/shrm-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = [...template.sections].reverse();
      for (const section of sections) {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (section.id !== template.sections[0].id) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "carousel-promo": parse2,
    "cards-news": parse3,
    "cards-stats": parse4,
    "tabs-benefits": parse5,
    "hero-cta": parse6,
    "cards-tools": parse7,
    "hero-cert": parse8,
    "cards-events": parse9,
    "hero-business": parse10,
    "carousel-logos": parse11
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "SHRM homepage with hero, featured content, and promotional sections",
    urls: [
      "https://www.shrm.org/home"
    ],
    blocks: [
      { name: "hero-banner", instances: ["#homehero"] },
      { name: "carousel-promo", instances: ["#carousel-6016e49ff8"] },
      { name: "cards-news", instances: [".newsfeed.list.withImage"] },
      { name: "cards-stats", instances: [".metricicon"] },
      { name: "tabs-benefits", instances: [".verticalTabs.tabs"] },
      { name: "hero-cta", instances: [".video-background.color-overlay"] },
      { name: "cards-tools", instances: [".newsfeed.list.withoutImage"] },
      { name: "hero-cert", instances: [".hero.bg-green"] },
      { name: "cards-events", instances: ["#container-b03f3a4eaf"] },
      { name: "hero-business", instances: [".hero.bg-orange"] },
      { name: "carousel-logos", instances: [".ticker-container"] }
    ],
    sections: [
      { id: "section-1", name: "Hero", selector: "#homehero", style: null, blocks: ["hero-banner"], defaultContent: [] },
      { id: "section-2", name: "Promotional Carousel", selector: ".video-background.color-overlay-gradient", style: "dark", blocks: ["carousel-promo"], defaultContent: [] },
      { id: "section-3", name: "Today's Top Workplace News", selector: "#container-e8b2f0146a", style: null, blocks: ["cards-news"], defaultContent: ["#title-5b9fc5d4e3", "#text-a38e945f20"] },
      { id: "section-4", name: "Impact Stats", selector: "#container-4ba180259b", style: "dark", blocks: ["cards-stats"], defaultContent: ["#title-daf55258c4", "#text-cddf6eef86", "#button-4a1ce903c5"] },
      { id: "section-5", name: "Premier Benefits", selector: "#container-2a40fd32e1", style: null, blocks: ["tabs-benefits"], defaultContent: ["#title-a43e3bb7d0", "#text-2f7017193e"] },
      { id: "section-6", name: "BEAM Framework CTA", selector: ".video-background.color-overlay", style: null, blocks: ["hero-cta"], defaultContent: [] },
      { id: "section-7", name: "Top Tools and Programs", selector: "#container-4e69f443ad", style: null, blocks: ["cards-tools"], defaultContent: ["#title-81e6a0dc5d", "#text-b03a8e34be"] },
      { id: "section-8", name: "SHRM Certification", selector: ".hero.bg-green", style: null, blocks: ["hero-cert"], defaultContent: [] },
      { id: "section-9", name: "Premier Events", selector: "#container-b03f3a4eaf", style: null, blocks: ["cards-events"], defaultContent: ["#title-36649b4c90", "#text-8ad5715611"] },
      { id: "section-10", name: "SHRM Business", selector: "#container-3e5aa060d0", style: null, blocks: ["hero-business"], defaultContent: [] },
      { id: "section-11", name: "Trusted By", selector: "#video-background-70353e2857", style: null, blocks: ["carousel-logos"], defaultContent: ["#title-9b9206e1ac"] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      [main, document.body, document.documentElement].forEach((root) => {
        if (!root) return;
        root.querySelectorAll("img, iframe, script").forEach((el) => {
          const src = el.getAttribute("src") || "";
          if (src.includes("[") || src.includes("usbrowserspeed") || src.includes("dpmsrv")) {
            el.remove();
          }
        });
      });
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
