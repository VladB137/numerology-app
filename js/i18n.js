let _lang = localStorage.getItem('numerology-lang') || 'en';
let _strings = {};

/**
 * Load language strings from i18n/{lang}.json.
 * @param {string} lang - 'en' or 'ro'
 */
export async function setLanguage(lang) {
  _lang = lang;
  localStorage.setItem('numerology-lang', lang);
  try {
    const resp = await fetch(`./i18n/${lang}.json`);
    _strings = await resp.json();
  } catch {
    _strings = {};
  }
  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
}

/**
 * Get the current language.
 * @returns {string}
 */
export function getLanguage() {
  return _lang;
}

/**
 * Translate a key. Falls back to the key itself.
 * @param {string} key - Dot-separated path, e.g. "input.fullName"
 * @returns {string}
 */
export function t(key) {
  const parts = key.split('.');
  let val = _strings;
  for (const p of parts) {
    if (val && typeof val === 'object') val = val[p];
    else return key;
  }
  return typeof val === 'string' ? val : key;
}

/**
 * Get a bilingual text object's value in current language.
 * @param {Object} bilingualObj - { en: "...", ro: "..." }
 * @returns {string}
 */
export function localize(bilingualObj) {
  if (!bilingualObj) return '';
  return bilingualObj[_lang] || bilingualObj.en || '';
}

/** Initialize with saved preference */
export async function initI18n() {
  await setLanguage(_lang);
}
