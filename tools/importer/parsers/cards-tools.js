/* eslint-disable */
/* global WebImporter */
/** Parser for cards-tools. Base: cards (no images). Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const storycards = element.querySelectorAll('.storycard');
  const cells = [];

  storycards.forEach(card => {
    const category = card.querySelector('.storycard__type-text');
    const titleLink = card.querySelector('.storycard__title-text a');
    const desc = card.querySelector('.storycard__description-text');

    const contentCell = [];
    if (category) contentCell.push(category);
    if (titleLink) {
      const h = document.createElement('h3');
      h.append(titleLink);
      contentCell.push(h);
    }
    if (desc) contentCell.push(desc);

    cells.push([contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-tools', cells });
  element.replaceWith(block);
}
