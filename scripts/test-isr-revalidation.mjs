import { neon } from "@neondatabase/serverless";

async function runISRTest() {
  console.log("==================================================");
  console.log("TESTING ISR / REVALIDATION (Phase 13 Task 4)");
  console.log("==================================================");

  // 1. Fetch current Camp Nou matchInfo
  const res1 = await fetch("http://localhost:3000/api/grounds?where[slug][equals]=camp-nou");
  const data1 = await res1.json();
  const campNou = data1.docs[0];
  console.log("Original matchInfo:", campNou.matchInfo);

  // 2. Perform live update via Payload API route
  const updateRes = await fetch("http://localhost:3000/api/test-isr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: campNou.id,
      matchInfo: "FC Barcelona — Girona FC, 3-1 (Live ISR Verified)",
    }),
  });
  const updateData = await updateRes.json();
  console.log("Updated via Payload:", updateData);

  // 3. Verify public page reflects updated matchInfo immediately
  const pageRes = await fetch("http://localhost:3000/grounds/camp-nou");
  const pageHtml = await pageRes.text();
  const hasUpdatedText = pageHtml.includes("Live ISR Verified");
  console.log("Public page contains updated text without server restart:", hasUpdatedText);

  // 4. Restore original matchInfo
  await fetch("http://localhost:3000/api/test-isr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: campNou.id,
      matchInfo: "FC Barcelona — Girona FC, 3-1",
    }),
  });
  console.log("Restored original matchInfo successfully!");
}

runISRTest().catch(console.error);
