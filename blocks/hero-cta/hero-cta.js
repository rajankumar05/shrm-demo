export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const iconRow = rows[0];
    const contentRow = rows[1];

    // Icon row — contains the BEAM logo image
    const iconImg = iconRow.querySelector('img');
    if (iconImg) {
      iconRow.textContent = '';
      iconRow.appendChild(iconImg);
      iconRow.classList.add('hero-cta-icon');
      iconImg.loading = 'eager';
    }

    // Content row — heading, description, CTA
    contentRow.classList.add('hero-cta-content');

    // Flatten inner cell div if present
    const innerDiv = contentRow.querySelector(':scope > div');
    if (innerDiv && contentRow.children.length === 1) {
      while (innerDiv.firstChild) {
        contentRow.appendChild(innerDiv.firstChild);
      }
      innerDiv.remove();
    }

    // Flatten any remaining wrapper divs around text content
    contentRow.querySelectorAll(':scope > div').forEach((div) => {
      if (div.children.length === 1) {
        const child = div.firstElementChild;
        if (child && (child.tagName === 'H2' || child.tagName === 'H3' || child.tagName === 'P' || child.tagName === 'A')) {
          div.replaceWith(child);
        }
      } else if (div.children.length === 0 && div.textContent.trim()) {
        // Plain text in a div — wrap in paragraph
        const p = document.createElement('p');
        p.textContent = div.textContent.trim();
        div.replaceWith(p);
      }
    });
  }
}
