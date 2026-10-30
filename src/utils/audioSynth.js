/**
 * Web Audio API Synthesizer
 * Provides cute sound effects and a sweet lo-fi music box Happy Birthday melody.
 * Zero external audio downloads needed, completely reliable across all browsers.
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentNoteIndex = 0;
    this.masterGain = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // --- Sound Effects ---

  // Balloon pop sound
  playPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const freq = 450 + Math.random() * 250;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Celestial chime for reveal & secrets
  playChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.65);
      }, i * 90);
    });
  }

  // Candle blowing whoosh sound
  playBlow() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Filtered pink/white noise simulation
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  // Card & envelope paper whoosh
  playWhoosh() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.16);
  }

  // Glitch overload for love meter
  playGlitch() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [200, 800, 300, 950, 450, 1100, 600, 1400];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      }, idx * 60);
    });
  }

  // Victory fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 150 }, // C5
      { f: 659.25, d: 150 }, // E5
      { f: 783.99, d: 180 }, // G5
      { f: 1046.5, d: 450 }  // C6
    ];

    let delay = 0;
    melody.forEach(item => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (item.d / 1000));

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + (item.d / 1000) + 0.05);
      }, delay);
      delay += item.d;
    });
  }

  // --- Background Lo-Fi Birthday Music Box ---

  happyBirthdayNotes = [
    // Happy Birthday To You
    { f: 261.63, d: 350 }, // C4 Hap-
    { f: 261.63, d: 350 }, // C4 py
    { f: 293.66, d: 600 }, // D4 Birth-
    { f: 261.63, d: 600 }, // C4 day
    { f: 349.23, d: 600 }, // F4 to
    { f: 329.63, d: 1100 }, // E4 you

    // Happy Birthday To You
    { f: 261.63, d: 350 }, // C4 Hap-
    { f: 261.63, d: 350 }, // C4 py
    { f: 293.66, d: 600 }, // D4 Birth-
    { f: 261.63, d: 600 }, // C4 day
    { f: 392.00, d: 600 }, // G4 to
    { f: 349.23, d: 1100 }, // F4 you

    // Happy Birthday Dear Divya
    { f: 261.63, d: 350 }, // C4 Hap-
    { f: 261.63, d: 350 }, // C4 py
    { f: 523.25, d: 600 }, // C5 Birth-
    { f: 440.00, d: 600 }, // A4 day
    { f: 349.23, d: 600 }, // F4 dear
    { f: 329.63, d: 600 }, // E4 Div-
    { f: 293.66, d: 1100 }, // D4 ya

    // Happy Birthday To You
    { f: 466.16, d: 350 }, // Bb4 Hap-
    { f: 466.16, d: 350 }, // Bb4 py
    { f: 440.00, d: 600 }, // A4 Birth-
    { f: 349.23, d: 600 }, // F4 day
    { f: 392.00, d: 600 }, // G4 to
    { f: 349.23, d: 1400 }, // F4 you
    { f: 0, d: 1000 } // Pause before repeat
  ];

  startMelody() {
    if (this.isPlayingMusic) return;
    this.ensureContext();
    this.isPlayingMusic = true;
    this.playNextMusicNote();
  }

  playNextMusicNote() {
    if (!this.isPlayingMusic) return;

    const note = this.happyBirthdayNotes[this.currentNoteIndex];
    if (note.f > 0 && !this.isMuted && this.ctx) {
      // Play a soft bell-like chime
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.f * 2, this.ctx.currentTime); // Harmonic shimmer

      const durationSec = note.d / 1000;
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + durationSec * 0.95);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + durationSec);
      osc2.stop(this.ctx.currentTime + durationSec);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.happyBirthdayNotes.length;
    this.musicTimer = setTimeout(() => {
      this.playNextMusicNote();
    }, note.d);
  }

  stopMelody() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMelody() {
    if (this.isPlayingMusic) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : 0.25;
    }
    return this.isMuted;
  }
}

export const audioSynth = new AudioSynthesizer();
