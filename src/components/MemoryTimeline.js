import { birthdayConfig } from '../config/birthdayConfig.js';

export function renderMemoryTimeline(container) {
  const { timeline } = birthdayConfig;

  const entriesHtml = timeline.map((item, idx) => {
    const isLeft = idx % 2 === 0;
    return `
      <div class="timeline-entry ${isLeft ? 'left' : 'right'}" data-index="${idx}">
        <div class="timeline-dot"></div>
        <div class="timeline-box">
          <span class="cute-badge" style="background: ${isLeft ? 'var(--color-pink)' : 'var(--color-yellow)'}; font-size: 0.7rem; margin-bottom: 8px;">
            ${item.tag} • ${item.year}
          </span>
          <h3 style="font-family: var(--font-main); font-size: 1.25rem; font-weight: 800; color: var(--color-text-dark); margin: 6px 0;">
            ${item.title}
          </h3>
          <div style="font-family: var(--font-handwriting); font-size: 1.15rem; color: var(--color-pink-deep); font-weight: 700; margin-bottom: 8px;">
            📅 ${item.date}
          </div>
          <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.45;">
            ${item.description}
          </p>
        </div>
      </div>
    `;
  }).join('');

  const html = `
    <section class="timeline-section" id="timeline-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Our Story ✨</span>
          <h2 class="section-title">LITTLE MOMENTS, BIG MEMORIES</h2>
          <p class="section-subtitle">How three random people accidentally turned into an inseparable family.</p>
        </div>

        <div class="timeline-line-wrap">
          ${entriesHtml}
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);
}
