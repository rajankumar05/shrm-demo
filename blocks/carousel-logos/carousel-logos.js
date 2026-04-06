export default function decorate(block) {
  // Collect all logo images from block rows
  const logos = [];
  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      logos.push(img.cloneNode(true));
    }
  });

  if (logos.length === 0) return;

  // Clear block content
  block.textContent = '';

  // Build ticker track with logos duplicated for seamless loop
  const track = document.createElement('div');
  track.classList.add('carousel-logos-track');

  // Add logos twice for infinite scroll effect
  for (let i = 0; i < 2; i += 1) {
    logos.forEach((img) => {
      const item = document.createElement('div');
      item.classList.add('carousel-logos-item');
      item.appendChild(img.cloneNode(true));
      track.appendChild(item);
    });
  }

  block.appendChild(track);

  // Pause animation on hover
  block.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  block.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}
