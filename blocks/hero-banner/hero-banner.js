export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const contentRow = rows[1];

    // Find picture element in the image row (may be nested in div > p > picture or div > picture)
    const pic = imageRow.querySelector('picture');
    if (pic) {
      // Move picture directly into the image row for clean positioning
      imageRow.textContent = '';
      imageRow.appendChild(pic);
      imageRow.classList.add('hero-banner-image');

      const img = pic.querySelector('img');
      if (img) {
        img.loading = 'eager';
      }
    } else {
      // No image found — check if there's an img without picture wrapper
      const img = imageRow.querySelector('img');
      if (img) {
        const picture = document.createElement('picture');
        img.parentElement.replaceChild(picture, img);
        picture.appendChild(img);
        imageRow.textContent = '';
        imageRow.appendChild(picture);
        imageRow.classList.add('hero-banner-image');
        img.loading = 'eager';
      } else {
        block.classList.add('no-image');
      }
    }

    // Set up content row
    contentRow.classList.add('hero-banner-content');

    // Flatten content if wrapped in extra div (cell wrapper)
    const innerDiv = contentRow.querySelector(':scope > div');
    if (innerDiv && contentRow.children.length === 1) {
      while (innerDiv.firstChild) {
        contentRow.appendChild(innerDiv.firstChild);
      }
      innerDiv.remove();
    }
  } else if (rows.length === 1) {
    rows[0].classList.add('hero-banner-content');
    block.classList.add('no-image');
  }
}
