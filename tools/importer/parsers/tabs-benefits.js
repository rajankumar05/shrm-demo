/* eslint-disable */
/* global WebImporter */
/** Parser for tabs-benefits. Base: tabs. Source: https://www.shrm.org/home */
export default function parse(element, { document }) {
  const tabLabels = element.querySelectorAll('.cmp-tabs__tab');
  const tabPanels = element.querySelectorAll('.cmp-tabs__tabpanel');
  const cells = [];

  tabLabels.forEach((label, i) => {
    const panel = tabPanels[i];
    const labelText = label.textContent.trim();

    const contentCell = [];
    if (panel) {
      const img = panel.querySelector('.cmp-image__image');
      const heading = panel.querySelector('h3');
      const desc = panel.querySelector('.cmp-text p, .cmp-tabscard p');
      const cta = panel.querySelector('.button__bdl, a[href]');

      if (img) contentCell.push(img);
      if (heading) contentCell.push(heading);
      if (desc) contentCell.push(desc);
      if (cta) contentCell.push(cta);
    }

    cells.push([[labelText], contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-benefits', cells });
  element.replaceWith(block);
}
