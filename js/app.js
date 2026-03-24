import { loadModules } from './registry.js';
import { generateReading } from './calculator.js';
import { renderReading } from './renderer.js';
import { initI18n, setLanguage, getLanguage, t } from './i18n.js';
import { normalizeName } from '../data/letter-values.js';

async function init() {
  try {
    await initI18n();
    const modules = await loadModules();
    console.log(`Loaded ${modules.length} modules`);
    setupForm();
    setupLanguageToggle();
    updateUIStrings();
  } catch (err) {
    console.error('App init failed:', err);
    const div = document.createElement('div');
    div.style.cssText = 'padding:2rem;color:#b91c1c';
    const h2 = document.createElement('h2');
    h2.textContent = 'Failed to initialize';
    const p = document.createElement('p');
    p.textContent = err.message;
    div.append(h2, p);
    document.body.replaceChildren(div);
  }
}

function setupForm() {
  const form = document.getElementById('reading-form');
  const nameInput = document.getElementById('full-name');
  const birthdateInput = document.getElementById('birthdate');
  const generateBtn = document.getElementById('generate-btn');

  // Set max date to today
  birthdateInput.max = new Date().toISOString().split('T')[0];

  // Enable button when required fields are valid
  function validateForm() {
    const nameValid = nameInput.value.trim().length > 0 && /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0102\u0103\u00C2\u00E2\u00CE\u00EE\u0218\u0219\u021A\u021B\s\-']+$/.test(nameInput.value.trim());
    const dateValid = birthdateInput.value && new Date(birthdateInput.value) <= new Date();
    generateBtn.disabled = !(nameValid && dateValid);
  }

  nameInput.addEventListener('input', validateForm);
  birthdateInput.addEventListener('input', validateForm);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = {
      fullName: normalizeName(nameInput.value),
      birthdate: new Date(birthdateInput.value),
      timeOfBirth: document.getElementById('time-of-birth').value || null,
      locationOfBirth: document.getElementById('location').value || null,
    };
    const system = document.querySelector('input[name="system"]:checked').value;
    const results = generateReading(input, system);

    document.getElementById('input-screen').hidden = true;
    document.getElementById('results-screen').hidden = false;
    document.getElementById('person-summary').textContent =
      `${nameInput.value} \u00b7 ${t('results.born')} ${birthdateInput.value}`;
    renderReading(results, document.getElementById('results-container'));
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('results-screen').hidden = true;
    document.getElementById('input-screen').hidden = false;
  });
}

function setupLanguageToggle() {
  const btn = document.getElementById('lang-toggle');
  btn.addEventListener('click', () => {
    setLanguage(getLanguage() === 'en' ? 'ro' : 'en');
  });
  document.addEventListener('language-changed', updateUIStrings);
}

function updateUIStrings() {
  document.getElementById('app-title').textContent = t('app.title');
  document.getElementById('app-subtitle').textContent = t('app.subtitle');
  document.getElementById('label-name').textContent = t('input.fullName');
  document.getElementById('label-birthdate').textContent = t('input.birthdate');
  document.getElementById('name-hint').textContent = t('input.nameHint');
  document.getElementById('generate-btn').textContent = t('input.generate');
  document.getElementById('lang-toggle').textContent = getLanguage() === 'en' ? 'RO' : 'EN';
  document.querySelectorAll('.optional-tag').forEach(el => el.textContent = `(${t('input.optional')})`);
}

// Register service worker with update notification
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'activated' && navigator.serviceWorker.controller) {
          if (confirm(t('app.updateAvailable') || 'New version available. Refresh?')) {
            window.location.reload();
          }
        }
      });
    });
  }).catch(err => console.warn('SW registration failed:', err));
}

init();
