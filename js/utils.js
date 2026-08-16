/**
 * UTILITY FUNCTIONS
 * Helper methods for URL parsing, Toast notifications, Clipboard, and Lightbox
 */

export const Utils = {
  /**
   * Parse Guest Name & WhatsApp from URL Query String
   * Supports: ?to=Bapak+Joko&wa=0812345678
   */
  getGuestInfo() {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('to') || params.get('nama') || params.get('guest');
    const waParam = params.get('wa') || params.get('phone');
    const paxParam = params.get('pax');

    let guestName = "Tamu Undangan";
    if (guestParam) {
      // Decode and sanitize
      guestName = decodeURIComponent(guestParam.replace(/\+/g, ' ')).trim();
    }

    return {
      name: guestName,
      isCustom: Boolean(guestParam),
      whatsapp: waParam ? decodeURIComponent(waParam) : "",
      pax: paxParam ? parseInt(paxParam, 10) : 1
    };
  },

  /**
   * Show Toast Notification Banner
   */
  showToast(message, type = "success") {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;

    if (toastIcon) {
      if (type === "success") {
        toastIcon.innerHTML = `<svg class="w-5 h-5 text-[#D9A05B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
      } else {
        toastIcon.innerHTML = `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
      }
    }

    toast.classList.add('show');

    // Auto dismiss after 3.5 seconds
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  },

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text, successMessage = "Berhasil disalin ke clipboard!") {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      this.showToast(successMessage, "success");
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.showToast("Gagal menyalin. Silakan salin manual.", "error");
      return false;
    }
  },

  /**
   * Generate Google Calendar Link for the Wedding
   */
  createGoogleCalendarUrl({ title, details, location, startTime, endTime }) {
    const formatTime = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const start = formatTime(new Date(startTime));
    const end = formatTime(new Date(endTime));
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  },

  /**
   * Format relative time in Indonesian
   */
  formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari yang lalu`;
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
};
