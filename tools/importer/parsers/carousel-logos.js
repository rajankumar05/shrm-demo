/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-logos. Base: carousel (image-only). Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.ticker-item');
  const cells = [];

  items.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      cells.push([[img]]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-logos', cells });
  element.replaceWith(block);
}
