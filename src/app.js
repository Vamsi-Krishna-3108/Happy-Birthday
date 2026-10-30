/**
 * Main Application Orchestrator
 */

import { renderWelcomeScreen } from './components/WelcomeScreen.js';
import { renderBirthdayHero } from './components/BirthdayHero.js';
import { renderPhotoGallery } from './components/PhotoGallery.js';
import { renderVideoGallery } from './components/VideoGallery.js';
import { renderPersonalLetters } from './components/PersonalLetters.js';
import { renderBirthdayCake } from './components/BirthdayCake.js';
import { renderLoveMeter } from './components/LoveMeter.js';
import { renderBalloonGame } from './components/BalloonGame.js';
import { renderSecretSurprise } from './components/SecretSurprise.js';
import { renderMemoryTimeline } from './components/MemoryTimeline.js';
import { renderMusicPlayer } from './components/MusicPlayer.js';
import { renderFinalSurprise } from './components/FinalSurprise.js';
import { renderEasterEgg } from './components/EasterEgg.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  function initApp() {
    appContainer.innerHTML = '';

    // Render Welcome Screen first
    renderWelcomeScreen(appContainer, () => {
      // Callback after welcome screen is dismissed
      console.log('Welcome screen completed! Party is live.');
    });

    // Main Website Content Container
    const mainWrap = document.createElement('main');
    mainWrap.id = 'main-website-content';
    appContainer.appendChild(mainWrap);

    // Render Sections in order of story progression
    renderBirthdayHero(mainWrap);
    renderPhotoGallery(mainWrap);
    renderVideoGallery(mainWrap);
    renderPersonalLetters(mainWrap);
    renderBirthdayCake(mainWrap);
    renderLoveMeter(mainWrap);
    renderBalloonGame(mainWrap);
    renderSecretSurprise(mainWrap);
    renderMemoryTimeline(mainWrap);
    renderFinalSurprise(mainWrap, () => {
      // Replay action: reset session storage and reload/re-render
      sessionStorage.clear();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        initApp();
      }, 500);
    });

    // Floating UI components
    renderMusicPlayer(appContainer);
    renderEasterEgg(appContainer);
  }

  initApp();
});
