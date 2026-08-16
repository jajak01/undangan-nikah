/**
 * MAIN APPLICATION ENTRY POINT
 * Wedding Invitation Web Application
 * Fully Data-Driven from config.js
 */

import { WEDDING_CONFIG } from './config.js';
import { Utils } from './utils.js';
import { AudioController } from './audio.js';
import { initCountdown } from './countdown.js';
import { RSVP } from './rsvp.js';
import { renderAllFromConfig } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic DOM Population from config.js & URL
  renderAllFromConfig();

  // 2. Initialize Core Modules
  AudioController.init();
  initCountdown();
  RSVP.init();

  // 3. Initialize Cover Interaction & Opening
  setupCoverOpening();

  // 4. Initialize Digital Envelope & Gift Toggle
  setupGiftSection();

  // 5. Initialize Photo Lightbox
  setupGalleryLightbox();

  // 6. Initialize Calendar Integration
  setupCalendarButton();

  // 7. Initialize Ambient Sparkles / Particles Canvas
  initAmbientParticles();

  // 8. Initialize Smooth Navigation Scroll Spy
  setupNavigation();
});

/**
 * Setup Cover Unlock & Opening Transition
 */
function setupCoverOpening() {
  const coverOverlay = document.getElementById('cover-overlay');
  const btnOpen = document.getElementById('btn-open-invitation');
  const floatingNav = document.getElementById('floating-nav');
  const audioContainer = document.getElementById('audio-player-container');

  // Lock body scroll initially
  document.body.classList.add('lock-scroll');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      // 1. Play background music
      AudioController.play();

      // 2. Animate cover slide-up
      if (coverOverlay) {
        coverOverlay.classList.add('opened');
      }

      // 3. Unlock body scroll
      document.body.classList.remove('lock-scroll');

      // 4. Show floating controls with delay
      setTimeout(() => {
        if (floatingNav) floatingNav.classList.remove('hidden', 'opacity-0');
        if (audioContainer) audioContainer.classList.remove('hidden', 'opacity-0');
      }, 500);

      // 5. Initialize AOS if available
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-out-cubic',
          once: false,
          mirror: true,
          offset: 80
        });
        window.AOS.refresh();
      }

      // 6. Scroll to Hero smoothly
      const heroSec = document.getElementById('hero');
      if (heroSec) {
        heroSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/**
 * Setup Digital Envelope (Copy Rekening & Kirim Hadiah)
 */
function setupGiftSection() {
  const btnToggle = document.getElementById('btn-toggle-amplop');
  const content = document.getElementById('amplop-content');
  const toggleIcon = document.getElementById('amplop-toggle-icon');

  if (btnToggle && content) {
    btnToggle.addEventListener('click', () => {
      const isHidden = content.classList.contains('hidden');
      if (isHidden) {
        content.classList.remove('hidden');
        if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Copy Groom Account
  const btnCopyGroom = document.getElementById('btn-copy-groom-bank') || document.getElementById('btn-copy-bca');
  if (btnCopyGroom) {
    btnCopyGroom.addEventListener('click', () => {
      const bank = WEDDING_CONFIG.gift.bank;
      const accNumber = bank.accountNumber;
      Utils.copyToClipboard(accNumber, `Nomor rekening ${bank.bankName} (${accNumber}) berhasil disalin!`);
    });
  }

  // Copy Bride Account
  const btnCopyBride = document.getElementById('btn-copy-bride-bank') || document.getElementById('btn-copy-mandiri');
  if (btnCopyBride) {
    btnCopyBride.addEventListener('click', () => {
      const bank = WEDDING_CONFIG.gift.bankBride;
      const accNumber = bank.accountNumber;
      Utils.copyToClipboard(accNumber, `Nomor rekening ${bank.bankName} (${accNumber}) berhasil disalin!`);
    });
  }

  // Copy Address
  const btnCopyAddress = document.getElementById('btn-copy-address');
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener('click', () => {
      const fullAddress = WEDDING_CONFIG.gift.physicalGift.address;
      Utils.copyToClipboard(fullAddress, "Alamat pengiriman kado berhasil disalin!");
    });
  }
}

/**
 * Setup Gallery Lightbox Modal with Event Delegation
 */
let currentLightboxIndex = 0;
function setupGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  const galleryGrid = document.getElementById('gallery-photos-grid');

  if (!lightbox || !lightboxImg) return;

  function showImage(index) {
    const photos = WEDDING_CONFIG.multimedia.gallery;
    if (!photos || photos.length === 0) return;
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    currentLightboxIndex = index;

    lightboxImg.src = photos[currentLightboxIndex].url;
    if (lightboxCaption) {
      lightboxCaption.textContent = photos[currentLightboxIndex].caption || '';
    }
  }

  // Event Delegation for dynamically rendered gallery items
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-thumb-item');
      if (item) {
        const index = parseInt(item.getAttribute('data-index') || '0', 10);
        showImage(index);
        lightbox.classList.add('active');
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentLightboxIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentLightboxIndex + 1);
    });
  }

  // Close when clicking background outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lightbox-container') {
      lightbox.classList.remove('active');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') showImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentLightboxIndex + 1);
  });
}

/**
 * Setup Google Calendar / Add to Calendar Button
 */
function setupCalendarButton() {
  const btnCalendar = document.getElementById('btn-add-calendar');
  if (!btnCalendar) return;

  btnCalendar.addEventListener('click', (e) => {
    e.preventDefault();
    const event = WEDDING_CONFIG.event;
    const couple = WEDDING_CONFIG.couple;
    const calUrl = Utils.createGoogleCalendarUrl({
      title: `The Wedding of ${couple.groom.shortName} & ${couple.bride.shortName}`,
      details: `Pernikahan ${couple.groom.fullName} & ${couple.bride.fullName}.\nAkad: ${event.akad.time}\nResepsi: ${event.resepsi.time}\nLokasi: ${event.akad.venue} - ${event.akad.address}`,
      location: event.akad.address,
      startTime: "2026-12-28T08:00:00+07:00",
      endTime: "2026-12-28T14:00:00+07:00"
    });

    window.open(calUrl, '_blank');
  });
}

/**
 * Setup Ambient Particles (Subtle Gold Floating Dust)
 */
function initAmbientParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particleCount = window.innerWidth < 768 ? 35 : 70;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(217, 160, 91, ${p.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(217, 160, 91, 0.5)';
      ctx.fill();

      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      // Wrap around bounds
      if (p.y > canvas.height) {
        p.y = -5;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
    });

    animationFrameId = requestAnimationFrame(drawParticles);
  }

  drawParticles();
}

/**
 * Setup Floating Bottom Navigation Scroll Highlighting
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#D9A05B]', 'scale-110');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#D9A05B]', 'scale-110');
      }
    });
  });
}
