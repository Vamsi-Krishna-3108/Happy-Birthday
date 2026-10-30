import { birthdayConfig } from '../config/birthdayConfig.js';
import { confetti } from '../utils/confetti.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderWelcomeScreen(container, onComplete) {
  const { recipient, senders } = birthdayConfig;

  const html = `
    <div id="welcome-screen" class="welcome-overlay">
      <!-- Floating Doodles in Background -->
      <div class="bg-doodle" style="top: 10%; left: 12%; font-size: 2.2rem; animation: floatGentle 3s infinite ease-in-out;">🎈</div>
      <div class="bg-doodle" style="top: 18%; right: 14%; font-size: 2rem; animation: floatHigh 4s infinite ease-in-out;">✨</div>
      <div class="bg-doodle" style="bottom: 15%; left: 10%; font-size: 2.2rem; animation: floatHigh 3.5s infinite ease-in-out 1s;">🌸</div>
      <div class="bg-doodle" style="bottom: 12%; right: 12%; font-size: 2.4rem; animation: floatGentle 4.2s infinite ease-in-out 0.5s;">🧁</div>

      <div class="welcome-content">
        <span class="welcome-tag">Special Delivery 📬</span>
        <h1 class="welcome-heading">PSSST... HEY, ${recipient.name}! 👀💗</h1>
        <p class="welcome-subtitle">Your two favorite idiots have something for you.</p>

        <!-- Animated Gift Box -->
        <div id="gift-box-interactive" class="gift-box-wrapper" title="Click me to open!">
          <div class="gift-lid">
            <div class="gift-bow">
              <div class="bow-left"></div>
              <div class="bow-right"></div>
              <div class="bow-center"></div>
            </div>
          </div>
          <div class="gift-box">
            <div class="gift-ribbon-vertical"></div>
            <div class="gift-ribbon-horizontal"></div>
          </div>
        </div>

        <div id="welcome-action-area">
          <button id="open-surprise-btn" class="cute-btn coral" style="font-size: 1.15rem; padding: 16px 36px;">
            OPEN YOUR SURPRISE 🎁
          </button>
        </div>

        <!-- Hidden Reveal Card (Appears on Open) -->
        <div id="welcome-reveal-card" class="welcome-reveal-card">
          <h2 class="reveal-title">SURPRISEEEEE!! 🥳🎉</h2>
          
          <div class="besties-intro">
            <div class="sender-pill">
              <div class="sender-avatar" style="background: ${senders.friendOne.avatarBg}">👨‍💻</div>
              <span class="sender-name">${senders.friendOne.name}</span>
              <span class="cute-badge" style="background: var(--color-pink)">Sender #1</span>
            </div>

            <div style="font-size: 1.8rem; font-weight: bold; color: var(--color-pink-deep);">&</div>

            <div class="sender-pill">
              <div class="sender-avatar" style="background: ${senders.friendTwo.avatarBg}">👩‍🎨</div>
              <span class="sender-name">${senders.friendTwo.name}</span>
              <span class="cute-badge" style="background: var(--color-yellow)">Sender #2</span>
            </div>
          </div>

          <div class="banter-bubble">
            "${senders.friendOne.name}: I didn't drop the cake this time!"<br>
            "${senders.friendTwo.name}: That's because I held it, you clown! Divya, prepare for maximum love!"
          </div>

          <button id="enter-party-btn" class="cute-btn primary" style="width: 100%; font-size: 1.1rem; padding: 16px;">
            LET'S SEE WHAT WE MADE FOR YOU! 🎈✨
          </button>
        </div>

        <div>
          <button id="skip-welcome-btn" class="skip-btn">
            Skip animation (I'm too excited!) 💨
          </button>
        </div>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const welcomeScreen = document.getElementById('welcome-screen');
  const giftBox = document.getElementById('gift-box-interactive');
  const openBtn = document.getElementById('open-surprise-btn');
  const revealCard = document.getElementById('welcome-reveal-card');
  const actionArea = document.getElementById('welcome-action-area');
  const enterPartyBtn = document.getElementById('enter-party-btn');
  const skipBtn = document.getElementById('skip-welcome-btn');

  let isOpening = false;

  function triggerOpen() {
    if (isOpening) return;
    isOpening = true;

    audioSynth.playWhoosh();
    giftBox.classList.add('shaking');

    setTimeout(() => {
      giftBox.classList.remove('shaking');
      giftBox.classList.add('opened');
      audioSynth.playFanfare();
      confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 90);

      actionArea.style.display = 'none';
      revealCard.classList.add('show');
    }, 700);
  }

  function dismissWelcome() {
    welcomeScreen.classList.add('hidden');
    // Start background lo-fi music after user interaction
    audioSynth.startMelody();
    confetti.burst(window.innerWidth / 2, 200, 50);
    if (onComplete) onComplete();
  }

  giftBox.addEventListener('click', triggerOpen);
  openBtn.addEventListener('click', triggerOpen);
  enterPartyBtn.addEventListener('click', dismissWelcome);
  skipBtn.addEventListener('click', dismissWelcome);
}
