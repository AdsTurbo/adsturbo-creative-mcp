export type Platform = 'tiktok' | 'reels' | 'shorts' | 'meta' | 'youtube';

export interface ProductInput {
  productName: string;
  audience: string;
  category?: string;
  platform?: Platform;
  durationSeconds?: number;
  benefits?: string[];
  painPoints?: string[];
  proofPoints?: string[];
  offer?: string;
  tone?: string;
}

export interface AdAngle {
  title: string;
  description: string;
}

export interface UgcScript {
  hook: string;
  problem: string;
  demo: string;
  proof: string;
  cta: string;
}

export interface StoryboardScene {
  start: number;
  end: number;
  visual: string;
  caption: string;
  voiceover: string;
  purpose: 'hook' | 'product' | 'demo' | 'proof' | 'cta';
}

export interface AdBrief {
  productName: string;
  audience: string;
  category: string;
  platform: Platform;
  durationSeconds: number;
  offer?: string;
  coreRead: string;
  angles: AdAngle[];
  scripts: UgcScript[];
  storyboard: StoryboardScene[];
  adsturboPrompt: string;
  complianceNotes: string[];
}

export interface ScriptReview {
  score: number;
  passed: string[];
  missing: string[];
  suggestions: string[];
  riskNotes: string[];
}
