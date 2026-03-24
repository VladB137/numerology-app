import { t, localize, getLanguage } from './i18n.js';

const CATEGORY_ORDER = ['core', 'secondary', 'name', 'timing', 'special'];

/**
 * Render a complete reading to the results container.
 * @param {Array} results - Output from generateReading()
 * @param {HTMLElement} container
 */
export function renderReading(results, container) {
  container.innerHTML = '';

  // Summary dashboard — key numbers at a glance
  const keyIds = ['life-path', 'expression', 'soul-urge', 'birthday'];
  const keyResults = keyIds
    .map(id => results.find(r => r.module.id === id && !r.error && r.result))
    .filter(Boolean);

  if (keyResults.length > 0) {
    const summary = document.createElement('div');
    summary.className = 'reading-summary';
    summary.innerHTML = keyResults.map(r => `
      <div class="summary-item">
        <span class="summary-value">${r.result.value}</span>
        <span class="summary-label">${localize(r.module.name)}</span>
      </div>
    `).join('');
    container.appendChild(summary);
  }

  // Category navigation
  const activeCategories = CATEGORY_ORDER.filter(cat =>
    results.some(r => r.module.category === cat)
  );
  if (activeCategories.length > 1) {
    const nav = document.createElement('nav');
    nav.className = 'category-nav';
    nav.setAttribute('aria-label', 'Categories');
    nav.innerHTML = activeCategories
      .map(cat => `<a href="#cat-${cat}" class="category-nav-link">${t('results.categories.' + cat)}</a>`)
      .join('');
    container.appendChild(nav);
  }

  for (const category of CATEGORY_ORDER) {
    const categoryResults = results.filter(r => r.module.category === category);
    if (categoryResults.length === 0) continue;

    const section = document.createElement('section');
    section.className = 'category-section';
    section.id = `cat-${category}`;
    section.innerHTML = `<h2 class="category-heading">${t('results.categories.' + category)}</h2>`;

    // Group results by module ID for "Both systems" side-by-side display
    const grouped = new Map();
    for (const r of categoryResults) {
      if (!grouped.has(r.module.id)) grouped.set(r.module.id, []);
      grouped.get(r.module.id).push(r);
    }

    for (const [moduleId, moduleResults] of grouped) {
      if (moduleResults.length === 1) {
        section.appendChild(renderCard(moduleResults[0]));
      } else {
        // "Both systems" — render combined card with side-by-side results
        section.appendChild(renderCombinedCard(moduleResults));
      }
    }
    container.appendChild(section);
  }
}

/**
 * Render a single result card.
 */
function renderCard(r) {
  const card = document.createElement('article');
  card.className = `result-card result-card--${r.module.resultType}`;

  if (r.error) {
    card.innerHTML = `
      <div class="card-header">
        <span class="card-name">${localize(r.module.name)}</span>
        <span class="card-system">${r.system}</span>
      </div>
      <div class="card-error">${t('results.notAvailable')}</div>
    `;
    return card;
  }

  const desc = r.module.describe();
  const entries = r.interpretation?.entries || [];

  card.innerHTML = `
    <div class="card-header">
      <span class="card-name">${localize(r.module.name)}</span>
      <span class="card-system">${r.system}</span>
      ${renderResultValue(r)}
    </div>
    <details class="card-explain">
      <summary>${t('results.whatIsThis')}</summary>
      <p>${localize(desc.explanation)}</p>
    </details>
    <div class="card-entries">
      ${entries.map(e => `
        <div class="card-entry">
          <p class="entry-text">${e.text}</p>
          ${e.keywords ? `<div class="entry-keywords">${e.keywords.map(k => `<span class="keyword">${k}</span>`).join('')}</div>` : ''}
          ${e.sources ? `<div class="entry-sources">${e.sources.map(s => `<cite>${s.book}, p. ${s.page}</cite>`).join('')}</div>` : ''}
        </div>
      `).join('')}
    </div>
    <details class="card-how">
      <summary>${t('results.howCalculated')}</summary>
      <p>${localize(desc.howCalculated)}</p>
    </details>
  `;

  return card;
}

/**
 * Render a combined card for "Both systems" — side by side comparison.
 */
function renderCombinedCard(results) {
  const card = document.createElement('article');
  card.className = 'result-card result-card--combined';
  const mod = results[0].module;
  const desc = mod.describe();

  card.innerHTML = `
    <div class="card-header">
      <span class="card-name">${localize(mod.name)}</span>
      <span class="card-badge">Both Systems</span>
    </div>
    <div class="card-systems-compare">
      ${results.map(r => `
        <div class="system-column">
          <span class="system-label">${r.system}</span>
          ${r.error ? `<div class="card-error">${t('results.notAvailable')}</div>` : `
            ${renderResultValue(r)}
            <div class="card-entries">
              ${(r.interpretation?.entries || []).map(e => `
                <div class="card-entry">
                  <p class="entry-text">${e.text}</p>
                  ${e.sources ? `<div class="entry-sources">${e.sources.map(s => `<cite>${s.book}, p. ${s.page}</cite>`).join('')}</div>` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `).join('')}
    </div>
    <details class="card-explain">
      <summary>${t('results.whatIsThis')}</summary>
      <p>${localize(desc.explanation)}</p>
    </details>
    <details class="card-how">
      <summary>${t('results.howCalculated')}</summary>
      <p>${localize(desc.howCalculated)}</p>
    </details>
  `;
  return card;
}

function renderResultValue(r) {
  if (!r.result) return '';
  switch (r.module.resultType) {
    case 'single':
      return `<span class="card-number">${r.result.value}</span>`;
    case 'list':
      return `<span class="card-number">${r.result.values.join(', ')}</span>`;
    case 'multi-cycle':
      return `<span class="card-number">${r.result.cycles.map(c => c.value).join(' → ')}</span>`;
    case 'table':
    case 'map':
      return `<div class="card-table">${Object.entries(r.result.table).map(
        ([k, v]) => `<span class="table-cell"><span class="table-label">${k}</span><span class="table-value">${v}</span></span>`
      ).join('')}</div>`;
    default:
      return '';
  }
}
