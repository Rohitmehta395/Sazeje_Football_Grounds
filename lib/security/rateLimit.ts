/**
 * In-memory sliding-window IP rate limiter.
 * Protects form endpoints and Server Actions against flood and brute-force abuse.
 * Includes upper capacity bounding to prevent memory exhaustion / DoS attacks.
 */

interface RateLimitRecord {
  timestamps: number[];
}

// Upper capacity limit on stored IPs to prevent memory exhaustion attacks
const MAX_STORE_CAPACITY = 5000;
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup old records periodically every 15 minutes
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Ensures the in-memory map does not exceed maximum capacity.
 * Evicts oldest entries if limit is exceeded.
 */
function evictIfOverCapacity() {
  if (rateLimitStore.size <= MAX_STORE_CAPACITY) return;

  // Evict the oldest 10% of entries to keep memory bounded
  const toDelete = Math.ceil(MAX_STORE_CAPACITY * 0.1);
  let count = 0;
  for (const key of rateLimitStore.keys()) {
    rateLimitStore.delete(key);
    count++;
    if (count >= toDelete) break;
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp in ms when the window resets
  retryAfterSeconds: number;
}

/**
 * Checks if a given identifier (e.g. client IP) has exceeded the rate limit.
 *
 * @param identifier Unique identifier (e.g. IP address)
 * @param limit Maximum allowed requests within the window (default: 5)
 * @param windowMs Time window in milliseconds (default: 10 minutes = 600,000ms)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredRecords(windowMs);

  let record = rateLimitStore.get(identifier);
  if (!record) {
    evictIfOverCapacity();
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

    return {
      success: false,
      limit,
      remaining: 0,
      resetTime,
      retryAfterSeconds,
    };
  }

  // Record this attempt
  record.timestamps.push(now);

  const remaining = limit - record.timestamps.length;
  const oldestTimestamp = record.timestamps[0];
  const resetTime = oldestTimestamp + windowMs;

  return {
    success: true,
    limit,
    remaining,
    resetTime,
    retryAfterSeconds: 0,
  };
}
