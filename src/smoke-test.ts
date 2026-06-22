import {
  buildAdBrief,
  exportAdsTurboPrompt,
  generateHooks,
  generateStoryboard,
  reviewAdScript,
  writeUgcScripts,
} from './workflows.js';
import type { ProductInput } from './types.js';

const input: ProductInput = {
  productName: 'GlowPatch Reusable LED Face Mask',
  category: 'beauty device',
  audience: 'busy skincare buyers who want a simple at-home routine',
  platform: 'tiktok',
  durationSeconds: 30,
  benefits: ['hands-free 10 minute sessions', 'reusable silicone mask', 'red and blue light modes'],
  painPoints: ['too many skincare steps', 'expensive appointments'],
  proofPoints: ['designed for daily at-home use', 'soft flexible fit'],
  offer: '15% off this week',
};

const brief = buildAdBrief(input);
const hooks = generateHooks(input, 5);
const scripts = writeUgcScripts(input);
const storyboard = generateStoryboard(input);
const prompt = exportAdsTurboPrompt(input);
const review = reviewAdScript(`${scripts[0].hook}\n${scripts[0].problem}\n${scripts[0].demo}\n${scripts[0].proof}\n${scripts[0].cta}`);

if (!brief.adsturboPrompt.includes(input.productName)) throw new Error('brief prompt missing product name');
if (hooks.length !== 5) throw new Error('hook count mismatch');
if (scripts.length !== 3) throw new Error('script count mismatch');
if (storyboard.length !== 5) throw new Error('storyboard count mismatch');
if (!prompt.includes('mobile-first 9:16')) throw new Error('prompt missing format guidance');
if (review.score < 60) throw new Error('review score unexpectedly low');

console.log('smoke test passed');
