import type {
  AdAngle,
  AdBrief,
  Platform,
  ProductInput,
  ScriptReview,
  StoryboardScene,
  UgcScript,
} from './types.js';

const DEFAULT_PLATFORM: Platform = 'tiktok';
const DEFAULT_DURATION = 30;

const normalizeList = (items: string[] | undefined, fallback: string[]) =>
  (items && items.length > 0 ? items : fallback)
    .map((item) => item.trim())
    .filter(Boolean);

const first = (items: string[], fallback: string) => items.find(Boolean) || fallback;

const titleCase = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

export function normalizeProductInput(input: ProductInput): Required<Omit<ProductInput, 'offer'>> & {
  offer?: string;
} {
  return {
    productName: input.productName.trim(),
    audience: input.audience.trim(),
    category: input.category?.trim() || 'product',
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
  };
}

export function buildAngles(input: ProductInput): AdAngle[] {
  const product = normalizeProductInput(input);
  const benefit = first(product.benefits, 'clear product benefit');
  const pain = first(product.painPoints, 'the old way feels slow');
  const proof = first(product.proofPoints, 'simple proof');

  return [
    {
      title: 'Problem first, product second',
      description: `Open with ${pain}, then introduce ${product.productName} as the practical fix.`,
    },
    {
      title: 'Show the product doing the work',
      description: `Make ${benefit} visible in the first five seconds with close, mobile-first product shots.`,
    },
    {
      title: 'Small habit, repeatable payoff',
      description: `Frame ${product.productName} as a routine the audience can actually keep using, backed by ${proof}.`,
    },
  ];
}

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
      hook: hooks[0],
      problem: `${titleCase(product.audience)} are dealing with ${painOne}.`,
      demo: `Show ${product.productName} in use and call out ${benefitOne}.`,
      proof: `Add a close-up proof cue: ${proofOne}.`,
      cta: `Try ${product.productName} while ${offer} is available.`,
    },
    {
      hook: hooks[1],
      problem: `The old routine is frustrating because ${painTwo}.`,
      demo: `Walk through the product in one continuous shot and highlight ${benefitTwo}.`,
      proof: `Use on-screen text to reinforce ${proofOne}.`,
      cta: `Use ${offer} and turn the product into part of your next routine.`,
    },
    {
      hook: hooks[2],
      problem: `Open with the buyer hesitation, then make the value clear without overclaiming.`,
      demo: `Show ${product.productName}, the main feature, and the real-use moment in under 10 seconds.`,
      proof: `Support the claim with ${product.proofPoints.join(', ')}.`,
      cta: `End on a clean product shot and the offer: ${offer}.`,
    },
  ];
}

export function generateStoryboard(input: ProductInput): StoryboardScene[] {
  const product = normalizeProductInput(input);
  const duration = Math.max(15, product.durationSeconds);
  const benefit = first(product.benefits, 'clear product benefit');
  const proof = first(product.proofPoints, 'simple proof');
  const pain = first(product.painPoints, 'the old way');

  return [
    {
      start: 0,
      end: 3,
      visual: 'Fast close-up of the buyer problem',
      caption: `${pain}?`,
      voiceover: `If ${product.audience} are tired of ${pain}, watch this.`,
      purpose: 'hook',
    },
    {
      start: 3,
      end: 7,
      visual: 'Product enters frame in real use',
      caption: benefit,
      voiceover: `This is ${product.productName}.`,
      purpose: 'product',
    },
    {
      start: 7,
      end: Math.round(duration * 0.47),
      visual: 'Feature sequence with tight product shots',
      caption: product.benefits.slice(0, 3).join(' / '),
      voiceover: `It is built for ${product.audience}.`,
      purpose: 'demo',
    },
    {
      start: Math.round(duration * 0.47),
      end: Math.round(duration * 0.73),
      visual: 'Show product fitting into the buyer routine',
      caption: proof,
      voiceover: `The proof is simple: ${proof}.`,
      purpose: 'proof',
    },
    {
      start: Math.round(duration * 0.73),
      end: duration,
      visual: 'Product hero shot with clear offer',
      caption: product.offer || 'Try it today',
      voiceover: `Try ${product.productName} today.`,
      purpose: 'cta',
    },
  ];
}

export function exportAdsTurboPrompt(input: ProductInput): string {
  const product = normalizeProductInput(input);
  return `Create a ${product.durationSeconds}s ${titleCase(product.platform)} UGC-style product video ad for ${product.productName}, a ${product.category} for ${product.audience}. Start with the frustration of ${product.painPoints.join(', ')}, show ${product.benefits.join(', ')}, include proof cues around ${product.proofPoints.join(', ')}, and end with ${product.offer || 'a clear call to action'}. Style: ${product.tone}, natural lighting, close product shots, clear captions, mobile-first 9:16.`;
}

export function buildAdBrief(input: ProductInput): AdBrief {
  const product = normalizeProductInput(input);
  return {
    productName: product.productName,
    audience: product.audience,
    category: product.category,
    platform: product.platform,
    durationSeconds: product.durationSeconds,
    offer: product.offer,
    coreRead: `${product.productName} is a ${product.category} for ${product.audience}. The strongest initial angle is simple routine improvement: ${product.benefits.join(', ')}.`,
    angles: buildAngles(product),
    scripts: writeUgcScripts(product),
    storyboard: generateStoryboard(product),
    adsturboPrompt: exportAdsTurboPrompt(product),
    complianceNotes: [
      'Keep claims specific to product information you can substantiate.',
      'Use references for structure and pacing, not for copying protected creative assets.',
      'Confirm ad platform policy, rights clearance, and regulated-category requirements before launch.',
      'This MCP server is local-only and does not call AdsTurbo generation APIs.',
    ],
  };
}

export function reviewAdScript(script: string): ScriptReview {
  const lower = script.toLowerCase();
  const checks = [
    { key: 'hook', label: 'Clear hook in the opening line', ok: /hook|watch|stop|if you|before|here/i.test(script) },
    { key: 'problem', label: 'Buyer problem or tension is present', ok: /problem|tired|struggle|annoying|frustrat|pain|hard|slow/i.test(script) },
    { key: 'demo', label: 'Product demo or visual proof is included', ok: /show|demo|see|look|close-up|before|after|use/i.test(script) },
    { key: 'proof', label: 'Proof point or credibility cue is included', ok: /proof|review|result|tested|designed|built|because|data/i.test(script) },
    { key: 'cta', label: 'CTA is explicit', ok: /try|shop|get|start|visit|click|buy|download|sign up/i.test(script) },
    { key: 'caption', label: 'Caption or on-screen text is considered', ok: /caption|text|subtitle|on-screen/i.test(script) },
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

  return {
    score: Math.round((passed.length / checks.length) * 100),
    passed,
    missing,
    suggestions: missing.map((item) => `Add: ${item}.`),
    riskNotes,
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
