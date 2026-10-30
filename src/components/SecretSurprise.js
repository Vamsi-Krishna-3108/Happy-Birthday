import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderSecretSurprise(container) {
  const { secretGift, recipient, senders } = birthdayConfig;

  const html = `
    <section class="secret-section" id="secret-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Top Secret 🔐</span>
          <h2 class="section-title">THERE'S ONE THING WE HAVEN'T TOLD YOU... 👀</h2>
          <p class="section-subtitle">A classified document that has been sealed in the bestie archives until today.</p>
        </div>

        <div class="secret-card">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🎁✨🗝️</div>
          
          <div id="secret-action-wrap">
            <button id="unlock-secret-btn" class="cute-btn coral" style="font-size: 1.15rem; padding: 16px 36px;">
              UNLOCK THE SECRET 🎁
            </button>
          </div>

          <!-- Unlocked Official Bestie Certificate -->
          <div id="secret-certificate-box" class="secret-certificate">
            <div style="text-align: center; margin-bottom: 16px;">
              <span class="cute-badge" style="background: var(--color-yellow); font-size: 0.8rem;">
                ${secretGift.badge}
              </span>
              <h3 style="font-family: var(--font-main); font-size: 1.55rem; color: var(--color-text-dark); margin-top: 8px;">
                ${secretGift.title}
              </h3>
              <p style="font-size: 0.9rem; color: var(--color-text-muted); font-style: italic;">
                ${secretGift.subtitle}
              </p>
            </div>

            <p style="font-size: 1rem; margin-bottom: 14px;">
              This certifies that <strong>${recipient.name}</strong> is hereby granted all rights and privileges of lifetime supreme bestie status:
            </p>

            <ul style="list-style: none; padding: 0; margin-bottom: 18px;">
              ${secretGift.perks.map(perk => `
                <li style="padding: 6px 0; border-bottom: 1px dashed #E0D4C5; font-size: 0.95rem; font-weight: 600; color: #372A3C;">
                  ${perk}
                </li>
              `).join('')}
            </ul>

            <div style="background: rgba(255, 214, 231, 0.4); border-radius: 8px; padding: 12px; font-size: 0.85rem; color: var(--color-text-muted); text-align: center;">
              ⚠️ <em>${secretGift.terms}</em>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px;">
              <div style="font-family: var(--font-handwriting); font-size: 1.4rem; color: var(--color-pink-deep);">
                Signed, ${senders.friendOne.name}
              </div>
              <div style="font-size: 1.8rem;">⭐ 🏆 ⭐</div>
              <div style="font-family: var(--font-handwriting); font-size: 1.4rem; color: var(--color-pink-deep);">
                Signed, ${senders.friendTwo.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const unlockBtn = document.getElementById('unlock-secret-btn');
  const actionWrap = document.getElementById('secret-action-wrap');
  const certBox = document.getElementById('secret-certificate-box');

  unlockBtn.addEventListener('click', () => {
    audioSynth.playChime();
    actionWrap.style.display = 'none';
    certBox.classList.add('show');
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.5, 70);
  });
}
