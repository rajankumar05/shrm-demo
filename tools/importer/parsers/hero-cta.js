/* eslint-disable */
/* global WebImporter */
/** Parser for hero-cta. Base: hero. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const icon = element.querySelector('.icon-xlarge .cmp-image__image, .image.icon-xlarge img');
  const heading = element.querySelector('h2.cmp-title__text, .cmp-title h2');
  const description = element.querySelector('.cmp-text p');
  const cta = element.querySelector('.button__bdl');

  const cells = [];
  if (icon) cells.push([icon]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (cta) contentCell.push(cta);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}
