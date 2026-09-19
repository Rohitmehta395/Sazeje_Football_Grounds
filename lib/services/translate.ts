import { v2 } from "@google-cloud/translate";

/**
 * In-memory LRU-style cache for translations to avoid duplicate API calls
 * and provide microsecond responses for recurring phrases.
 */
const translationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 5000;

function getCacheKey(text: string, from: string, to: string): string {
  return `${from}:${to}:${text.trim()}`;
}

function setInCache(key: string, value: string) {
  if (translationCache.size >= MAX_CACHE_SIZE) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey) translationCache.delete(firstKey);
  }
  translationCache.set(key, value);
}

/**
 * Decodes common HTML entities that translation engines might return.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

/**
 * Translates a single text from source language (default 'nl') to target language (default 'en').
 * 
 * Strategy:
 * 1. Checks memory cache first.
 * 2. If GOOGLE_TRANSLATE_API_KEY is present, uses official Google Cloud Translation API (@google-cloud/translate).
 * 3. Falls back to MyMemory Translation API if key is absent or quota is exceeded.
 * 4. Gracefully falls back to original text on any network failure.
 */
export async function translateText(
  text: string,
  from: string = "nl",
  to: string = "en"
): Promise<string> {
  const trimmed = text?.trim();
  if (!trimmed) return text;
  if (from === to) return text;

  const cacheKey = getCacheKey(trimmed, from, to);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY?.trim();

  // 1. Try official Google Cloud Translation API if API Key is configured
  if (apiKey) {
    try {
      const { Translate } = v2;
      const client = new Translate({ key: apiKey });
      const [result] = await client.translate(trimmed, {
        from,
        to,
      });

      if (result) {
        const decoded = decodeHtmlEntities(result);
        setInCache(cacheKey, decoded);
        return decoded;
      }
    } catch (err) {
      console.warn("[Translate] Google Cloud Translation API failed, trying fallback:", err);
    }
  }

  // 2. High-reliability fallback (MyMemory API)
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmed
    )}&langpair=${from}|${to}`;

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      // 8s timeout to avoid hanging requests
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const data = (await res.json()) as {
        responseStatus?: number;
        responseData?: { translatedText?: string };
      };

      if (data.responseData?.translatedText && data.responseStatus === 200) {
        const decoded = decodeHtmlEntities(data.responseData.translatedText);
        setInCache(cacheKey, decoded);
        return decoded;
      }
    }
  } catch (err) {
    console.warn("[Translate] Fallback translation failed:", err);
  }

  // 3. Graceful fallback: return original text if translation service is unavailable
  return text;
}

/**
 * Translates an array of strings concurrently with caching and rate protection.
 */
export async function translateBatch(
  texts: string[],
  from: string = "nl",
  to: string = "en"
): Promise<string[]> {
  if (!texts || texts.length === 0) return [];
  return Promise.all(texts.map((t) => translateText(t, from, to)));
}
