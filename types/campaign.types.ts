export interface CampaignClick {
  id?: string;
  ip_address: string;
  user_agent: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  page_url: string;
  session_id: string;
  created_at?: string;
}

export interface CampaignSession {
  ip_address: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  session_id: string;
  first_click_at: Date;
  last_click_at: Date;
  click_count: number;
}

// Rate limiting configuration
export interface RateLimitConfig {
  sessionDurationMinutes: number; // How long a session lasts
  maxClicksPerSession: number; // Max clicks allowed per session
  cooldownMinutes: number; // Cooldown period after max clicks reached
}

// Default configuration - easily modifiable
export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  sessionDurationMinutes: 30, // 30 minutes session
  maxClicksPerSession: 3, // Only track first 3 clicks per session
  cooldownMinutes: 60, // 1 hour cooldown after reaching limit
};

export const UTM_RATE_LIMIT_CONFIG: RateLimitConfig = {
  sessionDurationMinutes: 60, // 1 hour session for UTM tracking
  maxClicksPerSession: 1, // Only track the first click per session
  cooldownMinutes: 120, // 2 hours cooldown
};
