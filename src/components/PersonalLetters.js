import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderPersonalLetters(container) {
  const { senders, recipient } = birthdayConfig;

  // Session storage check
  let openedState = {
    friendOne: sessionStorage.getItem('letter_friendOne_opened') === 'true',
    friendTwo: sessionStorage.getItem('letter_friendTwo_opened') === 'true'
  };

  const html = `
    <section class="letters-section" id="letters-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Personal Letters 💌</span>
          <h2 class="section-title">TWO IDIOTS, TWO LETTERS</h2>
          <p class="section-subtitle">We wrote these separately so we wouldn't fight over who loves you more.</p>
        </div>

        <div class="envelopes-wrapper">
          <!-- Letter 1: From Vamsi C -->
          <div class="envelope-card pink-theme" id="card-sender-one">
            <div class="envelope-stamp">📮✨</div>
            <div class="envelope-icon">💌</div>
            <span class="cute-badge" style="background: var(--color-pink)">FROM ${senders.friendOne.name.toUpperCase()}</span>
            <h3 class="envelope-sender-title" style="margin-top: 10px;">${senders.friendOne.letterTitle}</h3>
            <p class="envelope-preview-text">"To the one who laughs at my dumbest jokes and saves my brain from exploding..."</p>
            <button id="open-letter-one-btn" class="cute-btn primary">
              OPEN MY MESSAGE 💌
            </button>
            <div id="status-letter-one" class="letter-opened-status" style="display: ${openedState.friendOne ? 'inline-flex' : 'none'};">
              ✓ Read with love!
            </div>
          </div>

          <!-- Letter 2: From Gowthami D -->
          <div class="envelope-card yellow-theme" id="card-sender-two">
            <div class="envelope-stamp">💖✨</div>
            <div class="envelope-icon">📜</div>
            <span class="cute-badge" style="background: var(--color-yellow)">FROM ${senders.friendTwo.name.toUpperCase()}</span>
            <h3 class="envelope-sender-title" style="margin-top: 10px;">${senders.friendTwo.letterTitle}</h3>
            <p class="envelope-preview-text">"To my soul sister, partner in crime, and forever snack buddy..."</p>
            <button id="open-letter-two-btn" class="cute-btn yellow">
              OKAY, NOW READ MINE 👀
            </button>
            <div id="status-letter-two" class="letter-opened-status" style="display: ${openedState.friendTwo ? 'inline-flex' : 'none'};">
              ✓ Read with love!
            </div>
          </div>
        </div>

        <!-- Celebratory Banner shown when BOTH letters are opened -->
        <div id="stuck-forever-banner" class="stuck-forever-banner ${openedState.friendOne && openedState.friendTwo ? 'show' : ''}">
          <div style="font-size: 2.4rem; margin-bottom: 8px;">🤝💗🎉</div>
          <h3>CONGRATULATIONS!! YOU ARE OFFICIALLY STUCK WITH US FOREVER 🤝💗</h3>
          <p style="font-size: 1.05rem; color: var(--color-text-dark); margin-top: 6px; font-weight: 600;">
            Neither of us is going anywhere. Lifetime membership granted!
          </p>
        </div>
      </div>

      <!-- Letter Display Modal -->
      <div id="letter-display-modal" class="letter-modal" role="dialog" aria-modal="true">
        <div class="letter-modal-paper">
          <button id="letter-modal-close" class="lightbox-close-btn" aria-label="Close Letter">✕</button>
          <div id="letter-modal-content">
            <!-- Dynamic Content -->
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const modal = document.getElementById('letter-display-modal');
  const closeBtn = document.getElementById('letter-modal-close');
  const modalContent = document.getElementById('letter-modal-content');
  const btnOne = document.getElementById('open-letter-one-btn');
  const btnTwo = document.getElementById('open-letter-two-btn');
  const statusOne = document.getElementById('status-letter-one');
  const statusTwo = document.getElementById('status-letter-two');
  const banner = document.getElementById('stuck-forever-banner');

  function openLetter(senderKey) {
    const sender = senders[senderKey];
    openedState[senderKey] = true;
    sessionStorage.setItem(`letter_${senderKey}_opened`, 'true');

    if (senderKey === 'friendOne') {
      statusOne.style.display = 'inline-flex';
    } else {
      statusTwo.style.display = 'inline-flex';
    }

    modalContent.innerHTML = `
      <span class="cute-badge" style="background: ${senderKey === 'friendOne' ? 'var(--color-pink)' : 'var(--color-yellow)'}; margin-bottom: 14px;">
        LETTER FROM ${sender.name.toUpperCase()}
      </span>
      <h3 class="letter-greeting">${sender.letterGreeting}</h3>
      <p class="letter-body">${sender.letterBody}</p>
      <div class="letter-signoff">
        <div>${sender.letterSignoff}</div>
        <div style="font-size: 2.2rem; color: var(--color-pink-deep);">${sender.letterSignature}</div>
      </div>
    `;

    audioSynth.playWhoosh();
    modal.classList.add('active');

    // Check if both letters are now opened
    if (openedState.friendOne && openedState.friendTwo && !banner.classList.contains('show')) {
      banner.classList.add('show');
      setTimeout(() => {
        audioSynth.playFanfare();
        confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 75);
      }, 500);
    }
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  btnOne.addEventListener('click', () => openLetter('friendOne'));
  btnTwo.addEventListener('click', () => openLetter('friendTwo'));
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
