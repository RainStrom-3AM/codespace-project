import { useId, useState } from 'react';
import { categoryLabels, catalogRevision, presets } from '../data/catalog';
import type { Category, UserAgentPreset } from '../data/catalog';
import { writeClipboard } from '../lib/clipboard';
import { emptyFilters, filterPresets, pickRandomPreset } from '../lib/catalog';

const categoryOrder: Category[] = ['desktop', 'mobile', 'legacy', 'embedded', 'bot'];

function App() {
  const filtersId = useId();
  const [filters, setFilters] = useState(emptyFilters);
  const [selected, setSelected] = useState<UserAgentPreset>();
  const [copyStatus, setCopyStatus] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const matchingPresets = filterPresets(presets, filters);
  const selectionIsFilteredOut = selected && !matchingPresets.some(({ id }) => id === selected.id);
  const activeFilterCount = filters.categories.length + filters.families.length
    + filters.platforms.length + filters.deviceTypes.length + Number(Boolean(filters.query))
    + Number(filters.era !== 'all');

  function updateFilter<K extends keyof typeof filters>(key: K, value: typeof filters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleValue<T extends string>(values: T[], value: T): T[] {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  }

  function choosePreset(preset: UserAgentPreset) {
    setSelected(preset);
    setCopyStatus('');
  }

  function generateRandom() {
    const preset = pickRandomPreset(matchingPresets, selected?.id);
    if (preset) choosePreset(preset);
  }

  async function copySelected() {
    if (!selected) return;
    try {
      const clipboard = navigator.clipboard as Clipboard | undefined;
      if (clipboard && typeof clipboard.writeText === 'function') {
        await writeClipboard(selected.userAgent, clipboard);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = selected.userAgent;
        textArea.setAttribute('readonly', '');
        textArea.className = 'clipboard-fallback';
        document.body.append(textArea);
        let copied = false;
        try {
          textArea.select();
          copied = document.execCommand('copy');
        } finally {
          textArea.remove();
        }
        if (!copied) throw new Error('Clipboard unavailable');
      }
      setCopyStatus('Copied to clipboard');
    } catch {
      setCopyStatus('Copy failed. Select the string and copy it manually.');
    }
  }

  function clearFilters() {
    setFilters(emptyFilters());
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="UA Index home">
          <span className="wordmark-icon" aria-hidden="true">ua</span>
          <span>INDEX<span className="wordmark-period">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="topbar-note">A field guide for the web</span>
          <span className="local-badge"><span className="local-dot" />LOCAL ONLY</span>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> USER-AGENT REFERENCE</p>
            <h1 id="page-title">Every browser<br />leaves a <em>trace.</em></h1>
            <p className="hero-description">A considered collection of User-Agent strings for testing, debugging, and understanding the clients that visit your work.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <span className="hero-mark-bracket">[</span>
            <span className="hero-mark-glyph">UA</span>
            <span className="hero-mark-bracket">]</span>
            <span className="hero-mark-caption">IDENTITY / 001</span>
          </div>
          <div className="hero-baseline">
            <span>BUILT FOR THE CURIOUS</span>
            <span>REPRESENTATIVE FIXTURES · NOT LIVE DETECTION</span>
          </div>
        </section>

        <section className="tool-area" aria-label="User-Agent catalog">
          <div className="tool-heading">
            <div>
              <p className="eyebrow"><span>02</span> THE CATALOG</p>
              <h2>Find your string.</h2>
            </div>
          <p className="tool-count" aria-live="polite" aria-atomic="true"><strong>{matchingPresets.length.toString().padStart(2, '0')}</strong><span> / {presets.length.toString().padStart(2, '0')} ENTRIES</span></p>
          </div>

          <div className="workspace">
            <aside className="filter-panel" aria-label="Filter catalog">
              <button className="filter-disclosure" type="button" aria-expanded={filtersOpen} aria-controls={filtersId} onClick={() => setFiltersOpen((open) => !open)}>
                <span>FILTER THE INDEX <span className="filter-mobile-count">{activeFilterCount ? `· ${activeFilterCount} ACTIVE` : ''}</span></span>
                <span aria-hidden="true">{filtersOpen ? '−' : '+'}</span>
              </button>
              <div className={`filter-content${filtersOpen ? ' is-open' : ''}`} id={filtersId}>
                <label className="field-label" htmlFor="catalog-search">SEARCH THE INDEX</label>
                <div className="search-wrap">
                  <span className="search-icon" aria-hidden="true">⌕</span>
                  <input id="catalog-search" type="search" placeholder="Try ‘Android’ or ‘crawler’" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} />
                </div>

                <FilterGroup title="TYPE" values={categoryOrder} selected={filters.categories} labelFor={(value) => categoryLabels[value]} onToggle={(value) => updateFilter('categories', toggleValue(filters.categories, value))} />
                <FilterGroup title="BROWSER / AGENT" values={uniqueValues('family')} selected={filters.families} onToggle={(value) => updateFilter('families', toggleValue(filters.families, value))} />
                <FilterGroup title="PLATFORM" values={uniqueValues('platform')} selected={filters.platforms} onToggle={(value) => updateFilter('platforms', toggleValue(filters.platforms, value))} />
                <FilterGroup title="DEVICE" values={['desktop', 'phone', 'tablet', 'appliance', 'bot']} selected={filters.deviceTypes} onToggle={(value) => updateFilter('deviceTypes', toggleValue(filters.deviceTypes, value))} />
                <FilterGroup title="COLLECTION" values={['browsers', 'older', 'all']} selected={[filters.era]} labelFor={(value) => value === 'older' ? 'Legacy / device' : value === 'all' ? 'Any collection' : 'Browser fixtures'} onToggle={(value) => updateFilter('era', value)} />

                <button className="clear-button" type="button" onClick={clearFilters} disabled={!activeFilterCount}>CLEAR ALL FILTERS <span aria-hidden="true">↗</span></button>
              </div>
              <div className="filter-footnote">A curated reference. No accounts, tracking, or requests leave this page.</div>
            </aside>

            <div className="results-column">
              <section className="generator-panel" aria-labelledby="generator-title">
                <div className="generator-topline"><span className="generator-index">SPECIMEN 001</span><span className="generator-cross" aria-hidden="true">✳</span></div>
                {selected ? (
                  <>
                    <div className="selection-meta">
                      <span>{selected.family.toUpperCase()}</span>
                      <span>{selected.platform.toUpperCase()}{selected.platformVersion ? ` · ${selected.platformVersion}` : ''}</span>
                    </div>
                    <h3 id="generator-title" className="selection-title" aria-live="polite">{selected.label}</h3>
                    <p className="selection-subtitle">VERSION {selected.version} <span>·</span> {selected.deviceType.toUpperCase()}{selectionIsFilteredOut ? ' · OUTSIDE CURRENT FILTERS' : ''}</p>
                    <code className="ua-string" tabIndex={0}>{selected.userAgent}</code>
                    <div className="generator-actions">
                      <button className="copy-button" type="button" onClick={copySelected}>
                        <span aria-hidden="true">▣</span> COPY USER-AGENT
                      </button>
                      <button className="reroll-button" type="button" onClick={generateRandom} disabled={!matchingPresets.length} aria-label="Pick another random matching User-Agent">
                        <span aria-hidden="true">↻</span> ANOTHER
                      </button>
                    </div>
                    <p className="copy-status" aria-live="polite">{copyStatus}</p>
                    <a className="source-link" href={selected.source} target="_blank" rel="noreferrer">
                      SOURCE REFERENCE <span aria-hidden="true">↗</span>
                    </a>
                  </>
                ) : (
                  <div className="generator-empty">
                    <div className="empty-orbit" aria-hidden="true"><span>UA</span><i /><i /><i /></div>
                    <p className="eyebrow">NO SPECIMEN SELECTED</p>
                    <h3 id="generator-title">Choose a trace<br />to inspect.</h3>
                    <p>Select an entry from the index, or draw one at random from your current filters.</p>
                    <button className="copy-button" type="button" onClick={generateRandom} disabled={!matchingPresets.length}>
                      <span aria-hidden="true">↻</span> GENERATE A MATCH
                    </button>
                  </div>
                )}
                <div className="generator-coordinates"><span>UA / {selected ? selected.id.toUpperCase() : '—'}</span><span>FIG. A</span></div>
              </section>

              <section className="preset-section" aria-labelledby="presets-title">
                <div className="preset-toolbar">
                  <div><p className="eyebrow">MATCHING RECORDS</p><h3 id="presets-title">The index <span>({matchingPresets.length})</span></h3></div>
                  <button className="random-button" type="button" onClick={generateRandom} disabled={!matchingPresets.length}><span aria-hidden="true">↻</span> RANDOM MATCH</button>
                </div>

                {matchingPresets.length ? (
                  <ul className="preset-list">
                    {matchingPresets.map((preset, index) => (
                      <li key={preset.id}>
                        <button className={`preset-row${selected?.id === preset.id ? ' is-selected' : ''}`} type="button" onClick={() => choosePreset(preset)} aria-pressed={selected?.id === preset.id}>
                          <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
                          <span className="row-main"><span className="row-label">{preset.label}</span><span className="row-family">{preset.family} · {preset.version}</span><span className="row-preview">{preset.userAgent}</span></span>
                          <span className="row-platform">{preset.platform}<small>{preset.deviceType}</small></span>
                          <span className="row-arrow" aria-hidden="true">↗</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-results"><span className="empty-symbol" aria-hidden="true">∅</span><div><h4>No matching records.</h4><p>Try another search or remove a filter to widen the index.</p></div><button type="button" onClick={clearFilters}>RESET FILTERS <span aria-hidden="true">↗</span></button></div>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-mark" href="#top">UA<span>/</span>INDEX</a>
        <p>User-Agent strings are representative testing fixtures. They can be outdated, reduced, or overridden by browsers; they do not change your browser identity.</p>
        <span className="catalog-revision">CATALOG {catalogRevision} <span>·</span> REVIEWED 24 SEP 2026</span>
      </footer>
    </div>
  );
}

function uniqueValues(field: 'family' | 'platform'): string[] {
  return [...new Set(presets.map((preset) => preset[field]))].sort((a, b) => a.localeCompare(b));
}

type FilterGroupProps<T extends string> = {
  title: string;
  values: T[];
  selected: T[];
  labelFor?: (value: T) => string;
  onToggle: (value: T) => void;
};

function FilterGroup<T extends string>({ title, values, selected, labelFor, onToggle }: FilterGroupProps<T>) {
  return (
    <fieldset className="filter-group">
      <legend className="field-label">{title}</legend>
      <div className="filter-options">
        {values.map((value) => (
          <button className={`filter-chip${selected.includes(value) ? ' is-active' : ''}`} key={value} type="button" aria-pressed={selected.includes(value)} onClick={() => onToggle(value)}>
            <span className="chip-check" aria-hidden="true">{selected.includes(value) ? '✓' : '+'}</span>{labelFor ? labelFor(value) : value}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default App;
