import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderPhotoGallery(container) {
  const { photos } = birthdayConfig;
  let activeIndex = 0;

  const washiColors = ['pink', 'blue', 'lavender', ''];

  const photosHtml = photos.map((p, idx) => {
    const tapeColor = washiColors[idx % washiColors.length];
    return `
      <div class="polaroid-card" data-index="${idx}" style="transform: rotate(${p.rotation}deg);" tabindex="0" role="button" aria-label="View photo: ${p.title}">
        <div class="washi-tape ${tapeColor}"></div>
        <div class="polaroid-img-wrap">
          <img src="${p.src}" alt="${p.title}" class="polaroid-img" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\'><rect width=\\'400\\' height=\\'400\\' fill=\\'%23FFD6E7\\'/><text x=\\'50%\\' y=\\'50%\\' font-size=\\'24\\' font-family=\\'sans-serif\\' fill=\\'%23372A3C\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>💖 Core Memory 📸</text></svg>';">
        </div>
        <p class="polaroid-caption">${p.caption}</p>
        <div class="polaroid-date">📅 ${p.date} • <span class="cute-badge" style="background: var(--color-yellow); font-size: 0.65rem;">${p.tag}</span></div>
      </div>
    `;
  }).join('');

  const html = `
    <section class="gallery-section" id="photos-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Scrapbook Memories 📸</span>
          <h2 class="section-title">THE GREATEST TRIO CHRONICLES</h2>
          <p class="section-subtitle">A collection of moments proving that when we're together, sanity completely leaves the room.</p>
        </div>

        <div class="gallery-grid" id="polaroids-grid">
          ${photosHtml}
        </div>

        <div class="gallery-actions">
          <button id="random-memory-btn" class="cute-btn primary">
            🎲 SHOW ME A RANDOM MEMORY!
          </button>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div id="gallery-lightbox" class="lightbox-modal" role="dialog" aria-modal="true">
        <div class="lightbox-inner">
          <button id="lightbox-close" class="lightbox-close-btn" aria-label="Close Lightbox">✕</button>
          
          <img id="lightbox-image" src="" alt="Photo preview" class="lightbox-img">
          
          <div style="margin-top: 14px; text-align: center;">
            <p id="lightbox-caption" class="polaroid-caption" style="font-size: 1.5rem;"></p>
            <p id="lightbox-date" class="polaroid-date" style="font-size: 0.85rem; margin-top: 6px;"></p>
          </div>

          <div class="lightbox-nav">
            <button id="lightbox-prev" class="lightbox-nav-btn">← PREVIOUS</button>
            <span id="lightbox-counter" style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted);">1 / ${photos.length}</span>
            <button id="lightbox-next" class="lightbox-nav-btn">NEXT →</button>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const randomBtn = document.getElementById('random-memory-btn');
  const cards = document.querySelectorAll('.polaroid-card');

  function openLightbox(index) {
    activeIndex = index;
    const photo = photos[activeIndex];
    lightboxImg.src = photo.src;
    lightboxCaption.textContent = photo.caption;
    lightboxDate.textContent = `📅 ${photo.date} • ${photo.tag}`;
    lightboxCounter.textContent = `${activeIndex + 1} / ${photos.length}`;
    lightbox.classList.add('active');
    audioSynth.playWhoosh();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function nextPhoto() {
    activeIndex = (activeIndex + 1) % photos.length;
    openLightbox(activeIndex);
  }

  function prevPhoto() {
    activeIndex = (activeIndex - 1 + photos.length) % photos.length;
    openLightbox(activeIndex);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openLightbox(idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openLightbox(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextPhoto);
  prevBtn.addEventListener('click', prevPhoto);

  randomBtn.addEventListener('click', () => {
    const randomIdx = Math.floor(Math.random() * photos.length);
    audioSynth.playPop();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
    openLightbox(randomIdx);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });
}
