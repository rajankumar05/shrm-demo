/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-promo. Base: carousel. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.cmp-carousel__item');
  const cells = [];

  slides.forEach(slide => {
    const img = slide.querySelector('.cmp-image__image');
    const heading = slide.querySelector('.mimic-h1, h2, h1');
    const cta = slide.querySelector('.button__bdl');
    const description = slide.querySelector('.cmp-text p');

    const imageCell = img ? [img] : [];
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (cta) contentCell.push(cta);

    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([...imageCell, ...contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-promo', cells });
  element.replaceWith(block);
}
