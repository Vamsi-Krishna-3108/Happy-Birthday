import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderFinalSurprise(container, onReplay) {
  const { finalMessage, senders } = birthdayConfig;

  const html = `
    <section class="final-section" id="final-section">
      <div class="scrapbook-container">
        <div class="final-card" id="final-surprise-card">
          <div class="washi-tape pink"></div>
          
          <div style="font-size: 3.5rem; margin-bottom: 12px;">💌✨🥹</div>

          <h2 class="section-title" style="margin-bottom: 14px;">
            ${finalMessage.heading}
          </h2>
          <p class="section-subtitle" style="margin-bottom: 30px;">
            Before you blow out your candles and eat your weight in cake, we wanted to leave you with this.
          </p>

          <div id="final-action-area">
            <button id="open-final-surprise-btn" class="cute-btn coral" style="font-size: 1.2rem; padding: 16px 40px;">
              OPEN YOUR FINAL SURPRISE 🎁
            </button>
          </div>

          <!-- Revealed Final Emotional Letter -->
          <div id="final-letter-content" style="display: none; animation: modalPop 0.6s ease forwards;">
            <div style="font-size: 2.2rem; margin: 10px 0;">🎂💖✨</div>
            
            <p class="final-letter-body">
              ${finalMessage.body}
            </p>

            <div style="text-align: right; margin-top: 24px;">
              <span style="font-family: var(--font-handwriting); font-size: 2.2rem; font-weight: 700; color: var(--color-pink-deep);">
                ${finalMessage.senders}
              </span>
            </div>

            <hr style="border: none; border-top: 2px dashed #E5D8FF; margin: 36px 0 24px;">

            <div style="font-family: var(--font-main); font-weight: 800; font-size: 0.95rem; color: var(--color-text-muted); letter-spacing: 0.04em;">
              ${finalMessage.footerQuote}
            </div>

            <div style="margin-top: 36px;">
              <button id="replay-experience-btn" class="cute-btn yellow" style="font-size: 1.05rem;">
                🔄 REPLAY THE BIRTHDAY SURPRISE!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const openBtn = document.getElementById('open-final-surprise-btn');
  const actionArea = document.getElementById('final-action-area');
  const letterContent = document.getElementById('final-letter-content');
  const finalCard = document.getElementById('final-surprise-card');
  const replayBtn = document.getElementById('replay-experience-btn');

  openBtn.addEventListener('click', () => {
    audioSynth.playFanfare();
    actionArea.style.display = 'none';
    letterContent.style.display = 'block';
    finalCard.classList.add('revealed');

    // Continuous celebration confetti
    confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 100);
    confetti.startContinuous();

    setTimeout(() => {
      confetti.stopContinuous();
    }, 7000);
  });

  replayBtn.addEventListener('click', () => {
    audioSynth.playPop();
    if (onReplay) onReplay();
  });
}
