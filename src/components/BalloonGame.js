import { birthdayConfig } from '../config/birthdayConfig.js';
import { audioSynth } from '../utils/audioSynth.js';
import { confetti } from '../utils/confetti.js';

export function renderBalloonGame(container) {
  const { balloonMessages, senders, recipient } = birthdayConfig;
  let poppedCount = 0;
  let balloonsInPlay = [];
  let gameInterval = null;

  const pastelColors = ['#FFD6E7', '#CDEBFF', '#E5D8FF', '#FFF0AD', '#B5EAD7', '#FFDAC1'];

  const html = `
    <section class="balloon-section" id="game-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Interactive Arcade 🎈</span>
          <h2 class="section-title">POP THE BALLOONS!</h2>
          <p class="section-subtitle">TAP THE BALLOONS TO UNLOCK SECRET MESSAGES!</p>
        </div>

        <div class="balloon-game-container">
          <div class="game-scoreboard">
            <span>🎯 BALLOONS POPPED: <span id="game-pop-score" style="color: var(--color-pink-deep); font-size: 1.25rem;">0</span></span>
            <button id="game-restart-btn" class="cute-btn yellow" style="padding: 6px 16px; font-size: 0.85rem;">
              🔄 RESET GAME
            </button>
          </div>

          <div class="balloon-play-arena" id="balloon-arena" tabindex="0" aria-label="Balloon popping game arena">
            <!-- Balloons generated dynamically -->
          </div>

          <div class="revealed-message-ticker" id="revealed-message-ticker">
            🎈 Click or tap any floating balloon to reveal a bestie secret!
          </div>

          <!-- 3-Pops Bonus Unlock Modal -->
          <div id="bonus-unlock-card" style="display: none; background: #FFF9F0; border: 3px solid var(--color-text-dark); border-radius: var(--radius-md); padding: 18px; margin-top: 16px; box-shadow: 4px 6px 0 var(--color-text-dark);">
            <div style="font-size: 2rem; margin-bottom: 6px;">🏆👑✨</div>
            <h4 style="font-family: var(--font-main); font-size: 1.3rem; color: var(--color-pink-deep); margin-bottom: 6px;">
              LEVEL COMPLETED! BONUS MESSAGE UNLOCKED:
            </h4>
            <p style="font-size: 1.05rem; color: #372A3C; font-weight: 600;">
              "${senders.friendOne.name} & ${senders.friendTwo.name} officially declare ${recipient.name} the undisputed GOAT (Greatest of All Time) best friend. Pop more balloons if you want unlimited compliments!"
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const arena = document.getElementById('balloon-arena');
  const scoreEl = document.getElementById('game-pop-score');
  const ticker = document.getElementById('revealed-message-ticker');
  const restartBtn = document.getElementById('game-restart-btn');
  const bonusCard = document.getElementById('bonus-unlock-card');

  function spawnBalloon() {
    if (!arena) return;
    const balloon = document.createElement('div');
    balloon.className = 'game-balloon';
    
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    balloon.style.backgroundColor = randomColor;

    const arenaWidth = arena.clientWidth || 600;
    const startX = 20 + Math.random() * (arenaWidth - 90);
    balloon.style.left = `${startX}px`;
    balloon.style.bottom = `-90px`;

    const string = document.createElement('div');
    string.className = 'game-balloon-string';
    balloon.appendChild(string);

    const message = balloonMessages[Math.floor(Math.random() * balloonMessages.length)];

    arena.appendChild(balloon);

    let currentBottom = -90;
    const speed = 1.2 + Math.random() * 1.5;

    function moveUp() {
      currentBottom += speed;
      balloon.style.bottom = `${currentBottom}px`;

      if (currentBottom > 420) {
        if (balloon.parentNode === arena) arena.removeChild(balloon);
      } else {
        requestAnimationFrame(moveUp);
      }
    }

    requestAnimationFrame(moveUp);

    function pop() {
      audioSynth.playPop();
      poppedCount++;
      scoreEl.textContent = poppedCount;
      ticker.textContent = `✨ "${message}"`;

      // Visual particle pop burst
      confetti.burst(
        balloon.getBoundingClientRect().left + 34,
        balloon.getBoundingClientRect().top + 42,
        25
      );

      if (balloon.parentNode === arena) {
        arena.removeChild(balloon);
      }

      if (poppedCount >= 3 && bonusCard.style.display === 'none') {
        bonusCard.style.display = 'block';
        audioSynth.playFanfare();
        confetti.burst(window.innerWidth / 2, window.innerHeight * 0.5, 60);
      }
    }

    balloon.addEventListener('click', pop);
    balloon.addEventListener('touchstart', (e) => {
      e.preventDefault();
      pop();
    });
  }

  function startGame() {
    arena.innerHTML = '';
    poppedCount = 0;
    scoreEl.textContent = '0';
    bonusCard.style.display = 'none';
    ticker.textContent = '🎈 Click or tap any floating balloon to reveal a bestie secret!';

    if (gameInterval) clearInterval(gameInterval);

    // Initial batch
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnBalloon(), i * 600);
    }

    gameInterval = setInterval(() => {
      if (arena.children.length < 6) {
        spawnBalloon();
      }
    }, 1200);
  }

  startGame();
  restartBtn.addEventListener('click', () => {
    audioSynth.playPop();
    startGame();
  });
}
