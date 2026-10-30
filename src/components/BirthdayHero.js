import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderBirthdayHero(container) {
  const { recipient, heroSubtitles } = birthdayConfig;

  const html = `
    <header class="hero-section" id="hero-section">
      <!-- Decorative Floating Balloons -->
      <div class="floating-hero-balloon left">🎈</div>
      <div class="floating-hero-balloon right">🌸</div>

      <div class="scrapbook-container">
        <div class="hero-badge-wrap">
          <span class="cute-badge" style="background: var(--color-yellow)">
            🎂 TODAY'S VIP CELEBRATION
          </span>
        </div>

        <h1 class="hero-main-title">
          HAPPIEST BIRTHDAY, <br>
          <span class="highlight">${recipient.name}!! 🎂💖</span>
        </h1>

        <div class="typewriter-container">
          <span id="hero-typewriter-text" class="typewriter-text"></span>
          <span class="typewriter-cursor"></span>
        </div>

        <div class="hero-btn-group">
          <button id="hero-celebrate-btn" class="cute-btn coral">
            LET'S CELEBRATE!! 🎈
          </button>
          <button id="hero-more-btn" class="cute-btn yellow">
            WAIT... THERE'S MORE? 👀
          </button>
        </div>
      </div>

      <!-- Funny Surprise Popover Modal -->
      <div id="hero-surprise-modal" class="lightbox-modal">
        <div class="lightbox-inner" style="max-width: 480px; text-align: center;">
          <button id="close-hero-modal-btn" class="lightbox-close-btn" aria-label="Close modal">✕</button>
          <div style="font-size: 3rem; margin-bottom: 12px;">🤪✨</div>
          <h3 style="font-family: var(--font-main); font-size: 1.6rem; color: var(--color-pink-deep); margin-bottom: 12px;">
            DID YOU REALLY THINK THIS WAS IT?
          </h3>
          <p style="font-size: 1.05rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 20px;">
            Oh please! We spent 48 hours, 3 existential crises, and our last two remaining braincells coding and designing this whole universe for you! Keep scrolling down, birthday girl... you haven't seen anything yet! 🍰🥳
          </p>
          <button id="continue-exploring-btn" class="cute-btn primary" style="width: 100%;">
            OKAY, SHOW ME EVERYTHING! 🏃‍♀️💨
          </button>
        </div>
      </div>
    </header>
  `;

  container.insertAdjacentHTML('beforeend', html);

  // Typewriter effect logic
  const typewriterEl = document.getElementById('hero-typewriter-text');
  let currentPhraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterTimeout = null;

  function typeEffect() {
    const currentPhrase = heroSubtitles[currentPhraseIndex];
    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2200; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % heroSubtitles.length;
      speed = 400; // Pause before typing new sentence
    }

    typewriterTimeout = setTimeout(typeEffect, speed);
  }

  typeEffect();

  // Button Interactions
  const celebrateBtn = document.getElementById('hero-celebrate-btn');
  const moreBtn = document.getElementById('hero-more-btn');
  const modal = document.getElementById('hero-surprise-modal');
  const closeModalBtn = document.getElementById('close-hero-modal-btn');
  const continueBtn = document.getElementById('continue-exploring-btn');

  celebrateBtn.addEventListener('click', () => {
    audioSynth.playPop();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.3, 40);
    const target = document.getElementById('photos-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  moreBtn.addEventListener('click', () => {
    audioSynth.playChime();
    modal.classList.add('active');
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  closeModalBtn.addEventListener('click', closeModal);
  continueBtn.addEventListener('click', () => {
    closeModal();
    const target = document.getElementById('photos-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
