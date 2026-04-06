export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const contentRow = rows[1];

    // Image row
    imageRow.classList.add('hero-cert-image');
    const img = imageRow.querySelector('img');
    if (img) {
      img.loading = 'eager';
    }

    // Content row — flatten inner div wrappers
    contentRow.classList.add('hero-cert-content');
    const innerDiv = contentRow.querySelector(':scope > div');
    if (innerDiv && contentRow.children.length === 1) {
      while (innerDiv.firstChild) {
        contentRow.appendChild(innerDiv.firstChild);
      }
      innerDiv.remove();
    }

    // Flatten remaining wrapper divs around headings/text
    contentRow.querySelectorAll(':scope > div').forEach((div) => {
      if (div.children.length <= 1) {
        const child = div.firstElementChild || div;
        if (child.tagName === 'H2' || child.tagName === 'H3' || child.tagName === 'A') {
          div.replaceWith(child);
        } else if (div.children.length === 0 && div.textContent.trim()) {
          const p = document.createElement('p');
          p.innerHTML = div.innerHTML;
          div.replaceWith(p);
        }
      }
    });
  } else {
    block.classList.add('no-image');
  }
}
