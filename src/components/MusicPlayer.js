import { audioSynth } from '../utils/audioSynth.js';

export function renderMusicPlayer(container) {
  const html = `
    <!-- Floating Docked Music Player -->
    <div id="music-player" class="music-player-bar" role="region" aria-label="Music Player">
      <div class="soundwave-visualizer" id="soundwave-vis">
        <div class="soundwave-bar"></div>
        <div class="soundwave-bar"></div>
        <div class="soundwave-bar"></div>
        <div class="soundwave-bar"></div>
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-dark);" class="music-title-tag">
        🎵 Bestie Lo-Fi B-Day Beats
      </div>

      <button id="music-play-toggle" class="music-control-btn" title="Play/Pause Music" aria-label="Play or Pause Music">
        ⏸
      </button>

      <button id="music-mute-toggle" class="music-control-btn" title="Mute/Unmute" aria-label="Mute or Unmute">
        🔊
      </button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const playBtn = document.getElementById('music-play-toggle');
  const muteBtn = document.getElementById('music-mute-toggle');
  const visualizer = document.getElementById('soundwave-vis');

  function updateState() {
    if (audioSynth.isPlayingMusic) {
      playBtn.textContent = '⏸';
      visualizer.classList.add('playing');
    } else {
      playBtn.textContent = '▶';
      visualizer.classList.remove('playing');
    }

    muteBtn.textContent = audioSynth.isMuted ? '🔇' : '🔊';
  }

  playBtn.addEventListener('click', () => {
    audioSynth.toggleMelody();
    updateState();
  });

  muteBtn.addEventListener('click', () => {
    audioSynth.toggleMute();
    updateState();
  });

  // Initial state check
  updateState();

  // Expose updateState for external calls when video pauses/resumes music
  window.updateMusicUI = updateState;
}
