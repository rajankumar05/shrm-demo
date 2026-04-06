export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('div');
  grid.classList.add('brands-grid');

  items.forEach((row) => {
    const link = row.querySelector('a');
    const img = row.querySelector('img');
    if (link && img) {
      const item = document.createElement('a');
      item.href = link.href;
      item.classList.add('brands-item');
      item.appendChild(img);
      grid.appendChild(item);
    } else if (img) {
      const item = document.createElement('div');
      item.classList.add('brands-item');
      item.appendChild(img);
      grid.appendChild(item);
    }
  });

  block.textContent = '';
  block.appendChild(grid);
}
