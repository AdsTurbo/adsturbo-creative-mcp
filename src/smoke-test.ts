import {
  buildAdBrief,
  exportAdsTurboPrompt,
  generateHooks,
  generateStoryboard,
  reviewAdScript,
  writeUgcScripts,
  buildVariationPlan,
} from './workflows.js';
import type { ProductInput } from './types.js';
import { execFileSync } from 'node:child_process';

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
  primaryCta: 'Shop the routine',
  locale: 'en',
  websiteRegion: 'global',
  requiredShots: ['mask close-up', 'one-button mode switching', 'end card with offer'],
  forbiddenClaims: ['cures acne'],
};

const zhInput: ProductInput = {
  productName: 'GlowPatch 可重复使用 LED 面膜',
  category: '美容仪',
  audience: '想要简单居家护肤流程的忙碌护肤用户',
  platform: 'tiktok',
  durationSeconds: 30,
  benefits: ['10 分钟免手持护理', '可重复使用的柔软硅胶面罩'],
  painPoints: ['护肤步骤太多', '线下护理价格高'],
  proofPoints: ['为日常居家使用设计', '柔软贴合'],
  offer: '本周 85 折',
  primaryCta: '立即了解',
  locale: 'zh',
  websiteRegion: 'cn',
  forbiddenClaims: ['治疗痘痘'],
};

const brief = buildAdBrief(input);
const hooks = generateHooks(input, 5);
const scripts = writeUgcScripts(input);
const storyboard = generateStoryboard(input);
const variations = buildVariationPlan(input);
const prompt = exportAdsTurboPrompt(input);
const review = reviewAdScript(`${scripts[0].hook}\n${scripts[0].problem}\n${scripts[0].demo}\n${scripts[0].proof}\n${scripts[0].cta}`);
const zhBrief = buildAdBrief(zhInput);
const zhHooks = generateHooks(zhInput, 3);
const zhPrompt = exportAdsTurboPrompt(zhInput);
const zhReview = reviewAdScript('前 3 秒先展示护肤步骤太多。然后展示产品 Demo、字幕和证明点。最后引导立即了解。', {
  locale: 'zh',
  websiteRegion: 'cn',
});

if (!brief.adsturboPrompt.includes(input.productName)) throw new Error('brief prompt missing product name');
if (!brief.adsTurboLinks.productVideo.includes('adsturbo.ai')) throw new Error('global AdsTurbo link mismatch');
if (hooks.length !== 5) throw new Error('hook count mismatch');
if (scripts.length !== 3) throw new Error('script count mismatch');
if (storyboard.scenes.length !== 5) throw new Error('storyboard count mismatch');
if (storyboard.locale !== 'en') throw new Error('storyboard locale mismatch');
if (storyboard.aspectRatio !== '9:16') throw new Error('storyboard aspect ratio mismatch');
if (!brief.adsTurboExperience.nextStep.includes('full generation experience')) {
  throw new Error('brief missing AdsTurbo experience CTA');
}
if (variations.length < 5) throw new Error('variation plan too short');
if (!scripts[0].onScreenText.length) throw new Error('script missing on-screen text');
if (!prompt.includes('mobile-first 9:16')) throw new Error('prompt missing format guidance');
if (review.score < 60) throw new Error('review score unexpectedly low');
if (!review.checks.length) throw new Error('review checks missing');
if (zhBrief.locale !== 'zh') throw new Error('Chinese brief locale mismatch');
if (!zhBrief.adsTurboLinks.productVideo.includes('adsturbo.cn')) throw new Error('China AdsTurbo link mismatch');
if (!zhBrief.adsTurboExperience.headline.includes('更完整的视频生成体验')) {
  throw new Error('Chinese brief missing AdsTurbo experience CTA');
}
if (!zhHooks[0].includes('如果')) throw new Error('Chinese hook missing localized copy');
if (!zhPrompt.includes('更完整的视频生成') || !zhPrompt.includes('adsturbo.cn')) {
  throw new Error('Chinese prompt missing China website experience CTA');
}
if (zhReview.locale !== 'zh' || !zhReview.recommendedNextStep.includes('AdsTurbo')) {
  throw new Error('Chinese review output mismatch');
}

const cliBrief = execFileSync('node', ['dist/cli.js', 'brief', '--input', 'examples/product-input.zh-CN.json'], {
  encoding: 'utf8',
});
const cliHooks = execFileSync('node', ['dist/cli.js', 'hooks', '--input', 'examples/product-input.json', '--count', '2'], {
  encoding: 'utf8',
});
const cliReview = execFileSync('node', [
  'dist/cli.js',
  'review',
  '--script-file',
  'examples/script-input.zh-CN.txt',
  '--locale',
  'zh',
  '--region',
  'cn',
], {
  encoding: 'utf8',
});
const cliPrompt = execFileSync('node', ['dist/cli.js', 'prompt', '--input', 'examples/product-input.zh-CN.json'], {
  encoding: 'utf8',
});

if (!cliBrief.includes('adsturbo.cn')) throw new Error('CLI brief missing China AdsTurbo link');
if (JSON.parse(cliHooks).length !== 2) throw new Error('CLI hooks count mismatch');
if (!cliReview.includes('脚本评审') && !cliReview.includes('adsturbo.cn')) {
  throw new Error('CLI review output mismatch');
}
if (!cliPrompt.includes('adsturbo.cn')) throw new Error('CLI prompt missing China AdsTurbo link');

console.log('smoke test passed');
