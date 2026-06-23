import type {
  AdAngle,
  AdBrief,
  Platform,
  ProductInput,
  ScriptReview,
  Storyboard,
  StoryboardScene,
  UgcScript,
} from './types.js';

const DEFAULT_PLATFORM: Platform = 'tiktok';
const DEFAULT_DURATION = 30;

interface NormalizedProduct {
  productName: string;
  audience: string;
  category: string;
  brandName?: string;
  productUrl?: string;
  price?: string;
  platform: Platform;
  durationSeconds: number;
  benefits: string[];
  painPoints: string[];
  proofPoints: string[];
  offer?: string;
  tone: string;
  primaryCta: string;
  requiredShots: string[];
  forbiddenClaims: string[];
}

const normalizeList = (items: string[] | undefined, fallback: string[]) =>
  (items && items.length > 0 ? items : fallback)
    .map((item) => item.trim())
    .filter(Boolean);

const first = (items: string[], fallback: string) => items.find(Boolean) || fallback;

const titleCase = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

const platformAspectRatio = (platform: Platform): Storyboard['aspectRatio'] =>
  platform === 'youtube' ? '16:9' : platform === 'meta' ? '1:1' : '9:16';

const defaultRequiredShots = (productName: string) => [
  `clear close-up of ${productName}`,
  'real-use product demo',
  'caption-friendly proof cue',
  'clean end card with offer or CTA',
];

const complianceNotes = (product: NormalizedProduct) => [
  'Keep claims specific to product information you can substantiate.',
  'Use references for structure, pacing, and inspiration, not for copying protected creative assets.',
  'Confirm ad platform policy, rights clearance, and regulated-category requirements before launch.',
  'This MCP server is local-only and does not call AdsTurbo generation APIs.',
  ...product.forbiddenClaims.map((claim) => `Avoid unsupported or forbidden claim: ${claim}.`),
];

export function normalizeProductInput(input: ProductInput): NormalizedProduct {
  const productName = input.productName.trim();
  return {
    productName,
    audience: input.audience.trim(),
    category: input.category?.trim() || 'product',
    brandName: input.brandName?.trim() || undefined,
    productUrl: input.productUrl?.trim() || undefined,
    price: input.price?.trim() || undefined,
    platform: input.platform || DEFAULT_PLATFORM,
    durationSeconds: input.durationSeconds || DEFAULT_DURATION,
    benefits: normalizeList(input.benefits, [
      'clear product benefit',
      'simple setup',
      'easy everyday use',
    ]),
    painPoints: normalizeList(input.painPoints, [
      'the current routine feels slow',
      'buyers need a clearer reason to act',
    ]),
    proofPoints: normalizeList(input.proofPoints, [
      'easy to understand in a short demo',
      'built for repeat use',
    ]),
    offer: input.offer?.trim() || undefined,
    tone: input.tone?.trim() || 'friendly UGC demo',
    primaryCta: input.primaryCta?.trim() || 'Try it today',
    requiredShots: normalizeList(input.requiredShots, defaultRequiredShots(productName)),
    forbiddenClaims: normalizeList(input.forbiddenClaims, []),
  };
}

export function buildVariationPlan(input: ProductInput): AdAngle[] {
  const product = normalizeProductInput(input);
  const benefit = first(product.benefits, 'clear product benefit');
  const pain = first(product.painPoints, 'the old way feels slow');
  const proof = first(product.proofPoints, 'simple proof');
  const cta = product.offer || product.primaryCta;

  return [
    {
      title: 'Problem first, product second',
      description: `Open with ${pain}, then introduce ${product.productName} as the practical fix.`,
      hook: `If ${product.audience} are still dealing with ${pain}, start here.`,
      visualOpening: `Tight shot of the buyer dealing with ${pain}, before the product is shown.`,
      cta: `Show ${product.productName} and end with ${cta}.`,
      testHypothesis: 'A problem-led opening will earn attention before viewers know the product.',
      riskNotes: ['Do not exaggerate the problem or imply guaranteed results.'],
    },
    {
      title: 'Show the product doing the work',
      description: `Make ${benefit} visible in the first five seconds with close, mobile-first product shots.`,
      hook: `Here is what ${benefit} looks like in a real product demo.`,
      visualOpening: `Product close-up showing ${benefit} with a caption that can be understood without sound.`,
      cta: `Invite viewers to ${product.primaryCta.toLowerCase()}.`,
      testHypothesis: 'A demo-led opening will convert viewers who already understand the category.',
      riskNotes: ['Keep the demo grounded in what the product actually does.'],
    },
    {
      title: 'Small habit, repeatable payoff',
      description: `Frame ${product.productName} as a routine the audience can actually keep using, backed by ${proof}.`,
      hook: `The easiest routine upgrade for ${product.audience} starts with this.`,
      visualOpening: `Lifestyle shot of ${product.productName} fitting into a normal day.`,
      cta: `Pair the routine with ${cta}.`,
      testHypothesis: 'Routine framing will make the product feel easier to adopt and repeat.',
      riskNotes: ['Avoid implying medical, financial, or guaranteed transformation claims.'],
    },
    {
      title: 'Proof cue before feature list',
      description: `Lead with ${proof}, then connect that proof to ${benefit}.`,
      hook: `The proof point I would put before the feature list: ${proof}.`,
      visualOpening: 'On-screen proof cue, review snippet, use-case evidence, or product detail macro.',
      cta: `End with ${product.primaryCta}.`,
      testHypothesis: 'Proof before features can reduce skepticism before asking for action.',
      riskNotes: ['Only use proof points that are accurate and rights-cleared.'],
    },
    {
      title: 'Offer with context',
      description: `Use ${product.offer || 'the CTA'} after viewers understand the problem and product fit.`,
      hook: `Before you use the offer, make the product value obvious.`,
      visualOpening: `Problem shot, then ${product.productName} in use, then offer card.`,
      cta,
      testHypothesis: 'Offer urgency works better after product value is demonstrated.',
      riskNotes: ['Do not create false scarcity or misleading discount claims.'],
    },
  ];
}

export const buildAngles = buildVariationPlan;

export function generateHooks(input: ProductInput, count = 12): string[] {
  const product = normalizeProductInput(input);
  const benefit = first(product.benefits, 'the main benefit');
  const pain = first(product.painPoints, 'the annoying part of the current routine');
  const audience = product.audience;
  const baseHooks = [
    `If ${audience} keep dealing with ${pain}, watch this.`,
    `I did not expect ${product.productName} to make this part easier.`,
    `Here is the product detail I would show first in an ad.`,
    `This is for anyone who wants ${benefit} without adding another complicated step.`,
    `The first three seconds of this ad should show ${pain}.`,
    `Most ${product.category} ads miss this one thing: ${benefit}.`,
    `Before you scroll, look at how ${product.productName} solves ${pain}.`,
    `This is the simplest way to explain ${product.productName} in a short video.`,
    `If I had to sell ${product.productName} in 30 seconds, I would start here.`,
    `Stop showing the product first. Show ${pain} first.`,
    `Here is a ${product.platform} ad angle for ${audience}.`,
    `The buyer does not need more features. They need to see ${benefit}.`,
  ];

  return baseHooks.slice(0, Math.max(1, Math.min(count, baseHooks.length)));
}

export function writeUgcScripts(input: ProductInput): UgcScript[] {
  const product = normalizeProductInput(input);
  const hooks = generateHooks(product, 3);
  const benefitOne = first(product.benefits, 'clear product benefit');
  const benefitTwo = product.benefits[1] || benefitOne;
  const painOne = first(product.painPoints, 'the old way feels slow');
  const painTwo = product.painPoints[1] || painOne;
  const proofOne = first(product.proofPoints, 'a simple proof point');
  const offer = product.offer || 'try it today';

  return [
    {
      title: 'Problem-led UGC demo',
      hook: hooks[0],
      problem: `${titleCase(product.audience)} are dealing with ${painOne}.`,
      demo: `Show ${product.productName} in use and call out ${benefitOne}.`,
      proof: `Add a close-up proof cue: ${proofOne}.`,
      cta: `Try ${product.productName} while ${offer} is available.`,
      onScreenText: [painOne, benefitOne, offer],
      shotNotes: [
        `Open with the buyer context around ${painOne}.`,
        product.requiredShots[0],
        'Keep captions readable in a 9:16 mobile frame.',
      ],
    },
    {
      title: 'Routine upgrade script',
      hook: hooks[1],
      problem: `The old routine is frustrating because ${painTwo}.`,
      demo: `Walk through the product in one continuous shot and highlight ${benefitTwo}.`,
      proof: `Use on-screen text to reinforce ${proofOne}.`,
      cta: `Use ${offer} and turn the product into part of your next routine.`,
      onScreenText: [benefitTwo, proofOne, product.primaryCta],
      shotNotes: [
        'Use a natural talking-head intro, then cut to product demo.',
        product.requiredShots[1] || `Show ${product.productName} in use.`,
        'End with a clean product and offer frame.',
      ],
    },
    {
      title: 'Creative director brief',
      hook: hooks[2],
      problem: `Open with the buyer hesitation, then make the value clear without overclaiming.`,
      demo: `Show ${product.productName}, the main feature, and the real-use moment in under 10 seconds.`,
      proof: `Support the claim with ${product.proofPoints.join(', ')}.`,
      cta: `End on a clean product shot and the offer: ${offer}.`,
      onScreenText: [
        `${product.productName} for ${product.audience}`,
        product.benefits.slice(0, 2).join(' + '),
        offer,
      ],
      shotNotes: [
        'Keep the opening visual specific and easy to understand without sound.',
        ...product.requiredShots.slice(0, 3),
      ],
    },
  ];
}

export function generateStoryboard(input: ProductInput): Storyboard {
  const product = normalizeProductInput(input);
  const duration = Math.max(15, product.durationSeconds);
  const benefit = first(product.benefits, 'clear product benefit');
  const proof = first(product.proofPoints, 'simple proof');
  const pain = first(product.painPoints, 'the old way');
  const cta = product.offer || product.primaryCta;

  const scenes: StoryboardScene[] = [
    {
      start: 0,
      end: 3,
      visual: 'Fast close-up of the buyer problem',
      caption: `${pain}?`,
      voiceover: `If ${product.audience} are tired of ${pain}, watch this.`,
      purpose: 'hook',
      shotType: 'close-up',
      productionNotes: ['Make the pain point visible before naming the product.'],
    },
    {
      start: 3,
      end: 7,
      visual: 'Product enters frame in real use',
      caption: benefit,
      voiceover: `This is ${product.productName}.`,
      purpose: 'product',
      shotType: 'product-demo',
      productionNotes: [product.requiredShots[0]],
    },
    {
      start: 7,
      end: Math.round(duration * 0.47),
      visual: 'Feature sequence with tight product shots',
      caption: product.benefits.slice(0, 3).join(' / '),
      voiceover: `It is built for ${product.audience}.`,
      purpose: 'demo',
      shotType: 'product-demo',
      productionNotes: product.requiredShots.slice(0, 2),
    },
    {
      start: Math.round(duration * 0.47),
      end: Math.round(duration * 0.73),
      visual: 'Show product fitting into the buyer routine',
      caption: proof,
      voiceover: `The proof is simple: ${proof}.`,
      purpose: 'proof',
      shotType: 'lifestyle',
      productionNotes: ['Use only substantiated proof points and rights-cleared assets.'],
    },
    {
      start: Math.round(duration * 0.73),
      end: duration,
      visual: 'Product hero shot with clear offer',
      caption: cta,
      voiceover: `Try ${product.productName} today.`,
      purpose: 'cta',
      shotType: 'hero-shot',
      productionNotes: ['Keep CTA readable and avoid false urgency.'],
    },
  ];

  return {
    platform: product.platform,
    durationSeconds: duration,
    aspectRatio: platformAspectRatio(product.platform),
    scenes,
    cta,
    notes: [
      'Storyboard is a planning artifact and does not trigger AdsTurbo generation.',
      'Review claims, rights, and platform policy before production.',
    ],
  };
}

export function exportAdsTurboPrompt(input: ProductInput): string {
  const product = normalizeProductInput(input);
  const brand = product.brandName ? ` from ${product.brandName}` : '';
  return `Create a ${product.durationSeconds}s ${titleCase(product.platform)} UGC-style product video ad for ${product.productName}${brand}, a ${product.category} for ${product.audience}. Start with the frustration of ${product.painPoints.join(', ')}, show ${product.benefits.join(', ')}, include proof cues around ${product.proofPoints.join(', ')}, show these required shots: ${product.requiredShots.join('; ')}, and end with ${product.offer || product.primaryCta}. Style: ${product.tone}, natural lighting, close product shots, clear captions, mobile-first ${platformAspectRatio(product.platform)}. Avoid unsupported claims: ${product.forbiddenClaims.join(', ') || 'none provided'}.`;
}

export function buildAdBrief(input: ProductInput): AdBrief {
  const product = normalizeProductInput(input);
  return {
    productName: product.productName,
    brandName: product.brandName,
    audience: product.audience,
    category: product.category,
    platform: product.platform,
    durationSeconds: product.durationSeconds,
    productUrl: product.productUrl,
    price: product.price,
    offer: product.offer,
    coreRead: `${product.productName} is a ${product.category} for ${product.audience}. The strongest initial angle is simple routine improvement: ${product.benefits.join(', ')}.`,
    audienceInsight: `${titleCase(product.audience)} need to quickly understand why ${product.productName} is easier than their current workaround: ${product.painPoints.join(', ')}.`,
    mustShowShots: product.requiredShots,
    angles: buildVariationPlan(product),
    scripts: writeUgcScripts(product),
    storyboard: generateStoryboard(product),
    adsturboPrompt: exportAdsTurboPrompt(product),
    complianceNotes: complianceNotes(product),
  };
}

export function reviewAdScript(script: string): ScriptReview {
  const lower = script.toLowerCase();
  const checks = [
    { key: 'hook', label: 'Clear hook in the opening line', ok: /hook|watch|stop|if you|before|here/i.test(script) },
    { key: 'problem', label: 'Buyer problem or tension is present', ok: /problem|tired|struggle|annoying|frustrat|pain|hard|slow|too many|expensive|inconsistent|skipped/i.test(script) },
    { key: 'demo', label: 'Product demo or visual proof is included', ok: /show|demo|see|look|close-up|before|after|use/i.test(script) },
    { key: 'proof', label: 'Proof point or credibility cue is included', ok: /proof|review|result|tested|designed|built|because|data/i.test(script) },
    { key: 'cta', label: 'CTA is explicit', ok: /try|shop|get|start|visit|click|buy|download|sign up/i.test(script) },
    { key: 'caption', label: 'Caption or on-screen text is considered', ok: /caption|text|subtitle|on-screen/i.test(script) },
    { key: 'first_three_seconds', label: 'Opening can be understood in the first three seconds', ok: /first three|first 3|opening|0-3|before you scroll|watch this|stop/i.test(script) },
    { key: 'mobile_framing', label: 'Mobile-first shot or caption guidance is present', ok: /9:16|mobile|vertical|caption|subtitle|on-screen/i.test(script) },
  ];
  const passed = checks.filter((check) => check.ok).map((check) => check.label);
  const missing = checks.filter((check) => !check.ok).map((check) => check.label);
  const riskNotes: string[] = [];

  if (/guarantee|guaranteed|cure|always|never|risk-free|no risk/i.test(script)) {
    riskNotes.push('Review absolute or regulated claims before publishing.');
  }
  if (/copy|steal|clone exactly|same as/i.test(lower)) {
    riskNotes.push('Avoid language that implies copying protected creative work.');
  }
  if (/best|number one|#1|clinically proven|doctor recommended/i.test(script) && !/source|study|review|data|tested/i.test(script)) {
    riskNotes.push('Add substantiation for superiority, clinical, or authority claims.');
  }

  const score = Math.round((passed.length / checks.length) * 100);
  const readiness = score >= 85 && riskNotes.length === 0
    ? 'ready for creative review'
    : score >= 60
      ? 'usable with edits'
      : 'needs work';

  return {
    score,
    readiness,
    checks,
    passed,
    missing,
    suggestions: missing.map((item) => `Add: ${item}.`),
    riskNotes,
    recommendedNextStep: readiness === 'ready for creative review'
      ? 'Convert the script into a storyboard and AdsTurbo-ready prompt.'
      : 'Revise missing structure and risk notes before using this script for production.',
  };
}

export function toMarkdown(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value
      .map((item, index) => `### ${index + 1}\n\n${toMarkdown(item)}`)
      .join('\n\n');
  }
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([key, item]) => {
        if (Array.isArray(item)) {
          return `## ${titleCase(key)}\n\n${item.map((entry, index) => `${index + 1}. ${typeof entry === 'object' ? JSON.stringify(entry, null, 2) : entry}`).join('\n')}`;
        }
        return `**${titleCase(key)}:** ${typeof item === 'object' ? JSON.stringify(item, null, 2) : item}`;
      })
      .join('\n\n');
  }
  return String(value);
}
