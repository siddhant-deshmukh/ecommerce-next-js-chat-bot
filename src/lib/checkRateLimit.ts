import RateLimitLog from '@/models/RateLimitLog';

export async function checkRateLimit(ip: string, windowMs: number, maxRequests: number): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMs);

  const log = await RateLimitLog.findOne({ ip });

  if (!log) {
    await RateLimitLog.create({ ip, timestamps: [now] });
    return true;
  }

  const recentTimestamps = log.timestamps.filter((ts: Date) => ts > windowStart);

  if (recentTimestamps.length >= maxRequests) return false;

  // Add new timestamp and save
  recentTimestamps.push(now);
  log.timestamps = recentTimestamps;
  await log.save();

  return true;
}
