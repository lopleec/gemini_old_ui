/**
 * Gemini UI Optimizer - content.js
 * Keeps a lightweight theme-sync layer for Gemini's SPA shell.
 */

(function () {
  'use strict';

  const LIGHT_THEME_CLASS = 'custom-gemini-light';
  const DARK_THEME_CLASS = 'custom-gemini-dark';
  const THEME_ATTRS = ['class', 'data-theme', 'style'];

  let syncQueued = false;
  let isApplyingTheme = false;

  function isColorDark(colorString) {
    if (!colorString) return false;

    const rgb = colorString.match(/\d+/g);
    if (!rgb || rgb.length < 3) return false;

    const r = parseInt(rgb[0], 10);
    const g = parseInt(rgb[1], 10);
    const b = parseInt(rgb[2], 10);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.35;
  }

  function detectDarkTheme() {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    if (!bodyEl) return null;

    const explicitDarkTheme =
      htmlEl.classList.contains('dark-theme') ||
      htmlEl.getAttribute('data-theme') === 'dark' ||
      htmlEl.getAttribute('color-scheme') === 'dark' ||
      bodyEl.classList.contains('dark-theme') ||
      bodyEl.classList.contains('dark');

    if (explicitDarkTheme) return true;

    const bodyBackground = window.getComputedStyle(bodyEl).backgroundColor;
    if (bodyBackground !== 'rgba(0, 0, 0, 0)' && isColorDark(bodyBackground)) {
      return true;
    }

    const htmlBackground = window.getComputedStyle(htmlEl).backgroundColor;
    if (htmlBackground !== 'rgba(0, 0, 0, 0)' && isColorDark(htmlBackground)) {
      return true;
    }

    return false;
  }

  function applyTheme(themeIsDark) {
    const bodyEl = document.body;
    if (!bodyEl || typeof themeIsDark !== 'boolean') return;

    const nextDarkState = themeIsDark;
    const hasDarkClass = bodyEl.classList.contains(DARK_THEME_CLASS);
    const hasLightClass = bodyEl.classList.contains(LIGHT_THEME_CLASS);

    if (nextDarkState && hasDarkClass && !hasLightClass) return;
    if (!nextDarkState && hasLightClass && !hasDarkClass) return;

    isApplyingTheme = true;
    bodyEl.classList.toggle(DARK_THEME_CLASS, nextDarkState);
    bodyEl.classList.toggle(LIGHT_THEME_CLASS, !nextDarkState);
    isApplyingTheme = false;
  }

  function syncTheme() {
    syncQueued = false;
    applyTheme(detectDarkTheme());
  }

  function queueThemeSync() {
    if (syncQueued) return;
    syncQueued = true;
    window.requestAnimationFrame(syncTheme);
  }

  function initThemeObserver() {
    const observer = new MutationObserver((mutations) => {
      if (
        isApplyingTheme &&
        mutations.every(
          (mutation) =>
            mutation.type === 'attributes' &&
            mutation.target === document.body &&
            mutation.attributeName === 'class'
        )
      ) {
        return;
      }

      queueThemeSync();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: THEME_ATTRS
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: THEME_ATTRS
    });
  }

  function whenBodyReady(callback) {
    if (document.body) {
      callback();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!document.body) return;
      observer.disconnect();
      callback();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function initThemeSync() {
    queueThemeSync();

    whenBodyReady(() => {
      syncTheme();
      initThemeObserver();
    });

    document.addEventListener('DOMContentLoaded', queueThemeSync, { once: true });
    window.addEventListener('load', queueThemeSync);
    window.addEventListener('pageshow', queueThemeSync);

    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener?.('change', queueThemeSync);
    }
  }

  initThemeSync();
})();
