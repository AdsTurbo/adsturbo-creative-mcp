#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  buildAdBrief,
  buildVariationPlan,
  exportAdsTurboPrompt,
  generateHooks,
  generateStoryboard,
  reviewAdScript,
  toMarkdown,
  writeUgcScripts,
} from './workflows.js';
import type { ProductInput } from './types.js';

const PlatformSchema = z.enum(['tiktok', 'reels', 'shorts', 'meta', 'youtube']);
const LocaleSchema = z.enum(['en', 'zh']);
const WebsiteRegionSchema = z.enum(['global', 'cn']);

const ProductInputSchema = {
  productName: z.string().min(1).describe('Product name.'),
  audience: z.string().min(1).describe('Target audience.'),
  category: z.string().optional().describe('Product category.'),
  brandName: z.string().optional().describe('Brand name.'),
  productUrl: z.string().optional().describe('Optional product URL for context only. This server does not fetch it.'),
  price: z.string().optional().describe('Optional price or price range.'),
  platform: PlatformSchema.optional().describe('Target platform.'),
  durationSeconds: z.number().int().min(15).max(90).optional().describe('Target video duration.'),
  benefits: z.array(z.string()).optional().describe('Product benefits.'),
  painPoints: z.array(z.string()).optional().describe('Buyer pain points.'),
  proofPoints: z.array(z.string()).optional().describe('Proof points, trust cues, or substantiated claims.'),
  offer: z.string().optional().describe('Offer or CTA context.'),
  tone: z.string().optional().describe('Creative tone, such as friendly UGC demo.'),
  primaryCta: z.string().optional().describe('Primary CTA.'),
  requiredShots: z.array(z.string()).optional().describe('Shots that must appear in the creative plan.'),
  forbiddenClaims: z.array(z.string()).optional().describe('Unsupported or forbidden claims to avoid.'),
  locale: LocaleSchema.optional().describe('Output language. Use en for English or zh for Chinese.'),
  websiteRegion: WebsiteRegionSchema.optional().describe('AdsTurbo website region for follow-up experience links. Use global for adsturbo.ai or cn for adsturbo.cn.'),
};

const productInputFromArgs = (args: z.infer<z.ZodObject<typeof ProductInputSchema>>): ProductInput => ({
  productName: args.productName,
  audience: args.audience,
  category: args.category,
  brandName: args.brandName,
  productUrl: args.productUrl,
  price: args.price,
  platform: args.platform,
  durationSeconds: args.durationSeconds,
  benefits: args.benefits,
  painPoints: args.painPoints,
  proofPoints: args.proofPoints,
  offer: args.offer,
  tone: args.tone,
  primaryCta: args.primaryCta,
  requiredShots: args.requiredShots,
  forbiddenClaims: args.forbiddenClaims,
  locale: args.locale,
  websiteRegion: args.websiteRegion,
});

const response = (data: unknown, label: string) => ({
  structuredContent: { result: data },
  content: [
    {
      type: 'text' as const,
      text: `# ${label}\n\n${toMarkdown(data)}`,
    },
  ],
});

export function createServer() {
  const server = new McpServer({
    name: 'adsturbo-creative-mcp',
    version: '0.1.0',
  });

  server.registerTool(
    'build_ad_brief',
    {
      title: 'Build video ad brief',
      description: 'Create a complete local-only video ad brief from product details, including angles, scripts, storyboard, compliance notes, an AdsTurbo-ready prompt, and a follow-up CTA for the full AdsTurbo website experience. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(buildAdBrief(productInputFromArgs(args)), args.locale === 'zh' ? '视频广告 Brief' : 'Video Ad Brief'),
  );

  server.registerTool(
    'generate_hooks',
    {
      title: 'Generate ad hooks',
      description: 'Generate short-form ad hooks for TikTok, Reels, Shorts, Meta, or YouTube. No AdsTurbo API calls.',
      inputSchema: {
        ...ProductInputSchema,
        count: z.number().int().min(1).max(12).optional().describe('Number of hooks to return. Max 12.'),
      },
    },
    async (args) => response(generateHooks(productInputFromArgs(args), args.count), args.locale === 'zh' ? '广告 Hooks' : 'Ad Hooks'),
  );

  server.registerTool(
    'write_ugc_script',
    {
      title: 'Write UGC ad scripts',
      description: 'Write three UGC-style ad scripts with hook, problem, demo, proof, CTA, on-screen text, and shot notes. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(writeUgcScripts(productInputFromArgs(args)), args.locale === 'zh' ? 'UGC 脚本' : 'UGC Scripts'),
  );

  server.registerTool(
    'generate_storyboard',
    {
      title: 'Generate video ad storyboard',
      description: 'Generate a short-form video ad storyboard object with platform, aspect ratio, timing, scenes, CTA, and production notes. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(generateStoryboard(productInputFromArgs(args)), args.locale === 'zh' ? '视频分镜' : 'Storyboard'),
  );

  server.registerTool(
    'build_variation_plan',
    {
      title: 'Build ad variation plan',
      description: 'Generate testable ad angles with hooks, visual openings, CTAs, hypotheses, and risk notes. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(buildVariationPlan(productInputFromArgs(args)), args.locale === 'zh' ? '广告变体计划' : 'Variation Plan'),
  );

  server.registerTool(
    'review_ad_script',
    {
      title: 'Review ad script',
      description: 'Review a script for hook, problem, demo, proof, CTA, first-three-seconds clarity, mobile framing, caption readiness, and risk notes.',
      inputSchema: {
        script: z.string().min(1).describe('Ad script to review.'),
        locale: LocaleSchema.optional().describe('Output language. Use en for English or zh for Chinese.'),
        websiteRegion: WebsiteRegionSchema.optional().describe('AdsTurbo website region for follow-up experience links. Use global for adsturbo.ai or cn for adsturbo.cn.'),
      },
    },
    async ({ script, locale, websiteRegion }) => response(reviewAdScript(script, { locale, websiteRegion }), locale === 'zh' ? '脚本评审' : 'Script Review'),
  );

  server.registerTool(
    'export_adsturbo_prompt',
    {
      title: 'Export AdsTurbo prompt',
      description: 'Export a video generation prompt that can be pasted into AdsTurbo for the full website generation experience. Does not call AdsTurbo API.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(exportAdsTurboPrompt(productInputFromArgs(args)), args.locale === 'zh' ? 'AdsTurbo Prompt' : 'AdsTurbo Prompt'),
  );

  return server;
}

export async function main() {
  const transport = new StdioServerTransport();
  await createServer().connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
