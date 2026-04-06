function updateActiveSlide(slide) {
  const block = slide.closest('.carousel-logos');
  if (!block) return;
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-logos-slide');
  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-logos-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-logos-slide');
  let realSlideIndex = slideIndex;
  if (realSlideIndex < 0) realSlideIndex = slides.length - 1;
  if (realSlideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];
  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-logos-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-logos-slide-indicators');
  if (!slideIndicators) return;
  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const indicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(indicator.dataset.targetSlide, 10));
    });
  });

  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-logos-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-logos-slide-${slideIndex}`);
  slide.classList.add('carousel-logos-slide');
  slide.setAttribute('role', 'tabpanel');
  slide.setAttribute('aria-hidden', slideIndex !== 0);

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(colIdx === 0 ? 'carousel-logos-slide-image' : 'carousel-logos-slide-content');
  });

  slide.append(...row.childNodes);
  return slide;
}

export default function decorate(block) {
  const rows = [...block.children];
  const isSingleSlide = rows.length < 2;
  const placeholderClass = isSingleSlide ? 'carousel-logos-single-slide' : '';

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-logos-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-logos-slides');
  block.dataset.activeSlide = 0;

  const slideIndicators = document.createElement('ol');
  slideIndicators.classList.add('carousel-logos-slide-indicators');

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx);
    slidesWrapper.append(slide);

    const indicator = document.createElement('li');
    indicator.classList.add('carousel-logos-slide-indicator');
    indicator.dataset.targetSlide = idx;
    indicator.innerHTML = `<button type="button" aria-label="Show Slide ${idx + 1} of ${rows.length}"><span></span></button>`;
    slideIndicators.append(indicator);
  });
  container.append(slidesWrapper);

  block.prepend(slideIndicators);
  block.prepend(container);

  if (!isSingleSlide) {
    const nav = document.createElement('div');
    nav.classList.add('carousel-logos-navigation-buttons');
    nav.innerHTML = `
      <button type="button" class="slide-prev" aria-label="Previous Slide"></button>
      <button type="button" class="slide-next" aria-label="Next Slide"></button>
    `;
    container.append(nav);
    bindEvents(block);
  }

  if (placeholderClass) block.classList.add(placeholderClass);
}
