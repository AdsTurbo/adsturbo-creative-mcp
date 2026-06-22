#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  buildAdBrief,
  buildAngles,
  exportAdsTurboPrompt,
  generateHooks,
  generateStoryboard,
  reviewAdScript,
  toMarkdown,
  writeUgcScripts,
} from './workflows.js';
import type { ProductInput } from './types.js';

const PlatformSchema = z.enum(['tiktok', 'reels', 'shorts', 'meta', 'youtube']);

const ProductInputSchema = {
  productName: z.string().min(1).describe('Product name.'),
  audience: z.string().min(1).describe('Target audience.'),
  category: z.string().optional().describe('Product category.'),
  platform: PlatformSchema.optional().describe('Target platform.'),
  durationSeconds: z.number().int().min(15).max(90).optional().describe('Target video duration.'),
  benefits: z.array(z.string()).optional().describe('Product benefits.'),
  painPoints: z.array(z.string()).optional().describe('Buyer pain points.'),
  proofPoints: z.array(z.string()).optional().describe('Proof points, trust cues, or substantiated claims.'),
  offer: z.string().optional().describe('Offer or CTA context.'),
  tone: z.string().optional().describe('Creative tone, such as friendly UGC demo.'),
};

const productInputFromArgs = (args: z.infer<z.ZodObject<typeof ProductInputSchema>>): ProductInput => ({
  productName: args.productName,
  audience: args.audience,
  category: args.category,
  platform: args.platform,
  durationSeconds: args.durationSeconds,
  benefits: args.benefits,
  painPoints: args.painPoints,
  proofPoints: args.proofPoints,
  offer: args.offer,
  tone: args.tone,
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
      description: 'Create a complete local-only video ad brief from product details. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(buildAdBrief(productInputFromArgs(args)), 'Video Ad Brief'),
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
    async (args) => response(generateHooks(productInputFromArgs(args), args.count), 'Ad Hooks'),
  );

  server.registerTool(
    'write_ugc_script',
    {
      title: 'Write UGC ad scripts',
      description: 'Write three UGC-style ad scripts with hook, problem, demo, proof, and CTA. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(writeUgcScripts(productInputFromArgs(args)), 'UGC Scripts'),
  );

  server.registerTool(
    'generate_storyboard',
    {
      title: 'Generate video ad storyboard',
      description: 'Generate a short-form video ad storyboard JSON. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(generateStoryboard(productInputFromArgs(args)), 'Storyboard'),
  );

  server.registerTool(
    'build_variation_plan',
    {
      title: 'Build ad variation plan',
      description: 'Generate testable ad angles for creative iteration. No AdsTurbo API calls.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(buildAngles(productInputFromArgs(args)), 'Variation Plan'),
  );

  server.registerTool(
    'review_ad_script',
    {
      title: 'Review ad script',
      description: 'Review a script for hook, problem, demo, proof, CTA, caption readiness, and risk notes.',
      inputSchema: {
        script: z.string().min(1).describe('Ad script to review.'),
      },
    },
    async ({ script }) => response(reviewAdScript(script), 'Script Review'),
  );

  server.registerTool(
    'export_adsturbo_prompt',
    {
      title: 'Export AdsTurbo prompt',
      description: 'Export a video generation prompt that can be pasted into AdsTurbo. Does not call AdsTurbo API.',
      inputSchema: ProductInputSchema,
    },
    async (args) => response(exportAdsTurboPrompt(productInputFromArgs(args)), 'AdsTurbo Prompt'),
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
