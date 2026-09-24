import type { Category, UserAgentPreset } from '../data/catalog';

export type CatalogFilters = {
  query: string;
  categories: Category[];
  families: string[];
  platforms: string[];
  deviceTypes: UserAgentPreset['deviceType'][];
  era: 'browsers' | 'older' | 'all';
};

export const emptyFilters = (): CatalogFilters => ({
  query: '',
  categories: [],
  families: [],
  platforms: [],
  deviceTypes: [],
  era: 'all',
});

export function filterPresets(records: UserAgentPreset[], filters: CatalogFilters): UserAgentPreset[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return records
    .filter((record) => {
      const searchable = [record.family, record.label, record.version, record.platform,
        record.platformVersion, record.category, record.deviceType, ...record.tags]
        .filter(Boolean).join(' ').toLocaleLowerCase();

      return (!query || searchable.includes(query))
        && (!filters.categories.length || filters.categories.includes(record.category))
        && (!filters.families.length || filters.families.includes(record.family))
        && (!filters.platforms.length || filters.platforms.includes(record.platform))
        && (!filters.deviceTypes.length || filters.deviceTypes.includes(record.deviceType))
        && (filters.era === 'all' || (filters.era === 'older') === ['legacy', 'embedded'].includes(record.category));
    })
    .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      || a.family.localeCompare(b.family)
      || a.label.localeCompare(b.label));
}

const categoryOrder: Category[] = ['desktop', 'mobile', 'legacy', 'embedded', 'bot'];

export function pickRandomPreset(
  records: UserAgentPreset[],
  currentId?: string,
  random: () => number = Math.random,
): UserAgentPreset | undefined {
  if (!records.length) return undefined;
  const candidates = records.length > 1 && currentId
    ? records.filter((record) => record.id !== currentId)
    : records;
  const index = Math.min(Math.floor(random() * candidates.length), candidates.length - 1);
  return candidates[index];
}
