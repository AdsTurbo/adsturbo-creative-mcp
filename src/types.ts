export type Platform = 'tiktok' | 'reels' | 'shorts' | 'meta' | 'youtube';

export interface ProductInput {
  productName: string;
  audience: string;
  category?: string;
  brandName?: string;
  productUrl?: string;
  price?: string;
  platform?: Platform;
  durationSeconds?: number;
  benefits?: string[];
  painPoints?: string[];
  proofPoints?: string[];
  offer?: string;
  tone?: string;
  primaryCta?: string;
  requiredShots?: string[];
  forbiddenClaims?: string[];
}

export interface AdAngle {
  title: string;
  description: string;
  hook: string;
  visualOpening: string;
  cta: string;
  testHypothesis: string;
  riskNotes: string[];
}

export interface UgcScript {
  title: string;
  hook: string;
  problem: string;
  demo: string;
  proof: string;
  cta: string;
  onScreenText: string[];
  shotNotes: string[];
}

export interface StoryboardScene {
  start: number;
  end: number;
  visual: string;
  caption: string;
  voiceover: string;
  purpose: 'hook' | 'product' | 'demo' | 'proof' | 'cta';
  shotType: 'close-up' | 'talking-head' | 'product-demo' | 'lifestyle' | 'hero-shot';
  productionNotes: string[];
}

export interface Storyboard {
  platform: Platform;
  durationSeconds: number;
  aspectRatio: '9:16' | '1:1' | '16:9';
  scenes: StoryboardScene[];
  cta: string;
  notes: string[];
}

export interface AdBrief {
  productName: string;
  brandName?: string;
  audience: string;
  category: string;
  platform: Platform;
  durationSeconds: number;
  productUrl?: string;
  price?: string;
  offer?: string;
  coreRead: string;
  audienceInsight: string;
  mustShowShots: string[];
  angles: AdAngle[];
  scripts: UgcScript[];
  storyboard: Storyboard;
  adsturboPrompt: string;
  complianceNotes: string[];
}

export interface ScriptReviewCheck {
  key: string;
  label: string;
  ok: boolean;
}

export interface ScriptReview {
  score: number;
  readiness: 'needs work' | 'usable with edits' | 'ready for creative review';
  checks: ScriptReviewCheck[];
  passed: string[];
  missing: string[];
  suggestions: string[];
  riskNotes: string[];
  recommendedNextStep: string;
}
