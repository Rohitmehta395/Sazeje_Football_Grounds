import { neon } from "@neondatabase/serverless";

async function runRegression() {
  console.log("==================================================");
  console.log("RUNNING CRUD REGRESSION TESTS (Phase 13 Task 1)");
  console.log("==================================================");

  // We invoke the API route on Next.js dev server to execute Payload CRUD operations
  const response = await fetch("http://localhost:3000/api/regression-crud", {
    method: "POST",
  });

  const data = await response.json();
  console.log("Regression Results:", JSON.stringify(data, null, 2));

  // Verify DB counts in Neon PostgreSQL
  const sql = neon(process.env.DATABASE_URL);
  const grounds = await sql`SELECT count(*) FROM grounds`;
  const scarves = await sql`SELECT count(*) FROM scarves`;
  const goals = await sql`SELECT count(*) FROM goals`;
  const clubs = await sql`SELECT count(*) FROM clubs`;
  const media = await sql`SELECT count(*) FROM media`;

  console.log("\n--- Database State After Cleanup ---");
  console.log("Grounds count:", grounds[0].count, "(Expected: 10)");
  console.log("Scarves count:", scarves[0].count, "(Expected: 6)");
  console.log("Goals count:", goals[0].count, "(Expected: 8)");
  console.log("Clubs count:", clubs[0].count, "(Expected: 10)");
  console.log("Media count:", media[0].count, "(Expected: 38)");

  if (
    grounds[0].count == 10 &&
    scarves[0].count == 6 &&
    goals[0].count == 8 &&
    clubs[0].count == 10 &&
    media[0].count == 38
  ) {
    console.log("\n✅ ALL CRUD REGRESSION TESTS PASSED CLEANLY!");
  } else {
    console.error("\n❌ DATABASE COUNT MISMATCH!");
  }
}

runRegression().catch(console.error);
