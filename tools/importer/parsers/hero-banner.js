/* eslint-disable */
/* global WebImporter */
/** Parser for hero-banner. Base: hero. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const heading = element.querySelector('h1, .mimic-h1');
  const description = element.querySelector('.cmp-text p');
  const ctaLinks = Array.from(element.querySelectorAll('.button__bdl'));

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  ctaLinks.forEach(link => contentCell.push(link));

  const cells = [contentCell];
  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
