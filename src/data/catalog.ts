export const catalogRevision = '2026.09';
export const catalogReviewed = '2026-09-24';

export type Category = 'desktop' | 'mobile' | 'legacy' | 'embedded' | 'bot';
export type DeviceType = 'desktop' | 'phone' | 'tablet' | 'appliance' | 'bot';

export type UserAgentPreset = {
  id: string;
  category: Category;
  family: string;
  label: string;
  version: string;
  platform: string;
  platformVersion?: string;
  deviceType: DeviceType;
  userAgent: string;
  source: string;
  lastReviewed: string;
  tags: string[];
};

// Representative fixtures, not claims about the latest releases or every real device.
export const presets: UserAgentPreset[] = [
  {
    id: 'chrome-win-10', category: 'desktop', family: 'Chrome', label: 'Chrome on Windows', version: '131', platform: 'Windows', platformVersion: '10 / 11', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    source: 'https://developer.chrome.com/blog/user-agent-reduction/', lastReviewed: catalogReviewed, tags: ['chromium', 'google', 'win64'],
  },
  {
    id: 'edge-win-10', category: 'desktop', family: 'Edge', label: 'Microsoft Edge on Windows', version: '131', platform: 'Windows', platformVersion: '10 / 11', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    source: 'https://learn.microsoft.com/microsoft-edge/web-platform/user-agent-guidance', lastReviewed: catalogReviewed, tags: ['chromium', 'microsoft', 'win64'],
  },
  {
    id: 'brave-win-10', category: 'desktop', family: 'Brave', label: 'Brave on Windows', version: '131-compatible', platform: 'Windows', platformVersion: '10 / 11', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent', lastReviewed: catalogReviewed, tags: ['chromium', 'privacy', 'chromium-compatible'],
  },
  {
    id: 'opera-win-10', category: 'desktop', family: 'Opera', label: 'Opera on Windows', version: '115', platform: 'Windows', platformVersion: '10 / 11', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 OPR/115.0.0.0',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent', lastReviewed: catalogReviewed, tags: ['chromium', 'opera'],
  },
  {
    id: 'firefox-win-10', category: 'desktop', family: 'Firefox', label: 'Firefox on Windows', version: '133', platform: 'Windows', platformVersion: '10 / 11', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent/Firefox', lastReviewed: catalogReviewed, tags: ['mozilla', 'gecko', 'win64'],
  },
  {
    id: 'chrome-mac', category: 'desktop', family: 'Chrome', label: 'Chrome on macOS', version: '131', platform: 'macOS', platformVersion: '10.15.7 (reduced)', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    source: 'https://developer.chrome.com/blog/user-agent-reduction/', lastReviewed: catalogReviewed, tags: ['chromium', 'apple'],
  },
  {
    id: 'edge-mac', category: 'desktop', family: 'Edge', label: 'Microsoft Edge on macOS', version: '131', platform: 'macOS', platformVersion: '10.15.7 (reduced)', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    source: 'https://learn.microsoft.com/microsoft-edge/web-platform/user-agent-guidance', lastReviewed: catalogReviewed, tags: ['chromium', 'microsoft', 'apple'],
  },
  {
    id: 'safari-mac', category: 'desktop', family: 'Safari', label: 'Safari on macOS', version: '18', platform: 'macOS', platformVersion: '14.6', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
    source: 'https://developer.apple.com/documentation/safari-release-notes', lastReviewed: catalogReviewed, tags: ['webkit', 'apple'],
  },
  {
    id: 'firefox-mac', category: 'desktop', family: 'Firefox', label: 'Firefox on macOS', version: '133', platform: 'macOS', platformVersion: '10.15', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent/Firefox', lastReviewed: catalogReviewed, tags: ['mozilla', 'gecko', 'apple'],
  },
  {
    id: 'chrome-linux', category: 'desktop', family: 'Chrome', label: 'Chrome on Linux', version: '131', platform: 'Linux', platformVersion: 'x86_64', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    source: 'https://developer.chrome.com/blog/user-agent-reduction/', lastReviewed: catalogReviewed, tags: ['chromium', 'gnu-linux'],
  },
  {
    id: 'firefox-linux', category: 'desktop', family: 'Firefox', label: 'Firefox on Linux', version: '133', platform: 'Linux', platformVersion: 'x86_64', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent/Firefox', lastReviewed: catalogReviewed, tags: ['mozilla', 'gecko', 'gnu-linux'],
  },
  {
    id: 'chrome-android', category: 'mobile', family: 'Chrome', label: 'Chrome on Android phone', version: '131', platform: 'Android', platformVersion: '10 (UA reduced)', deviceType: 'phone',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
    source: 'https://developer.chrome.com/blog/user-agent-reduction-android-model-and-version/', lastReviewed: catalogReviewed, tags: ['chromium', 'google', 'pixel-style'],
  },
  {
    id: 'chrome-android-tablet', category: 'mobile', family: 'Chrome', label: 'Chrome on Android tablet', version: '131', platform: 'Android', platformVersion: '10 (UA reduced)', deviceType: 'tablet',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    source: 'https://developer.chrome.com/blog/user-agent-reduction-android-model-and-version/', lastReviewed: catalogReviewed, tags: ['chromium', 'google', 'tablet'],
  },
  {
    id: 'samsung-internet', category: 'mobile', family: 'Samsung Internet', label: 'Samsung Internet on Android', version: '27', platform: 'Android', platformVersion: '10+', deviceType: 'phone',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/27.0 Chrome/130.0.0.0 Mobile Safari/537.36',
    source: 'https://developer.samsung.com/internet/user-agent-string-format.html', lastReviewed: catalogReviewed, tags: ['samsung', 'chromium', 'android'],
  },
  {
    id: 'safari-iphone', category: 'mobile', family: 'Safari', label: 'Safari on iPhone', version: '18', platform: 'iOS', platformVersion: '18.0', deviceType: 'phone',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    source: 'https://developer.apple.com/documentation/safari-release-notes', lastReviewed: catalogReviewed, tags: ['webkit', 'apple', 'iphone'],
  },
  {
    id: 'safari-ipad', category: 'mobile', family: 'Safari', label: 'Safari on iPad', version: '18', platform: 'iPadOS', platformVersion: '18.0', deviceType: 'tablet',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    source: 'https://developer.apple.com/documentation/safari-release-notes', lastReviewed: catalogReviewed, tags: ['webkit', 'apple', 'ipad'],
  },
  {
    id: 'firefox-android', category: 'mobile', family: 'Firefox', label: 'Firefox on Android', version: '133', platform: 'Android', platformVersion: '10+', deviceType: 'phone',
    userAgent: 'Mozilla/5.0 (Android 10; Mobile; rv:133.0) Gecko/133.0 Firefox/133.0',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent/Firefox', lastReviewed: catalogReviewed, tags: ['mozilla', 'gecko'],
  },
  {
    id: 'ie11-win', category: 'legacy', family: 'Internet Explorer', label: 'Internet Explorer 11 on Windows', version: '11', platform: 'Windows', platformVersion: '8.1', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
    source: 'https://learn.microsoft.com/troubleshoot/developer/webapps/iis/www-authentication-authorization/ie11-user-agent-string', lastReviewed: catalogReviewed, tags: ['microsoft', 'trident', 'retired'],
  },
  {
    id: 'edge-legacy-win', category: 'legacy', family: 'Edge Legacy', label: 'Microsoft Edge Legacy on Windows', version: '18', platform: 'Windows', platformVersion: '10', deviceType: 'desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 Edge/18.19041',
    source: 'https://learn.microsoft.com/microsoft-edge/web-platform/user-agent-guidance', lastReviewed: catalogReviewed, tags: ['microsoft', 'edgehtml', 'retired'],
  },
  {
    id: 'android-webview', category: 'embedded', family: 'Android WebView', label: 'Android WebView app', version: '131-compatible', platform: 'Android', platformVersion: '10 (UA reduced)', deviceType: 'phone',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.0.0 Mobile Safari/537.36',
    source: 'https://developer.chrome.com/docs/webview/user-agent/', lastReviewed: catalogReviewed, tags: ['webview', 'embedded', 'chromium'],
  },
  {
    id: 'kindle-silk', category: 'embedded', family: 'Silk', label: 'Amazon Silk on Fire tablet', version: '130', platform: 'Fire OS', platformVersion: '8', deviceType: 'tablet',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/130.5.2 like Chrome/130.0.0.0 Safari/537.36',
    source: 'https://developer.amazon.com/docs/silk/user-agent.html', lastReviewed: catalogReviewed, tags: ['amazon', 'kindle', 'tablet'],
  },
  {
    id: 'playstation-4', category: 'embedded', family: 'PlayStation Browser', label: 'PlayStation 4 browser', version: '5.0', platform: 'Orbis OS', deviceType: 'appliance',
    userAgent: 'Mozilla/5.0 (PlayStation 4 5.00) AppleWebKit/536.26 (KHTML, like Gecko)',
    source: 'https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent', lastReviewed: catalogReviewed, tags: ['console', 'sony', 'gaming', 'legacy-device'],
  },
  {
    id: 'googlebot', category: 'bot', family: 'Googlebot', label: 'Googlebot Smartphone', version: 'current', platform: 'Android', deviceType: 'bot',
    userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    source: 'https://developers.google.com/search/docs/crawling-indexing/googlebot', lastReviewed: catalogReviewed, tags: ['crawler', 'search', 'google'],
  },
  {
    id: 'bingbot', category: 'bot', family: 'Bingbot', label: 'Microsoft Bingbot', version: 'current', platform: 'Windows', deviceType: 'bot',
    userAgent: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    source: 'https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0', lastReviewed: catalogReviewed, tags: ['crawler', 'search', 'microsoft'],
  },
  {
    id: 'duckduckbot', category: 'bot', family: 'DuckDuckBot', label: 'DuckDuckGo crawler', version: 'current', platform: 'Unknown', deviceType: 'bot',
    userAgent: 'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)',
    source: 'https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot/', lastReviewed: catalogReviewed, tags: ['crawler', 'search'],
  },
  {
    id: 'curl', category: 'bot', family: 'curl', label: 'curl command-line client', version: '8.x example', platform: 'Cross-platform', deviceType: 'bot',
    userAgent: 'curl/8.7.1',
    source: 'https://curl.se/docs/manpage.html', lastReviewed: catalogReviewed, tags: ['http-client', 'cli', 'testing'],
  },
];

export const categoryLabels: Record<Category, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  legacy: 'Legacy',
  embedded: 'Embedded & devices',
  bot: 'Bots & clients',
};

export function validateCatalog(records: UserAgentPreset[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const record of records) {
    if (!record.id || seen.has(record.id)) errors.push(`Missing or duplicate id: ${record.id}`);
    seen.add(record.id);
    if (!Object.hasOwn(categoryLabels, record.category)) errors.push(`Invalid category: ${record.id}`);
    if (!record.userAgent.trim()) errors.push(`Empty user-agent: ${record.id}`);
    if (!record.source.startsWith('https://')) errors.push(`Invalid source: ${record.id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.lastReviewed)) errors.push(`Invalid review date: ${record.id}`);
  }

  return errors;
}
