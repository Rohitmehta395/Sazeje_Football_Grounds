async function crawl() {
  console.log("==================================================");
  console.log("STARTING PUBLIC SITE CRAWL (Phase 13 Task 2)");
  console.log("==================================================");

  const baseUrl = "http://localhost:3000";

  const routes = [
    // Static Routes
    "/",
    "/grounds",
    "/map",
    "/scarves",
    "/scarves/new",
    "/scarves/secondhand",
    "/about",
    "/contact",

    // Scarf Country Routes
    "/scarves/new/Spanje",
    "/scarves/new/Engeland",
    "/scarves/secondhand/Duitsland",
    "/scarves/secondhand/Nederland",
    "/scarves/new/Itali%C3%AB",
    "/scarves/secondhand/Belgi%C3%AB",

    // 10 Ground Detail Pages
    "/grounds/camp-nou",
    "/grounds/anfield",
    "/grounds/signal-iduna-park",
    "/grounds/johan-cruijff-arena",
    "/grounds/san-siro",
    "/grounds/jan-breydelstadion",
    "/grounds/allianz-arena",
    "/grounds/estadio-da-luz",
    "/grounds/de-kuip",
    "/grounds/stade-velodrome",

    // 8 Goal Detail Pages
    "/about/goals/1",
    "/about/goals/2",
    "/about/goals/3",
    "/about/goals/4",
    "/about/goals/5",
    "/about/goals/6",
    "/about/goals/7",
    "/about/goals/8",
  ];

  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const path of routes) {
    const url = `${baseUrl}${path}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        // Check for common error indicators
        if (text.includes("Application error") || text.includes("Internal Server Error")) {
          console.error(`❌ FAILED: ${path} (500 Error in HTML)`);
          failed++;
          errors.push({ path, error: "Application error in HTML" });
        } else {
          console.log(`✅ OK (${res.status}): ${path} (${text.length} bytes)`);
          passed++;
        }
      } else {
        console.error(`❌ FAILED (${res.status}): ${path}`);
        failed++;
        errors.push({ path, status: res.status });
      }
    } catch (err) {
      console.error(`❌ NETWORK ERROR: ${path}:`, err.message);
      failed++;
      errors.push({ path, error: err.message });
    }
  }

  console.log("\n==================================================");
  console.log(`CRAWL SUMMARY: Total: ${routes.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

crawl().catch(console.error);
