/* eslint-disable */
/* global WebImporter */
/** Parser for cards-events. Base: cards. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const storycards = element.querySelectorAll('.storycard');
  const cells = [];

  storycards.forEach(card => {
    const img = card.querySelector('.cmp-image__image');
    const title = card.querySelector('.storycard__title-text a, .storycard__title-text');
    const desc = card.querySelector('.storycard__description-text, .storycard__description p');
    const cta = card.querySelector('.storycard__buttons-wrapper .button__bdl, .storycard__link a');

    const imageCol = img ? [img] : [];
    const textCol = [];
    if (title) {
      const h = document.createElement('h3');
      if (title.tagName === 'A') {
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-events', cells });
  element.replaceWith(block);
}
