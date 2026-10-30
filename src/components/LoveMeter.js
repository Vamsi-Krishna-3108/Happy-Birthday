import { audioSynth } from '../utils/audioSynth.js';
import { confetti } from '../utils/confetti.js';

export function renderLoveMeter(container) {
  const html = `
    <section class="meter-section" id="meter-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Scientific Calculation 🧪</span>
          <h2 class="section-title">HOW MUCH DO WE LOVE YOU?</h2>
          <p class="section-subtitle">Our quantum friendship supercomputer will now calculate exact mathematical affection levels.</p>
        </div>

        <div class="meter-card" id="love-meter-card">
          <div style="font-size: 3rem; margin-bottom: 6px;">💖⚡📊</div>
          
          <div class="meter-track">
            <div id="meter-progress-bar" class="meter-fill"></div>
          </div>

          <div id="meter-counter-text" class="meter-percentage">0%</div>

          <div style="margin-top: 20px;">
            <button id="calculate-love-btn" class="cute-btn coral" style="font-size: 1.1rem; padding: 14px 32px;">
              CALCULATE OUR LOVE 💗
            </button>
          </div>

          <!-- Glitch & Overload Alert -->
          <div id="meter-error-display" class="meter-error-card">
            <div style="font-size: 2.2rem; margin-bottom: 6px;">🚨⚠️💥</div>
            <h4 style="font-family: var(--font-main); font-size: 1.4rem; color: #D32F2F; font-weight: 800; margin-bottom: 6px;">
              ERROR 404: LOVE TOO BIG TO CALCULATE.
            </h4>
            <p style="font-size: 1.15rem; font-family: var(--font-handwriting); font-weight: 700; color: #372A3C; margin-top: 6px;">
              RESULT: STUCK WITH US FOREVER. NO REFUNDS. 😂💖
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const calcBtn = document.getElementById('calculate-love-btn');
  const progressBar = document.getElementById('meter-progress-bar');
  const counterText = document.getElementById('meter-counter-text');
  const errorDisplay = document.getElementById('meter-error-display');
  const meterCard = document.getElementById('love-meter-card');

  let isCalculating = false;

  calcBtn.addEventListener('click', () => {
    if (isCalculating) return;
    isCalculating = true;

    // Reset view
    errorDisplay.classList.remove('show');
    meterCard.classList.remove('shaking');
    progressBar.style.width = '0%';
    counterText.textContent = '0%';
    counterText.style.color = 'var(--color-pink-deep)';

    audioSynth.playPop();

    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 8) + 4;
      if (percent < 100) {
        progressBar.style.width = `${percent}%`;
        counterText.textContent = `${percent}%`;
        audioSynth.playPop();
      } else if (percent < 999) {
        // OVERLOAD!
        progressBar.style.width = '100%';
        counterText.textContent = `${percent * 10}% OVERLOAD!`;
        counterText.style.color = '#FF1744';
      } else {
        clearInterval(interval);
        progressBar.style.width = '100%';
        counterText.textContent = `999999% 🔥`;
        
        meterCard.classList.add('shaking');
        audioSynth.playGlitch();

        setTimeout(() => {
          meterCard.classList.remove('shaking');
          errorDisplay.classList.add('show');
          audioSynth.playFanfare();
          confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60);
          isCalculating = false;
        }, 800);
      }
    }, 45);
  });
}
