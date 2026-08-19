import { v2 } from "@google-cloud/translate";

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY?.trim();

console.log("==================================================");
console.log("GOOGLE CLOUD TRANSLATION API — ISOLATED TEST (Phase 15)");
console.log("==================================================");

if (!apiKey) {
  console.log("\n[STATUS: PENDING CREDENTIALS]");
  console.log("GOOGLE_TRANSLATE_API_KEY is not configured in .env.local.");
  console.log("\nManual Next Steps for Rohit:");
  console.log("1. Go to Google Cloud Console (https://console.cloud.google.com/)");
  console.log("2. Select or create a project.");
  console.log("3. Enable the 'Cloud Translation API' in API & Services > Library.");
  console.log("4. Navigate to API & Services > Credentials.");
  console.log("5. Click 'Create Credentials' > 'API key'.");
  console.log("6. (Recommended) Restrict the API key to 'Cloud Translation API'.");
  console.log("7. Paste your API key into sazeje-football/.env.local:");
  console.log('   GOOGLE_TRANSLATE_API_KEY="AIzaSy..."');
  console.log("8. Run this test script: node --env-file=.env.local scripts/test-translation-api.mjs");
  console.log("==================================================\n");
  process.exit(0);
}

async function testTranslation() {
  try {
    const { Translate } = v2;
    const translate = new Translate({ key: apiKey });

    const sourceText = "Dit is een testzin.";
    const targetLanguage = "en";
    const sourceLanguage = "nl";

    console.log(`\nInput Dutch text: "${sourceText}"`);
    console.log(`Calling Google Cloud Translation API (NL -> EN)...`);

    const [translation] = await translate.translate(sourceText, {
      from: sourceLanguage,
      to: targetLanguage,
    });

    console.log(`\n[SUCCESS] Google Cloud Translation API returned:`);
    console.log(`English translation: "${translation}"`);
    console.log("==================================================\n");
  } catch (err) {
    console.error("\n[ERROR] Translation API call failed:", err);
    process.exit(1);
  }
}

testTranslation();
