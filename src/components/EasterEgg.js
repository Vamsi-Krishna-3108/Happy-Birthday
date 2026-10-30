import { birthdayConfig } from '../config/birthdayConfig.js';
import { audioSynth } from '../utils/audioSynth.js';
import { confetti } from '../utils/confetti.js';

export function renderEasterEgg(container) {
  const { easterEgg } = birthdayConfig;

  const html = `
    <!-- Hidden Clickable Easter Egg Floating Sticker -->
    <div id="easter-egg-btn" class="easter-egg-sticker" title="Psst... click me! 👀" role="button" aria-label="Secret Easter Egg">
      ⭐
    </div>

    <!-- Easter Egg Modal -->
    <div id="easter-egg-modal" class="lightbox-modal" role="dialog" aria-modal="true">
      <div class="lightbox-inner" style="max-width: 480px; text-align: center;">
        <button id="close-easter-egg-btn" class="lightbox-close-btn" aria-label="Close Easter Egg">✕</button>
        <div style="font-size: 3rem; margin-bottom: 12px;">🕵️‍♀️✨🎉</div>
        <h3 style="font-family: var(--font-main); font-size: 1.5rem; color: var(--color-pink-deep); margin-bottom: 12px;">
          ${easterEgg.title}
        </h3>
        <p style="font-size: 1.05rem; color: var(--color-text-dark); line-height: 1.5; margin-bottom: 20px;">
          ${easterEgg.message}
        </p>
        <button id="easter-egg-ok-btn" class="cute-btn primary" style="width: 100%;">
          HAHA OKAY, YOU GOT ME! 😂🍰
        </button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const eggBtn = document.getElementById('easter-egg-btn');
  const modal = document.getElementById('easter-egg-modal');
  const closeBtn = document.getElementById('close-easter-egg-btn');
  const okBtn = document.getElementById('easter-egg-ok-btn');

  function openEgg() {
    audioSynth.playChime();
    confetti.burst(100, window.innerHeight - 100, 40);
    modal.classList.add('active');
  }

  function closeEgg() {
    modal.classList.remove('active');
  }

  eggBtn.addEventListener('click', openEgg);
  closeBtn.addEventListener('click', closeEgg);
  okBtn.addEventListener('click', closeEgg);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEgg();
  });
}
