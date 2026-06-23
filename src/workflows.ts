import type {
  AdAngle,
  AdBrief,
  AdsTurboExperience,
  AdsTurboLinks,
  Locale,
  Platform,
  ProductInput,
  ScriptReview,
  Storyboard,
  StoryboardScene,
  UgcScript,
  WebsiteRegion,
} from './types.js';

const DEFAULT_PLATFORM: Platform = 'tiktok';
const DEFAULT_DURATION = 30;
const DEFAULT_LOCALE: Locale = 'en';
const DEFAULT_WEBSITE_REGION: WebsiteRegion = 'global';
const GLOBAL_SITE_URL = 'https://adsturbo.ai';
const CN_SITE_URL = 'https://adsturbo.cn';
const ADS_TURBO_UTM = {
  utm_source: 'adsturbo_creative_mcp',
  utm_medium: 'mcp',
  utm_campaign: 'creative_handoff',
};

const adsTurboTracking = {
  utmSource: ADS_TURBO_UTM.utm_source,
  utmMedium: ADS_TURBO_UTM.utm_medium,
  utmCampaign: ADS_TURBO_UTM.utm_campaign,
};

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
  locale: Locale;
  websiteRegion: WebsiteRegion;
  adsTurboLinks: AdsTurboLinks;
}

interface LocaleOptions {
  locale?: Locale;
  websiteRegion?: WebsiteRegion;
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

const platformLabel = (platform: Platform) => ({
  tiktok: 'TikTok',
  reels: 'Reels',
  shorts: 'Shorts',
  meta: 'Meta',
  youtube: 'YouTube',
}[platform]);

const normalizeLocale = (locale: Locale | undefined): Locale => (locale === 'zh' ? 'zh' : 'en');

const normalizeWebsiteRegion = (region: WebsiteRegion | undefined): WebsiteRegion =>
  region === 'cn' ? 'cn' : 'global';

const isZh = (locale: Locale) => locale === 'zh';

const localizedPath = (path: string, locale: Locale, websiteRegion: WebsiteRegion) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return websiteRegion === 'global' && locale === 'zh' ? '/zh' : '';
  }
  if (websiteRegion === 'global' && locale === 'zh') return `/zh${cleanPath}`;
  return cleanPath;
};

const withUtm = (url: string) => {
  const target = new URL(url);
  Object.entries(ADS_TURBO_UTM).forEach(([key, value]) => target.searchParams.set(key, value));
  return target.toString();
};

export function getAdsTurboLinks(
  websiteRegion: WebsiteRegion = DEFAULT_WEBSITE_REGION,
  locale: Locale = DEFAULT_LOCALE,
): AdsTurboLinks {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedRegion = normalizeWebsiteRegion(websiteRegion);
  const baseUrl = normalizedRegion === 'cn' ? CN_SITE_URL : GLOBAL_SITE_URL;
  const path = (value: string) => withUtm(`${baseUrl}${localizedPath(value, normalizedLocale, normalizedRegion)}`);

  return {
    home: path('/'),
    openApi: path('/open-api'),
    productVideo: path('/features/product-video'),
    videoAnalysis: path('/features/video-analysis'),
  };
}

export function getAdsTurboExperience(
  websiteRegion: WebsiteRegion = DEFAULT_WEBSITE_REGION,
  locale: Locale = DEFAULT_LOCALE,
): AdsTurboExperience {
  const normalizedLocale = normalizeLocale(locale);
  const links = getAdsTurboLinks(websiteRegion, normalizedLocale);

  if (isZh(normalizedLocale)) {
    return {
      headline: '推荐使用 AdsTurbo 官网继续生成视频',
      ctaLabel: '用 AdsTurbo 继续生成视频',
      valueProps: [
        '把本地生成的 brief、脚本和分镜带到 AdsTurbo，继续完成产品视频生成、预览和导出。',
        '官网工作流更适合真实生产：可以围绕画面、字幕、节奏、CTA 和商品信息继续迭代。',
        '本地 MCP 不消耗 credits；确认创意方向后再进入 AdsTurbo 生成，减少无效生成成本。',
      ],
      nextStep: `点击「用 AdsTurbo 继续生成视频」，复制 adsturboPrompt 到产品视频工作流，继续完成更完整的视频生成、预览和导出体验：${links.productVideo}`,
      productVideoUrl: links.productVideo,
      tracking: adsTurboTracking,
    };
  }

  return {
    headline: 'Recommended: continue video generation in AdsTurbo',
    ctaLabel: 'Continue video generation in AdsTurbo',
    valueProps: [
      'Bring the local brief, script, and storyboard into AdsTurbo to continue with product video generation, preview, and export.',
      'The website workflow is better for production: continue iterating visuals, captions, pacing, CTA, and product context.',
      'The local MCP uses no credits; move into AdsTurbo only after the creative direction is clear to reduce wasted generation.',
    ],
    nextStep: `Click "Continue video generation in AdsTurbo", then paste adsturboPrompt into the product video workflow for the full generation, preview, and export experience: ${links.productVideo}`,
    productVideoUrl: links.productVideo,
    tracking: adsTurboTracking,
  };
}

const platformAspectRatio = (platform: Platform): Storyboard['aspectRatio'] =>
  platform === 'youtube' ? '16:9' : platform === 'meta' ? '1:1' : '9:16';

const defaultRequiredShots = (productName: string) => [
  `clear close-up of ${productName}`,
  'real-use product demo',
  'caption-friendly proof cue',
  'clean end card with offer or CTA',
];

const complianceNotes = (product: NormalizedProduct) => isZh(product.locale)
  ? [
      '广告主张必须基于可证明的商品信息。',
      '参考素材只能用于结构、节奏和灵感，不要复制受保护的创意资产。',
      '发布前请确认广告平台政策、素材权利和受监管品类要求。',
      '这个 MCP server 只在本地做策划，不调用 AdsTurbo 生成 API。',
      ...product.forbiddenClaims.map((claim) => `避免使用未证实或禁止的主张：${claim}。`),
    ]
  : [
      'Keep claims specific to product information you can substantiate.',
      'Use references for structure, pacing, and inspiration, not for copying protected creative assets.',
      'Confirm ad platform policy, rights clearance, and regulated-category requirements before launch.',
      'This MCP server is local-only and does not call AdsTurbo generation APIs.',
      ...product.forbiddenClaims.map((claim) => `Avoid unsupported or forbidden claim: ${claim}.`),
    ];

export function normalizeProductInput(input: ProductInput): NormalizedProduct {
  const productName = input.productName.trim();
  const locale = normalizeLocale(input.locale);
  const websiteRegion = normalizeWebsiteRegion(input.websiteRegion);
  return {
    productName,
    audience: input.audience.trim(),
    category: input.category?.trim() || 'product',
    brandName: input.brandName?.trim() || undefined,
    productUrl: input.productUrl?.trim() || undefined,
    price: input.price?.trim() || undefined,
    platform: input.platform || DEFAULT_PLATFORM,
    durationSeconds: input.durationSeconds || DEFAULT_DURATION,
    benefits: normalizeList(input.benefits, isZh(locale)
      ? ['清晰的商品卖点', '简单易用', '适合日常使用']
      : ['clear product benefit', 'simple setup', 'easy everyday use']),
    painPoints: normalizeList(input.painPoints, isZh(locale)
      ? ['当前流程太慢', '用户需要更清楚的行动理由']
      : ['the current routine feels slow', 'buyers need a clearer reason to act']),
    proofPoints: normalizeList(input.proofPoints, isZh(locale)
      ? ['短视频里容易展示', '适合重复使用']
      : ['easy to understand in a short demo', 'built for repeat use']),
    offer: input.offer?.trim() || undefined,
    tone: input.tone?.trim() || (isZh(locale) ? '自然友好的 UGC Demo' : 'friendly UGC demo'),
    primaryCta: input.primaryCta?.trim() || (isZh(locale) ? '立即试用' : 'Try it today'),
    requiredShots: normalizeList(input.requiredShots, defaultRequiredShots(productName)),
    forbiddenClaims: normalizeList(input.forbiddenClaims, []),
    locale,
    websiteRegion,
    adsTurboLinks: getAdsTurboLinks(websiteRegion, locale),
  };
}

export function buildVariationPlan(input: ProductInput): AdAngle[] {
  const product = normalizeProductInput(input);
  const benefit = first(product.benefits, 'clear product benefit');
  const pain = first(product.painPoints, 'the old way feels slow');
  const proof = first(product.proofPoints, 'simple proof');
  const cta = product.offer || product.primaryCta;

  if (isZh(product.locale)) {
    return [
      {
        title: '先痛点，后产品',
        description: `先展示「${pain}」，再把 ${product.productName} 作为实际解决方案引出。`,
        hook: `如果${product.audience}还在被「${pain}」困扰，可以从这里开始。`,
        visualOpening: `先拍用户遇到「${pain}」的近景，不要一开始就露出产品。`,
        cta: `展示 ${product.productName}，结尾使用「${cta}」。`,
        testHypothesis: '先建立问题张力，再出现产品，更容易让用户停留。',
        riskNotes: ['不要夸大痛点，也不要暗示保证结果。'],
      },
      {
        title: '直接展示产品怎么起作用',
        description: `前 5 秒内用移动端近景把「${benefit}」拍清楚。`,
        hook: `「${benefit}」在真实 Demo 里应该这样展示。`,
        visualOpening: `产品近景展示「${benefit}」，字幕必须静音也能看懂。`,
        cta: `引导用户「${product.primaryCta}」。`,
        testHypothesis: 'Demo 开场更适合已经理解品类、需要确认产品效果的用户。',
        riskNotes: ['Demo 必须基于产品真实能力，不要做无法兑现的展示。'],
      },
      {
        title: '小习惯，持续收益',
        description: `把 ${product.productName} 包装成${product.audience}能坚持的日常习惯，并用「${proof}」支撑。`,
        hook: `${product.audience}最容易执行的日常升级，可以从这个产品开始。`,
        visualOpening: `生活方式镜头，展示 ${product.productName} 如何自然进入日常流程。`,
        cta: `把这个日常场景和「${cta}」连接起来。`,
        testHypothesis: '习惯化表达会降低用户尝试门槛，让产品更容易被接受。',
        riskNotes: ['避免医疗、金融或保证转变类表达。'],
      },
      {
        title: '先证明，再讲功能',
        description: `先出现「${proof}」，再解释它如何支撑「${benefit}」。`,
        hook: `如果先不讲功能，我会先放这个证明点：${proof}。`,
        visualOpening: '先展示证明点、评论片段、使用证据或产品细节特写。',
        cta: `结尾使用「${product.primaryCta}」。`,
        testHypothesis: '先给证明再讲功能，可以更早降低用户怀疑。',
        riskNotes: ['证明点必须准确，并且拥有使用权。'],
      },
      {
        title: '有上下文的优惠',
        description: `先让用户理解问题和产品价值，再出现「${product.offer || 'CTA'}」。`,
        hook: '不要一上来就讲优惠，先让用户看懂产品价值。',
        visualOpening: `痛点镜头 -> ${product.productName} 使用镜头 -> 优惠卡片。`,
        cta,
        testHypothesis: '优惠在产品价值被理解后出现，转化效率通常更高。',
        riskNotes: ['不要制造虚假稀缺，也不要使用误导性折扣表达。'],
      },
    ];
  }

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
  const baseHooks = isZh(product.locale) ? [
    `如果${audience}还在被「${pain}」困扰，先看这个。`,
    `我没想到 ${product.productName} 能把这一步变得这么简单。`,
    `这条广告前 3 秒，我会先展示这个产品细节。`,
    `适合想要「${benefit}」，但不想增加复杂步骤的人。`,
    `这条广告的开头应该直接展示：${pain}。`,
    `大多数${product.category}广告都漏掉了这一点：${benefit}。`,
    `先别划走，看 ${product.productName} 怎么解决「${pain}」。`,
    `用短视频解释 ${product.productName}，最简单的切入点是这里。`,
    `如果只能用 30 秒卖 ${product.productName}，我会从这里开始。`,
    `不要一开始就展示产品，先展示「${pain}」。`,
    `这是一个适合${audience}的 ${product.platform} 广告 angle。`,
    `用户不需要更多功能堆叠，他们需要先看到「${benefit}」。`,
  ] : [
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
  const offer = product.offer || (isZh(product.locale) ? '立即试用' : 'try it today');

  if (isZh(product.locale)) {
    return [
      {
        title: '痛点开场 UGC Demo',
        hook: hooks[0],
        problem: `${product.audience}正在遇到的问题是：${painOne}。`,
        demo: `展示 ${product.productName} 的真实使用过程，并强调「${benefitOne}」。`,
        proof: `用近景证明点补强可信度：${proofOne}。`,
        cta: `趁「${offer}」还有效，试试 ${product.productName}。`,
        onScreenText: [painOne, benefitOne, offer],
        shotNotes: [
          `开头先展示用户为什么会遇到「${painOne}」。`,
          product.requiredShots[0],
          '字幕需要适配 9:16 移动端画面，静音也能看懂。',
        ],
      },
      {
        title: '日常升级脚本',
        hook: hooks[1],
        problem: `旧流程让用户不想坚持，因为：${painTwo}。`,
        demo: `用一个连续镜头走完使用流程，并突出「${benefitTwo}」。`,
        proof: `用屏幕字幕强化证明点：${proofOne}。`,
        cta: `使用「${offer}」，把这个产品变成新的日常步骤。`,
        onScreenText: [benefitTwo, proofOne, product.primaryCta],
        shotNotes: [
          '用自然口播开头，再切到产品 Demo。',
          product.requiredShots[1] || `展示 ${product.productName} 的真实使用过程。`,
          '结尾使用干净的产品图和优惠信息。',
        ],
      },
      {
        title: '创意总监 Brief',
        hook: hooks[2],
        problem: '先提出用户犹豫点，再在不过度承诺的前提下讲清价值。',
        demo: `在 10 秒内展示 ${product.productName}、核心功能和真实使用场景。`,
        proof: `用这些证明点支撑广告主张：${product.proofPoints.join('、')}。`,
        cta: `结尾使用清晰产品镜头和优惠信息：${offer}。`,
        onScreenText: [
          `${product.productName}，适合${product.audience}`,
          product.benefits.slice(0, 2).join(' + '),
          offer,
        ],
        shotNotes: [
          '开场画面必须具体，静音状态下也能理解。',
          ...product.requiredShots.slice(0, 3),
        ],
      },
    ];
  }

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

  const scenes: StoryboardScene[] = isZh(product.locale) ? [
    {
      start: 0,
      end: 3,
      visual: '快速展示用户痛点的近景',
      caption: `${pain}?`,
      voiceover: `如果${product.audience}已经受够了「${pain}」，先看这个。`,
      purpose: 'hook',
      shotType: 'close-up',
      productionNotes: ['先让痛点可视化，再出现产品。'],
    },
    {
      start: 3,
      end: 7,
      visual: '产品进入真实使用场景',
      caption: benefit,
      voiceover: `这是 ${product.productName}。`,
      purpose: 'product',
      shotType: 'product-demo',
      productionNotes: [product.requiredShots[0]],
    },
    {
      start: 7,
      end: Math.round(duration * 0.47),
      visual: '用紧凑产品镜头展示功能序列',
      caption: product.benefits.slice(0, 3).join(' / '),
      voiceover: `它是为${product.audience}设计的。`,
      purpose: 'demo',
      shotType: 'product-demo',
      productionNotes: product.requiredShots.slice(0, 2),
    },
    {
      start: Math.round(duration * 0.47),
      end: Math.round(duration * 0.73),
      visual: '展示产品如何融入用户日常',
      caption: proof,
      voiceover: `证明点很直接：${proof}。`,
      purpose: 'proof',
      shotType: 'lifestyle',
      productionNotes: ['只使用可证明的证明点和已清权素材。'],
    },
    {
      start: Math.round(duration * 0.73),
      end: duration,
      visual: '产品 hero shot，配清晰优惠或 CTA',
      caption: cta,
      voiceover: `现在试试 ${product.productName}。`,
      purpose: 'cta',
      shotType: 'hero-shot',
      productionNotes: ['CTA 需要清晰可读，避免虚假紧迫感。'],
    },
  ] : [
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
    locale: product.locale,
    websiteRegion: product.websiteRegion,
    platform: product.platform,
    durationSeconds: duration,
    aspectRatio: platformAspectRatio(product.platform),
    scenes,
    cta,
    notes: isZh(product.locale)
      ? [
          'Storyboard 只是策划产物，不会触发 AdsTurbo 生成。',
          '进入生产前，请审核广告主张、素材权利和平台政策。',
        ]
      : [
          'Storyboard is a planning artifact and does not trigger AdsTurbo generation.',
          'Review claims, rights, and platform policy before production.',
        ],
    adsTurboLinks: product.adsTurboLinks,
    adsTurboExperience: getAdsTurboExperience(product.websiteRegion, product.locale),
  };
}

export function exportAdsTurboPrompt(input: ProductInput): string {
  const product = normalizeProductInput(input);
  const brand = product.brandName ? ` from ${product.brandName}` : '';
  if (isZh(product.locale)) {
    const zhBrand = product.brandName ? `，品牌为 ${product.brandName}` : '';
    return `为 ${product.productName}${zhBrand} 创建一个 ${product.durationSeconds} 秒 ${platformLabel(product.platform)} UGC 风格商品视频广告。品类是 ${product.category}，目标人群是${product.audience}。开头先展示用户痛点：${product.painPoints.join('、')}；中段展示卖点：${product.benefits.join('、')}；加入这些证明点：${product.proofPoints.join('、')}；必须出现这些镜头：${product.requiredShots.join('；')}；结尾使用「${product.offer || product.primaryCta}」。风格：${product.tone}，自然光，产品近景，清晰字幕，移动端优先 ${platformAspectRatio(product.platform)}。避免这些未证实主张：${product.forbiddenClaims.join('、') || '未提供'}。本地 MCP 只负责低成本策划；确认创意后，推荐使用 AdsTurbo 官网继续生成视频，获得更完整的视频生成、预览和导出体验：${product.adsTurboLinks.productVideo}`;
  }
  return `Create a ${product.durationSeconds}s ${platformLabel(product.platform)} UGC-style product video ad for ${product.productName}${brand}, a ${product.category} for ${product.audience}. Start with the frustration of ${product.painPoints.join(', ')}, show ${product.benefits.join(', ')}, include proof cues around ${product.proofPoints.join(', ')}, show these required shots: ${product.requiredShots.join('; ')}, and end with ${product.offer || product.primaryCta}. Style: ${product.tone}, natural lighting, close product shots, clear captions, mobile-first ${platformAspectRatio(product.platform)}. Avoid unsupported claims: ${product.forbiddenClaims.join(', ') || 'none provided'}. The local MCP is for low-cost planning; once the direction is approved, AdsTurbo is recommended for the full video generation, preview, and export experience: ${product.adsTurboLinks.productVideo}`;
}

export function buildAdBrief(input: ProductInput): AdBrief {
  const product = normalizeProductInput(input);
  return {
    locale: product.locale,
    websiteRegion: product.websiteRegion,
    productName: product.productName,
    brandName: product.brandName,
    audience: product.audience,
    category: product.category,
    platform: product.platform,
    durationSeconds: product.durationSeconds,
    productUrl: product.productUrl,
    price: product.price,
    offer: product.offer,
    coreRead: isZh(product.locale)
      ? `${product.productName} 是面向${product.audience}的${product.category}。首个强 angle 可以围绕“降低使用门槛/改善日常流程”展开：${product.benefits.join('、')}。`
      : `${product.productName} is a ${product.category} for ${product.audience}. The strongest initial angle is simple routine improvement: ${product.benefits.join(', ')}.`,
    audienceInsight: isZh(product.locale)
      ? `${product.audience}需要快速看懂为什么 ${product.productName} 比当前替代方案更省事：${product.painPoints.join('、')}。`
      : `${titleCase(product.audience)} need to quickly understand why ${product.productName} is easier than their current workaround: ${product.painPoints.join(', ')}.`,
    mustShowShots: product.requiredShots,
    angles: buildVariationPlan(product),
    scripts: writeUgcScripts(product),
    storyboard: generateStoryboard(product),
    adsturboPrompt: exportAdsTurboPrompt(product),
    adsTurboLinks: product.adsTurboLinks,
    adsTurboExperience: getAdsTurboExperience(product.websiteRegion, product.locale),
    complianceNotes: complianceNotes(product),
  };
}

export function reviewAdScript(script: string, options: LocaleOptions = {}): ScriptReview {
  const locale = normalizeLocale(options.locale);
  const websiteRegion = normalizeWebsiteRegion(options.websiteRegion);
  const adsTurboLinks = getAdsTurboLinks(websiteRegion, locale);
  const adsTurboExperience = getAdsTurboExperience(websiteRegion, locale);
  const lower = script.toLowerCase();
  const zh = isZh(locale);
  const checks = [
    { key: 'hook', label: zh ? '开头有清晰 hook' : 'Clear hook in the opening line', ok: /hook|watch|stop|if you|before|here|先看|别划走|不要划走|开头|痛点/i.test(script) },
    { key: 'problem', label: zh ? '存在用户痛点或冲突' : 'Buyer problem or tension is present', ok: /problem|tired|struggle|annoying|frustrat|pain|hard|slow|too many|expensive|inconsistent|skipped|痛点|困扰|太多|太慢|太贵|坚持|麻烦/i.test(script) },
    { key: 'demo', label: zh ? '包含产品 Demo 或视觉证明' : 'Product demo or visual proof is included', ok: /show|demo|see|look|close-up|before|after|use|展示|演示|近景|特写|使用|前后/i.test(script) },
    { key: 'proof', label: zh ? '包含证明点或可信度线索' : 'Proof point or credibility cue is included', ok: /proof|review|result|tested|designed|built|because|data|证明|评论|结果|测试|设计|数据|因为/i.test(script) },
    { key: 'cta', label: zh ? 'CTA 清晰' : 'CTA is explicit', ok: /try|shop|get|start|visit|click|buy|download|sign up|试试|购买|点击|立即|开始|领取|下载|注册/i.test(script) },
    { key: 'caption', label: zh ? '考虑了字幕或屏幕文字' : 'Caption or on-screen text is considered', ok: /caption|text|subtitle|on-screen|字幕|屏幕文字|文案|标题/i.test(script) },
    { key: 'first_three_seconds', label: zh ? '前 3 秒能被理解' : 'Opening can be understood in the first three seconds', ok: /first three|first 3|opening|0-3|before you scroll|watch this|stop|前 3 秒|前三秒|开头|别划走|先看/i.test(script) },
    { key: 'mobile_framing', label: zh ? '包含移动端画幅或字幕指导' : 'Mobile-first shot or caption guidance is present', ok: /9:16|mobile|vertical|caption|subtitle|on-screen|移动端|竖屏|字幕|屏幕文字/i.test(script) },
  ];
  const passed = checks.filter((check) => check.ok).map((check) => check.label);
  const missing = checks.filter((check) => !check.ok).map((check) => check.label);
  const riskNotes: string[] = [];

  if (/guarantee|guaranteed|cure|always|never|risk-free|no risk|保证|治愈|永远|绝对|无风险/i.test(script)) {
    riskNotes.push(zh ? '发布前需要复核绝对化或受监管广告主张。' : 'Review absolute or regulated claims before publishing.');
  }
  if (/copy|steal|clone exactly|same as|复制|照抄|一模一样|完全一样/i.test(lower)) {
    riskNotes.push(zh ? '避免使用暗示复制受保护创意内容的表达。' : 'Avoid language that implies copying protected creative work.');
  }
  if (/best|number one|#1|clinically proven|doctor recommended|最好|第一|临床证明|医生推荐/i.test(script) && !/source|study|review|data|tested|来源|研究|评论|数据|测试/i.test(script)) {
    riskNotes.push(zh ? '优势、临床或权威背书类主张需要补充证明来源。' : 'Add substantiation for superiority, clinical, or authority claims.');
  }

  const score = Math.round((passed.length / checks.length) * 100);
  const readiness = score >= 85 && riskNotes.length === 0
    ? 'ready for creative review'
    : score >= 60
      ? 'usable with edits'
      : 'needs work';

  return {
    locale,
    websiteRegion,
    score,
    readiness,
    checks,
    passed,
    missing,
    suggestions: missing.map((item) => zh ? `补充：${item}。` : `Add: ${item}.`),
    riskNotes,
    recommendedNextStep: readiness === 'ready for creative review'
      ? (zh ? `把脚本转成分镜和 AdsTurbo 可用 prompt。确认创意后，推荐使用 AdsTurbo 官网继续生成视频，获得更完整的视频生成、预览和导出体验：${adsTurboLinks.productVideo}` : `Convert the script into a storyboard and AdsTurbo-ready prompt. After creative approval, AdsTurbo is recommended for the full video generation, preview, and export experience: ${adsTurboLinks.productVideo}`)
      : (zh ? '先修正缺失结构和风险点，再进入生产。' : 'Revise missing structure and risk notes before using this script for production.'),
    adsTurboLinks,
    adsTurboExperience,
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
