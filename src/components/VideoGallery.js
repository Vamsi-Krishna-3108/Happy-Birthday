import { birthdayConfig } from '../config/birthdayConfig.js';
import { audioSynth } from '../utils/audioSynth.js';

export function renderVideoGallery(container) {
  const { videos, senders, recipient } = birthdayConfig;
  let activeVideo = null;
  let canvasAnimationId = null;

  const cardsHtml = videos.map((v, idx) => {
    return `
      <div class="video-card ${v.featured ? 'featured' : ''}" data-index="${idx}" tabindex="0" role="button" aria-label="Play video: ${v.title}">
        <div class="video-thumb">
          <video class="video-thumb-preview" src="${v.src}#t=0.5" preload="metadata" muted playsinline></video>
          <div class="video-thumb-overlay">
            <div class="video-play-btn-circle">▶</div>
          </div>
          <div class="video-play-badge">⏱️ ${v.duration}</div>
          ${v.featured ? `<div class="cute-badge video-featured-badge" style="position: absolute; top: 10px; left: 10px; background: var(--color-pink)">⭐ FEATURED</div>` : ''}
        </div>
        <div class="video-info">
          <span class="cute-badge" style="background: var(--color-yellow); font-size: 0.65rem; margin-bottom: 6px;">${v.badge}</span>
          <h3 class="video-title">${v.title}</h3>
          <p class="video-caption">${v.caption}</p>
        </div>
      </div>
    `;
  }).join('');

  const html = `
    <section class="video-section" id="videos-section">
      <div class="scrapbook-container">
        <div class="section-title-wrap">
          <span class="section-tag">Video Vault 🎬</span>
          <h2 class="section-title">THE CINEMATIC MASTERPIECES</h2>
          <p class="section-subtitle">Real moments from the archives that our lawyers warned us not to publish.</p>
        </div>

        <div class="video-grid">
          ${cardsHtml}
        </div>
      </div>

      <!-- Video Player Modal -->
      <div id="video-player-modal" class="video-modal" role="dialog" aria-modal="true">
        <div class="video-modal-inner">
          <button id="video-modal-close" class="lightbox-close-btn" aria-label="Close Video">✕</button>
          
          <h3 id="video-modal-title" style="font-family: var(--font-main); font-size: 1.4rem; color: var(--color-text-dark); margin-bottom: 12px;"></h3>
          
          <div class="video-screen-container">
            <video id="video-html5-player" controls playsinline style="width: 100%; height: 100%; object-fit: contain; display: none; background: #000;"></video>
            <canvas id="video-canvas" width="600" height="340" style="width: 100%; height: 100%; object-fit: contain;"></canvas>
            <div id="video-overlay-text" style="position: absolute; bottom: 20px; left: 20px; right: 20px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.8); font-family: var(--font-main); font-weight: 700; text-align: center; pointer-events: none;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
            <p id="video-modal-caption" style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.4; max-width: 80%;"></p>
            <button id="video-replay-btn" class="cute-btn yellow" style="padding: 8px 16px; font-size: 0.9rem;">
              🔄 REPLAY
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  const modal = document.getElementById('video-player-modal');
  const closeBtn = document.getElementById('video-modal-close');
  const titleEl = document.getElementById('video-modal-title');
  const captionEl = document.getElementById('video-modal-caption');
  const overlayText = document.getElementById('video-overlay-text');
  const replayBtn = document.getElementById('video-replay-btn');
  const canvas = document.getElementById('video-canvas');
  const ctx = canvas.getContext('2d');
  const cards = document.querySelectorAll('.video-card');
  const videoPlayer = document.getElementById('video-html5-player');

  function startCanvasAnimation(videoData) {
    let frame = 0;

    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#1E1428');
      grad.addColorStop(1, '#2E1A3D');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cute animated retro film grain & sparkles
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(frame * 0.02 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(frame * 0.03 + i * 2) * 0.5 + 0.5) * canvas.height;
        ctx.fillStyle = i % 2 === 0 ? '#FFD6E7' : '#FFF0AD';
        ctx.beginPath();
        ctx.arc(x, y, (Math.sin(frame * 0.1 + i) + 1.5) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw video stage representation
      if (videoData.featured) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`💌 Birthday Tribute: ${recipient.name}`, canvas.width / 2, 70);

        ctx.font = 'italic 18px Quicksand, sans-serif';
        ctx.fillStyle = '#FFD6E7';
        const msg = frame % 200 < 100 
          ? `"${senders.friendOne.name}: Divya, don't forget who coded this website!"` 
          : `"${senders.friendTwo.name}: And don't forget who brought all the aesthetic love!"`;
        ctx.fillText(msg, canvas.width / 2, 170);

        const heartScale = 1 + Math.sin(frame * 0.08) * 0.15;
        ctx.font = `${40 * heartScale}px sans-serif`;
        ctx.fillText('💖🎂💖', canvas.width / 2, 240);
      } else {
        ctx.fillStyle = '#FFF0AD';
        ctx.font = 'bold 20px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`▶ REC  00:0${Math.floor(frame / 60)}:0${frame % 60}`, canvas.width / 2, 60);

        ctx.font = '60px sans-serif';
        const emojis = ['🤡', '😂', '🥳', '🍿', '👯‍♀️'];
        const currentEmoji = emojis[Math.floor(frame / 60) % emojis.length];
        ctx.fillText(currentEmoji, canvas.width / 2, 180 + Math.sin(frame * 0.1) * 10);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Quicksand, sans-serif';
        ctx.fillText('⚡ 100% UNFILTERED REAL BEST-FRIEND CHAOS ⚡', canvas.width / 2, 250);
      }

      canvasAnimationId = requestAnimationFrame(animate);
    }

    animate();
  }

  function openVideoModal(video) {
    activeVideo = video;
    titleEl.textContent = video.title;
    captionEl.textContent = video.caption;
    overlayText.textContent = `Featuring ${recipient.name}, ${senders.friendOne.name} & ${senders.friendTwo.name}`;
    modal.classList.add('active');

    // Pause background music during video playback
    audioSynth.stopMelody();
    if (window.updateMusicUI) window.updateMusicUI();
    audioSynth.playWhoosh();

    if (video.src) {
      canvas.style.display = 'none';
      overlayText.style.display = 'none';
      videoPlayer.style.display = 'block';
      videoPlayer.src = video.src;
      videoPlayer.currentTime = 0;

      videoPlayer.onerror = () => {
        console.warn('Video failed to load:', video.src);
        videoPlayer.style.display = 'none';
        canvas.style.display = 'block';
        overlayText.style.display = 'block';
        startCanvasAnimation(video);
      };

      const playPromise = videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay prevented by browser, video ready for user click:', err);
        });
      }
    } else {
      videoPlayer.style.display = 'none';
      videoPlayer.pause();
      canvas.style.display = 'block';
      overlayText.style.display = 'block';
      startCanvasAnimation(video);
    }
  }

  function closeVideoModal() {
    modal.classList.remove('active');
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = '';
    }
    if (canvasAnimationId) {
      cancelAnimationFrame(canvasAnimationId);
      canvasAnimationId = null;
    }
    // Resume background melody
    audioSynth.startMelody();
    if (window.updateMusicUI) window.updateMusicUI();
  }

  cards.forEach(card => {
    const previewVid = card.querySelector('.video-thumb-preview');
    card.addEventListener('mouseenter', () => {
      if (previewVid) {
        previewVid.currentTime = 0;
        previewVid.play().catch(() => {});
      }
    });
    card.addEventListener('mouseleave', () => {
      if (previewVid) {
        previewVid.pause();
        previewVid.currentTime = 0.5;
      }
    });

    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openVideoModal(videos[idx]);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openVideoModal(videos[idx]);
      }
    });
  });

  closeBtn.addEventListener('click', closeVideoModal);

  replayBtn.addEventListener('click', () => {
    if (activeVideo) {
      audioSynth.playPop();
      if (videoPlayer && videoPlayer.style.display !== 'none' && videoPlayer.src) {
        videoPlayer.currentTime = 0;
        videoPlayer.play().catch(() => {});
      } else {
        if (canvasAnimationId) cancelAnimationFrame(canvasAnimationId);
        startCanvasAnimation(activeVideo);
      }
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeVideoModal();
    }
  });
}
