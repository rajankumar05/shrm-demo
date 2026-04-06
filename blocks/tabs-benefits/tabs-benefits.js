export default async function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'tabs-benefits-list';
  tabList.setAttribute('role', 'tablist');

  const tabs = [...block.children].map((child) => child.firstElementChild);

  tabs.forEach((tab, i) => {
    const id = tab.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    const tabPanel = block.children[i];
    tabPanel.className = 'tabs-benefits-panel';
    tabPanel.id = `tabpanel-${id}`;
    tabPanel.setAttribute('role', 'tabpanel');
    tabPanel.setAttribute('aria-labelledby', `tab-${id}`);

    // Structure panel content: image on left, text on right
    const panelContent = tabPanel.querySelector(':scope > div:last-child');
    if (panelContent) {
      const img = panelContent.querySelector('picture, img');
      const textEls = [];
      [...panelContent.children].forEach((child) => {
        if (!child.querySelector('picture, img') && child.tagName !== 'PICTURE') {
          textEls.push(child);
        }
      });

      if (img) {
        const panelGrid = document.createElement('div');
        panelGrid.className = 'tabs-benefits-panel-grid';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'tabs-benefits-panel-image';
        const picture = img.closest('p') || img;
        imgWrap.appendChild(picture);

        const textWrap = document.createElement('div');
        textWrap.className = 'tabs-benefits-panel-text';
        textEls.forEach((el) => textWrap.appendChild(el));

        panelGrid.appendChild(imgWrap);
        panelGrid.appendChild(textWrap);
        panelContent.textContent = '';
        panelContent.appendChild(panelGrid);
      }
    }

    const button = document.createElement('button');
    button.className = 'tabs-benefits-tab';
    button.id = `tab-${id}`;
    button.textContent = tab.textContent.trim();
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', i === 0);
    button.addEventListener('click', () => {
      block.querySelectorAll('.tabs-benefits-tab').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      button.setAttribute('aria-selected', true);
      block.querySelectorAll('.tabs-benefits-panel').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tabPanel.setAttribute('aria-hidden', false);
    });
    tabList.append(button);
    tab.remove();

    if (i > 0) {
      tabPanel.setAttribute('aria-hidden', true);
    }
  });

  block.prepend(tabList);
}
