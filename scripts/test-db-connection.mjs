/**
 * ══════════════════════════════════════════════════════════════════════════════
 * TEMPORARY DIAGNOSTIC SCRIPT: Neon Database Connection Test (Phase 2 Scaffolding)
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * Purpose:
 *   Validates that the Neon PostgreSQL connection string in .env.local
 *   is reachable and functional before proceeding to Phase 3 (Payload CMS).
 * 
 * Usage:
 *   pnpm test:db
 *   OR
 *   node scripts/test-db-connection.mjs
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Helper to extract DATABASE_URL from .env.local or .env if not in process.env
 */
function getDatabaseUrl() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '') {
    return process.env.DATABASE_URL.trim();
  }

  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const envPath = path.join(projectRoot, envFile);
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const match = trimmed.match(/^DATABASE_URL\s*=\s*(["']?)(.*?)\1$/);
          if (match && match[2] && match[2].trim() !== '') {
            return match[2].trim();
          }
        }
      } catch (err) {
        // Fall through
      }
    }
  }

  return null;
}

/**
 * Mask sensitive parts of the connection string for safe logging
 */
function maskConnectionString(connStr) {
  try {
    const url = new URL(connStr);
    if (url.password) {
      url.password = '********';
    }
    return url.toString();
  } catch {
    return '[Invalid Connection URL format]';
  }
}

async function testConnection() {
  console.log('\n[DB TEST] ═══════════════════════════════════════════════════════════');
  console.log('[DB TEST]  SaZeJe Football — Neon PostgreSQL Connectivity Test');
  console.log('[DB TEST] ═══════════════════════════════════════════════════════════\n');

  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    console.error('[DB TEST] ❌ ERROR: DATABASE_URL is not set.');
    console.error('[DB TEST]');
    console.error('[DB TEST] Please add your Neon connection string to .env.local:');
    console.error('[DB TEST]   DATABASE_URL="postgresql://user:password@ep-xyz.region.aws.neon.tech/neondb?sslmode=require"');
    console.error('[DB TEST]\n');
    process.exit(1);
  }

  if (databaseUrl.includes('user:password@host/dbname')) {
    console.error('[DB TEST] ❌ ERROR: DATABASE_URL contains placeholder credentials.');
    console.error('[DB TEST]');
    console.error('[DB TEST] Please replace the placeholder in .env.local with your real Neon');
    console.error('[DB TEST] connection string from https://console.neon.tech');
    console.error('[DB TEST]\n');
    process.exit(1);
  }

  console.log(`[DB TEST] Target: ${maskConnectionString(databaseUrl)}`);
  console.log('[DB TEST] Attempting connection via @neondatabase/serverless driver...');

  try {
    const sql = neon(databaseUrl);
    const result = await sql`
      SELECT 
        NOW() as server_time, 
        current_database() as db_name, 
        version() as pg_version;
    `;

    const row = result[0];

    console.log('\n[DB TEST] ═══════════════════════════════════════════════════════════');
    console.log('[DB TEST] ✅ SUCCESS: Connected to Neon PostgreSQL successfully!');
    console.log('[DB TEST] ═══════════════════════════════════════════════════════════');
    console.log(`[DB TEST] Database Name : ${row.db_name}`);
    console.log(`[DB TEST] Server Time   : ${row.server_time}`);
    console.log(`[DB TEST] Version       : ${row.pg_version}`);
    console.log('[DB TEST] ═══════════════════════════════════════════════════════════');
    console.log('[DB TEST] Database is healthy and ready for Phase 3 (Payload CMS).\n');
    process.exit(0);
  } catch (error) {
    console.error('\n[DB TEST] ═══════════════════════════════════════════════════════════');
    console.error('[DB TEST] ❌ CONNECTION FAILED: Unable to query database.');
    console.error('[DB TEST] ═══════════════════════════════════════════════════════════');
    console.error(`[DB TEST] Error: ${error instanceof Error ? error.message : String(error)}`);
    console.error('[DB TEST]');
    console.error('[DB TEST] Checklist:');
    console.error('[DB TEST]  1. Is the Neon project active in your dashboard?');
    console.error('[DB TEST]  2. Does the connection string include ?sslmode=require?');
    console.error('[DB TEST]  3. Are the username and password correct?');
    console.error('[DB TEST] ═══════════════════════════════════════════════════════════\n');
    process.exit(1);
  }
}

testConnection();
