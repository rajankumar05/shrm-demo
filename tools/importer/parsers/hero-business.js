/* eslint-disable */
/* global WebImporter */
/** Parser for hero-business. Base: hero. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const heroImage = element.querySelector('.hero__picture-wrapper img, .hero__image img');
  const heading = element.querySelector('.hero__content h2');
  const description = element.querySelector('.hero__content p');
  const cta = element.querySelector('.hero__button-wrapper .button__bdl, .hero__button-wrapper a');

  const cells = [];
  if (heroImage) cells.push([heroImage]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (cta) contentCell.push(cta);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-business', cells });
  element.replaceWith(block);
}
