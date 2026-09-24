import { describe, expect, it } from 'vitest';
import { presets, validateCatalog } from '../data/catalog';
import { emptyFilters, filterPresets, pickRandomPreset } from './catalog';

describe('catalog data', () => {
  it('contains unique, complete records', () => {
    expect(validateCatalog(presets)).toEqual([]);
  });
});

describe('filterPresets', () => {
  it('combines dimensions as intersections and values within dimensions as unions', () => {
    const results = filterPresets(presets, {
      ...emptyFilters(),
      categories: ['desktop', 'mobile'],
      families: ['Chrome', 'Firefox'],
      platforms: ['Windows'],
    });

    expect(results.map(({ id }) => id)).toEqual(['chrome-win-10', 'firefox-win-10']);
  });

  it('searches metadata and tags without case sensitivity', () => {
    expect(filterPresets(presets, { ...emptyFilters(), query: 'PIXEL-STYLE' })
      .map(({ id }) => id)).toEqual(['chrome-android']);
  });

  it('returns no records when filters do not match', () => {
    expect(filterPresets(presets, { ...emptyFilters(), platforms: ['Plan 9'] })).toEqual([]);
  });

  it('can narrow results to older browser and device fixtures', () => {
    const results = filterPresets(presets, { ...emptyFilters(), era: 'older' });
    expect(results.every(({ category }) => category === 'legacy' || category === 'embedded')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('orders records by catalog category instead of alphabetically', () => {
    const results = filterPresets(presets, emptyFilters());
    const firstByCategory = results.map(({ category }) => category).filter((category, index, list) => list.indexOf(category) === index);
    expect(firstByCategory).toEqual(['desktop', 'mobile', 'legacy', 'embedded', 'bot']);
  });
});

describe('pickRandomPreset', () => {
  it('returns undefined for an empty result set', () => {
    expect(pickRandomPreset([])).toBeUndefined();
  });

  it('returns the sole record for a one-result set', () => {
    expect(pickRandomPreset([presets[0]!], presets[0]!.id, () => 0.99)).toBe(presets[0]);
  });

  it('avoids the current result when alternatives exist', () => {
    const results = [presets[0]!, presets[1]!];
    expect(pickRandomPreset(results, presets[0]!.id, () => 0)).toBe(presets[1]);
  });

  it('selects across the candidate range', () => {
    expect(pickRandomPreset(presets.slice(0, 3), undefined, () => 0.99)).toBe(presets[2]);
  });
});
