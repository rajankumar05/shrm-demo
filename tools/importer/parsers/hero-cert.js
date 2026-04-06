/* eslint-disable */
/* global WebImporter */
/** Parser for hero-cert. Base: hero. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const heroImage = element.querySelector('.hero__picture-wrapper img, .hero__image img');
  const heading = element.querySelector('.hero__content h2');
  const paragraphs = Array.from(element.querySelectorAll('.hero__content p'));
  const ctaLinks = Array.from(element.querySelectorAll('.hero__button-wrapper .button__bdl, .hero__button-wrapper a'));

  const cells = [];
  if (heroImage) cells.push([heroImage]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  paragraphs.forEach(p => contentCell.push(p));
  ctaLinks.forEach(link => contentCell.push(link));
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cert', cells });
  element.replaceWith(block);
}
