/* eslint-disable */
/* global WebImporter */
/** Parser for cards-news. Base: cards. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const storycards = element.querySelectorAll('.storycard');
  const cells = [];

  storycards.forEach(card => {
    const img = card.querySelector('.cmp-image__image');
    const category = card.querySelector('.storycard__type-text');
    const titleLink = card.querySelector('.storycard__title-text a');
    const desc = card.querySelector('.storycard__description-text');

    const imageCol = img ? [img] : [];
    const textCol = [];
    if (category) textCol.push(category);
    if (titleLink) {
      const h = document.createElement('h3');
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });
  element.replaceWith(block);
}
