function showSlide(block, slideIndex) {
  const slides = block.querySelectorAll('.carousel-promo-slide');
  let idx = slideIndex;
  if (idx < 0) idx = slides.length - 1;
  if (idx >= slides.length) idx = 0;

  block.dataset.activeSlide = idx;

  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', i !== idx);
  });

  const indicators = block.querySelectorAll('.carousel-promo-indicator');
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === idx);
  });

  const slidesEl = block.querySelector('.carousel-promo-slides');
  slidesEl.scrollTo({ left: slides[idx].offsetLeft, behavior: 'smooth' });
}

export default function decorate(block) {
  const rows = [...block.children].filter(
    (row) => !row.classList.contains('section-metadata'),
  );

  if (rows.length === 0) return;

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'Carousel');
  block.dataset.activeSlide = 0;

  // Build slides
  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-promo-slides');

  rows.forEach((row, idx) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel-promo-slide');
    slide.dataset.slideIndex = idx;
    slide.setAttribute('aria-hidden', idx !== 0);

    const divs = row.querySelectorAll(':scope > div');
    divs.forEach((div, colIdx) => {
      div.classList.add(colIdx === 0 ? 'carousel-promo-slide-image' : 'carousel-promo-slide-content');
    });
    while (row.firstChild) slide.appendChild(row.firstChild);
    slidesWrapper.appendChild(slide);
    row.remove();
  });

  // Indicators
  const indicators = document.createElement('div');
  indicators.classList.add('carousel-promo-indicators');
  for (let i = 0; i < rows.length; i += 1) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-promo-indicator');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => showSlide(block, i));
    indicators.appendChild(dot);
  }

  // Prev / Next arrows (absolute positioned)
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-promo-prev');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-promo-next');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  block.textContent = '';
  block.appendChild(slidesWrapper);
  block.appendChild(prevBtn);
  block.appendChild(nextBtn);
  block.appendChild(indicators);

  // Auto-play every 5 seconds
  let autoPlay = setInterval(() => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  }, 5000);

  block.addEventListener('mouseenter', () => clearInterval(autoPlay));
  block.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    }, 5000);
  });
}
