import { translateText } from "./translate";

interface FieldMapping {
  source: string;
  target: string;
  statusField?: string;
}

/**
 * Automatically translates Dutch fields to English fields in Payload CMS documents.
 * 
 * Rules:
 * 1. If English field is empty/falsy, and Dutch source has text, translate it!
 * 2. If statusField exists:
 *    - If status is 'auto', and source has changed, auto-update the English translation.
 *    - If status is 'edited', NEVER overwrite manual human edits!
 * 3. Sets statusField to 'auto' when auto-translation occurs.
 */
export async function autoTranslateFields(
  data: Record<string, unknown>,
  originalDoc: Record<string, unknown> | undefined,
  mappings: FieldMapping[]
): Promise<Record<string, unknown>> {
  if (!data) return data;

  await Promise.all(
    mappings.map(async ({ source, target, statusField }) => {
      const sourceValue = data[source];
      const currentTargetValue = data[target];
      const currentStatus = statusField ? data[statusField] : undefined;

      // Only process string fields
      if (typeof sourceValue !== "string" || !sourceValue.trim()) {
        return;
      }

      const originalSource = originalDoc ? originalDoc[source] : undefined;
      const isTargetEmpty =
        typeof currentTargetValue !== "string" || !currentTargetValue.trim();
      const isStatusAuto = currentStatus === "auto" || !currentStatus;
      const sourceChanged = originalSource !== undefined && originalSource !== sourceValue;

      // Auto-translate if English field is empty, or if marked as auto and Dutch source changed
      if (isTargetEmpty || (isStatusAuto && sourceChanged)) {
        try {
          const translated = await translateText(sourceValue, "nl", "en");
          if (translated && translated !== sourceValue) {
            data[target] = translated;
            if (statusField) {
              data[statusField] = "auto";
            }
          }
        } catch (err) {
          console.error(`[AutoTranslate] Failed to translate ${source} -> ${target}:`, err);
        }
      }
    })
  );

  return data;
}

/**
 * Auto-translation hooks for Grounds collection
 */
export async function autoTranslateGroundHook({
  data,
  originalDoc,
}: {
  data: Record<string, unknown>;
  originalDoc?: Record<string, unknown>;
}) {
  return autoTranslateFields(data, originalDoc, [
    { source: "description", target: "descriptionEn", statusField: "descriptionEnStatus" },
    { source: "story", target: "storyEn", statusField: "storyEnStatus" },
    { source: "matchInfo", target: "matchInfoEn", statusField: "matchInfoEnStatus" },
    { source: "extra", target: "extraEn", statusField: "extraEnStatus" },
  ]);
}

/**
 * Auto-translation hooks for Scarves collection
 */
export async function autoTranslateScarfHook({
  data,
  originalDoc,
}: {
  data: Record<string, unknown>;
  originalDoc?: Record<string, unknown>;
}) {
  return autoTranslateFields(data, originalDoc, [
    { source: "type", target: "typeEn", statusField: "typeEnStatus" },
    { source: "description", target: "descriptionEn", statusField: "descriptionEnStatus" },
    { source: "trophies", target: "trophiesEn", statusField: "trophiesEnStatus" },
    { source: "funFact", target: "funFactEn", statusField: "funFactEnStatus" },
  ]);
}

/**
 * Auto-translation hooks for Goals collection
 */
export async function autoTranslateGoalHook({
  data,
  originalDoc,
}: {
  data: Record<string, unknown>;
  originalDoc?: Record<string, unknown>;
}) {
  return autoTranslateFields(data, originalDoc, [
    { source: "title", target: "titleEn", statusField: "titleEnStatus" },
    { source: "description", target: "descriptionEn", statusField: "descriptionEnStatus" },
    { source: "details", target: "detailsEn", statusField: "detailsEnStatus" },
  ]);
}

/**
 * Auto-translation hooks for About Global
 */
export async function autoTranslateAboutHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;

  // Hero section
  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero) {
    await autoTranslateFields(hero, undefined, [
      { source: "eyebrow", target: "eyebrowEn" },
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  // Story section
  const story = data.story as Record<string, unknown> | undefined;
  if (story) {
    await autoTranslateFields(story, undefined, [
      { source: "badge", target: "badgeEn" },
      { source: "title", target: "titleEn" },
      { source: "lead", target: "leadEn" },
      { source: "quote", target: "quoteEn" },
    ]);

    // Paragraphs array
    if (Array.isArray(story.paragraphs)) {
      await Promise.all(
        story.paragraphs.map(async (p: Record<string, unknown>) => {
          if (p && typeof p.paragraph === "string" && (!p.paragraphEn || !(p.paragraphEn as string).trim())) {
            p.paragraphEn = await translateText(p.paragraph, "nl", "en");
          }
        })
      );
    }
  }

  // Media gallery captions
  const media = data.media as Record<string, unknown> | undefined;
  if (media && Array.isArray(media.gallery)) {
    await Promise.all(
      media.gallery.map(async (g: Record<string, unknown>) => {
        if (g && typeof g.caption === "string" && (!g.captionEn || !(g.captionEn as string).trim())) {
          g.captionEn = await translateText(g.caption, "nl", "en");
        }
      })
    );
  }

  return data;
}

/**
 * Auto-translation hooks for GroundsPage Global
 */
export async function autoTranslateGroundsPageHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;

  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero) {
    await autoTranslateFields(hero, undefined, [
      { source: "eyebrow", target: "eyebrowEn" },
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  const intro = data.intro as Record<string, unknown> | undefined;
  if (intro) {
    await autoTranslateFields(intro, undefined, [
      { source: "badge", target: "badgeEn" },
      { source: "heading", target: "headingEn" },
      { source: "text", target: "textEn" },
    ]);
  }

  const seo = data.seo as Record<string, unknown> | undefined;
  if (seo) {
    await autoTranslateFields(seo, undefined, [
      { source: "metaTitle", target: "metaTitleEn" },
      { source: "metaDescription", target: "metaDescriptionEn" },
    ]);
  }

  return data;
}

/**
 * Auto-translation hooks for MapPage Global
 */
export async function autoTranslateMapPageHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;

  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero) {
    await autoTranslateFields(hero, undefined, [
      { source: "eyebrow", target: "eyebrowEn" },
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  const intro = data.intro as Record<string, unknown> | undefined;
  if (intro) {
    await autoTranslateFields(intro, undefined, [
      { source: "badge", target: "badgeEn" },
      { source: "heading", target: "headingEn" },
      { source: "text", target: "textEn" },
    ]);
  }

  const seo = data.seo as Record<string, unknown> | undefined;
  if (seo) {
    await autoTranslateFields(seo, undefined, [
      { source: "metaTitle", target: "metaTitleEn" },
      { source: "metaDescription", target: "metaDescriptionEn" },
    ]);
  }

  return data;
}

/**
 * Auto-translation hooks for ScarvesPage Global
 */
export async function autoTranslateScarvesPageHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;

  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero) {
    await autoTranslateFields(hero, undefined, [
      { source: "eyebrow", target: "eyebrowEn" },
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  const intro = data.intro as Record<string, unknown> | undefined;
  if (intro) {
    await autoTranslateFields(intro, undefined, [
      { source: "badge", target: "badgeEn" },
      { source: "heading", target: "headingEn" },
      { source: "text", target: "textEn" },
    ]);
  }

  const categories = data.categories as Record<string, unknown> | undefined;
  if (categories) {
    await autoTranslateFields(categories, undefined, [
      { source: "newTitle", target: "newTitleEn" },
      { source: "newDesc", target: "newDescEn" },
      { source: "secondhandTitle", target: "secondhandTitleEn" },
      { source: "secondhandDesc", target: "secondhandDescEn" },
    ]);
  }

  const seo = data.seo as Record<string, unknown> | undefined;
  if (seo) {
    await autoTranslateFields(seo, undefined, [
      { source: "metaTitle", target: "metaTitleEn" },
      { source: "metaDescription", target: "metaDescriptionEn" },
    ]);
  }

  return data;
}

/**
 * Auto-translation hooks for ContactPage Global
 */
export async function autoTranslateContactPageHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;

  const hero = data.hero as Record<string, unknown> | undefined;
  if (hero) {
    await autoTranslateFields(hero, undefined, [
      { source: "eyebrow", target: "eyebrowEn" },
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  const directInfo = data.directInfo as Record<string, unknown> | undefined;
  if (directInfo) {
    await autoTranslateFields(directInfo, undefined, [
      { source: "badge", target: "badgeEn" },
      { source: "title", target: "titleEn" },
      { source: "description", target: "descriptionEn" },
      { source: "responseTime", target: "responseTimeEn" },
      { source: "location", target: "locationEn" },
    ]);
  }

  const socials = data.socials as Record<string, unknown> | undefined;
  if (socials) {
    await autoTranslateFields(socials, undefined, [
      { source: "title", target: "titleEn" },
      { source: "subtitle", target: "subtitleEn" },
    ]);
  }

  const reasons = data.reasons as Record<string, unknown> | undefined;
  if (reasons) {
    await autoTranslateFields(reasons, undefined, [
      { source: "sectionTitle", target: "sectionTitleEn" },
      { source: "sectionSubtitle", target: "sectionSubtitleEn" },
    ]);

    if (Array.isArray(reasons.items)) {
      await Promise.all(
        reasons.items.map(async (item: Record<string, unknown>) => {
          if (item) {
            await autoTranslateFields(item, undefined, [
              { source: "tag", target: "tagEn" },
              { source: "title", target: "titleEn" },
              { source: "description", target: "descriptionEn" },
            ]);
          }
        })
      );
    }
  }

  const faq = data.faq as Record<string, unknown> | undefined;
  if (faq) {
    await autoTranslateFields(faq, undefined, [
      { source: "sectionTitle", target: "sectionTitleEn" },
      { source: "sectionSubtitle", target: "sectionSubtitleEn" },
    ]);

    if (Array.isArray(faq.items)) {
      await Promise.all(
        faq.items.map(async (item: Record<string, unknown>) => {
          if (item) {
            await autoTranslateFields(item, undefined, [
              { source: "question", target: "questionEn" },
              { source: "answer", target: "answerEn" },
            ]);
          }
        })
      );
    }
  }

  const seo = data.seo as Record<string, unknown> | undefined;
  if (seo) {
    await autoTranslateFields(seo, undefined, [
      { source: "metaTitle", target: "metaTitleEn" },
      { source: "metaDescription", target: "metaDescriptionEn" },
    ]);
  }

  return data;
}

/**
 * Auto-translation hooks for Settings Global
 */
export async function autoTranslateSettingsHook({
  data,
}: {
  data: Record<string, unknown>;
}) {
  if (!data) return data;
  return autoTranslateFields(data, undefined, [
    { source: "siteTagline", target: "siteTaglineEn" },
  ]);
}
