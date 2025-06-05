
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private timers = new Map<string, NodeJS.Timeout>();

  set(key: string, data: any, ttlSeconds: number = 3600): void {
    // Clear existing timer if it exists
    const existingTimer = this.timers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set the cache entry
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });

    // Set up automatic cleanup
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttlSeconds * 1000);

    this.timers.set(key, timer);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): boolean {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
    return this.cache.delete(key);
  }

  clear(): void {
    // Clear all timers
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.delete(key);
      return false;
    }

    return true;
  }

  size(): number {
    return this.cache.size;
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export a singleton instance
export const memoryCache = new MemoryCache();

// Helper function to create cache keys
export function createCacheKey(...parts: (string | number)[]): string {
  return parts.join(':');
}

// Decorator function for caching async functions
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  ttlSeconds: number = 3600
): T {
  return (async (...args: Parameters<T>) => {
    const cacheKey = keyGenerator(...args);
    
    // Try to get from cache first
    const cachedResult = memoryCache.get(cacheKey);
    if (cachedResult !== null) {
      return cachedResult;
    }

    // Execute function and cache result
    const result = await fn(...args);
    memoryCache.set(cacheKey, result, ttlSeconds);
    
    return result;
  }) as T;
}
