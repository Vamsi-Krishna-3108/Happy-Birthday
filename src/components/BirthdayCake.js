import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderBirthdayCake(container) {
  const { recipient, senders } = birthdayConfig;

  const html = `
    <section class="cake-section" id="cake-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Birthday Tradition 🎂</span>
          <h2 class="section-title">MAKE A WISH, BIRTHDAY STAR ✨</h2>
          <p class="section-subtitle">Close your eyes, think of the wildest wish, and blow out the candles!</p>
        </div>

        <div class="cake-card">
          <div class="cake-stage">
            <!-- Illustrated SVG Cake with Animated Candles -->
            <svg viewBox="0 0 300 240" width="100%" height="100%" style="overflow: visible;">
              <!-- Cake Plate -->
              <ellipse cx="150" cy="220" rx="135" ry="18" fill="#E5D8FF" stroke="#372A3C" stroke-width="4"/>
              
              <!-- Bottom Cake Tier -->
              <rect x="50" y="140" width="200" height="75" rx="10" fill="#FFD6E7" stroke="#372A3C" stroke-width="4"/>
              <!-- Frosting Drops Bottom -->
              <path d="M 50 140 Q 65 160 80 140 Q 95 160 110 140 Q 125 160 140 140 Q 155 160 170 140 Q 185 160 200 140 Q 215 160 230 140 Q 245 160 250 140" fill="#FFF9F0" stroke="#372A3C" stroke-width="3"/>
              
              <!-- Top Cake Tier -->
              <rect x="80" y="85" width="140" height="60" rx="8" fill="#FFF0AD" stroke="#372A3C" stroke-width="4"/>
              <!-- Frosting Drops Top -->
              <path d="M 80 85 Q 95 102 110 85 Q 125 102 140 85 Q 155 102 170 85 Q 185 102 200 85 Q 215 102 220 85" fill="#FFF9F0" stroke="#372A3C" stroke-width="3"/>
              
              <!-- Sprinkles & Cherries -->
              <circle cx="105" cy="80" r="8" fill="#FF8F9C" stroke="#372A3C" stroke-width="2"/>
              <circle cx="150" cy="78" r="8" fill="#FF8F9C" stroke="#372A3C" stroke-width="2"/>
              <circle cx="195" cy="80" r="8" fill="#FF8F9C" stroke="#372A3C" stroke-width="2"/>
              
              <!-- Candle 1 -->
              <rect x="110" y="38" width="8" height="42" rx="3" fill="#CDEBFF" stroke="#372A3C" stroke-width="2"/>
              <g class="candle-flame" id="flame-1">
                <path d="M 114 18 Q 106 28 114 36 Q 122 28 114 18 Z" fill="#FFA500"/>
                <path d="M 114 22 Q 109 29 114 35 Q 119 29 114 22 Z" fill="#FFFF00"/>
              </g>

              <!-- Candle 2 (Center) -->
              <rect x="146" y="32" width="8" height="48" rx="3" fill="#FFD6E7" stroke="#372A3C" stroke-width="2"/>
              <g class="candle-flame" id="flame-2">
                <path d="M 150 12 Q 142 22 150 30 Q 158 22 150 12 Z" fill="#FFA500"/>
                <path d="M 150 16 Q 145 23 150 29 Q 155 23 150 16 Z" fill="#FFFF00"/>
              </g>

              <!-- Candle 3 -->
              <rect x="182" y="38" width="8" height="42" rx="3" fill="#E5D8FF" stroke="#372A3C" stroke-width="2"/>
              <g class="candle-flame" id="flame-3">
                <path d="M 186 18 Q 178 28 186 36 Q 194 28 186 18 Z" fill="#FFA500"/>
                <path d="M 186 22 Q 181 29 186 35 Q 191 29 186 22 Z" fill="#FFFF00"/>
              </g>
            </svg>

            <!-- Smoke puffs -->
            <div id="smoke-1" class="smoke-puff" style="top: 10px; left: 38%;">💨</div>
            <div id="smoke-2" class="smoke-puff" style="top: 4px; left: 50%;">💨</div>
            <div id="smoke-3" class="smoke-puff" style="top: 10px; left: 62%;">💨</div>
          </div>

          <div id="cake-action-area">
            <button id="blow-candles-btn" class="cute-btn coral" style="font-size: 1.15rem;">
              BLOW OUT THE CANDLES 🌬️
            </button>
          </div>

          <!-- Wish Granted Reveal Area -->
          <div id="wish-reveal-box" class="wish-reveal-box">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">✨🧚‍♀️💫</div>
            <h4 style="font-family: var(--font-main); font-size: 1.35rem; color: var(--color-text-dark); margin-bottom: 8px;">
              WISH GRANTED... WE HOPE. OUR MAGIC POWERS ARE STILL LOADING 😭✨
            </h4>
            <p style="font-size: 1.05rem; color: #4A3E50; margin-bottom: 16px;">
              From ${senders.friendOne.name} & ${senders.friendTwo.name}: "Whatever you just wished for, we hope it comes true tenfold! (Unless your wish was to replace us, in which case request strongly denied 🙅‍♀️🙅‍♂️)"
            </p>
            <button id="reset-candles-btn" class="cute-btn yellow" style="font-size: 0.95rem; padding: 10px 22px;">
              🕯️ MAKE ANOTHER WISH (RELIGHT)
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const blowBtn = document.getElementById('blow-candles-btn');
  const resetBtn = document.getElementById('reset-candles-btn');
  const actionArea = document.getElementById('cake-action-area');
  const wishBox = document.getElementById('wish-reveal-box');
  const flames = [
    document.getElementById('flame-1'),
    document.getElementById('flame-2'),
    document.getElementById('flame-3')
  ];
  const smokes = [
    document.getElementById('smoke-1'),
    document.getElementById('smoke-2'),
    document.getElementById('smoke-3')
  ];

  blowBtn.addEventListener('click', () => {
    audioSynth.playBlow();

    // Extinguish flames with slight stagger
    flames.forEach((flame, idx) => {
      setTimeout(() => {
        flame.classList.add('extinguished');
        smokes[idx].classList.add('rising');
      }, idx * 120);
    });

    setTimeout(() => {
      audioSynth.playFanfare();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 80);
      actionArea.style.display = 'none';
      wishBox.classList.add('show');
    }, 600);
  });

  resetBtn.addEventListener('click', () => {
    audioSynth.playPop();
    flames.forEach(flame => flame.classList.remove('extinguished'));
    smokes.forEach(smoke => smoke.classList.remove('rising'));
    wishBox.classList.remove('show');
    actionArea.style.display = 'block';
  });
}
