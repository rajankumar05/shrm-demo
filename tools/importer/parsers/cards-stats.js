/* eslint-disable */
/* global WebImporter */
/** Parser for cards-stats. Base: cards (no images). Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const counters = element.querySelectorAll('.counter-grid-column');
  const cells = [];

  counters.forEach(counter => {
    const number = counter.querySelector('.counter-grid-title');
    const text = counter.querySelector('.counter-grid-text');

    const contentCell = [];
    if (number) contentCell.push(number);
    if (text) contentCell.push(text);

    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
