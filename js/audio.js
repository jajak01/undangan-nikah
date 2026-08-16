/**
 * AUDIO CONTROLLER
 * Background music controller with disc rotation animation and tab visibility handling
 */

import { WEDDING_CONFIG } from './config.js';

class WeddingAudioController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.userPaused = false;
    this.discElement = null;
    this.toggleButton = null;
    this.iconElement = null;
  }

  init() {
    this.audio = new Audio();
    this.audio.src = WEDDING_CONFIG.multimedia.backgroundMusic;
    this.audio.loop = true;
    this.audio.preload = 'auto';

    // Fallback if primary CDN music fails
    this.audio.onerror = () => {
      if (WEDDING_CONFIG.multimedia.audioFallback && this.audio.src !== WEDDING_CONFIG.multimedia.audioFallback) {
        console.warn('Switching to audio fallback...');
        this.audio.src = WEDDING_CONFIG.multimedia.audioFallback;
        if (this.isPlaying) this.audio.play().catch(e => console.error(e));
      }
    };

    this.discElement = document.getElementById('audio-disc');
    this.toggleButton = document.getElementById('btn-audio-toggle');
    this.iconElement = document.getElementById('audio-icon');

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.togglePlay());
    }

    // Handle tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.isPlaying) {
          this.audio.pause();
        }
      } else {
        if (this.isPlaying && !this.userPaused) {
          this.audio.play().catch(e => console.warn('Autoplay resume prevented:', e));
        }
      }
    });
  }

  play() {
    if (!this.audio) return;
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.userPaused = false;
        this.updateUI(true);
      })
      .catch(err => {
        console.warn('Audio play request blocked or failed:', err);
      });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.userPaused = true;
    this.updateUI(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.discElement) {
      if (playing) {
        this.discElement.classList.remove('paused');
        this.discElement.classList.add('animate-spin-slow');
      } else {
        this.discElement.classList.add('paused');
      }
    }

    if (this.iconElement) {
      if (playing) {
        // Pause icon (two bars)
        this.iconElement.innerHTML = `
          <svg class="w-4 h-4 text-[#D9A05B]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        `;
      } else {
        // Play icon (triangle)
        this.iconElement.innerHTML = `
          <svg class="w-4 h-4 text-[#D9A05B] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
      }
    }
  }
}

export const AudioController = new WeddingAudioController();
