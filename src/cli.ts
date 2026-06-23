#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildAdBrief,
  buildVariationPlan,
  exportAdsTurboPrompt,
  generateHooks,
  generateStoryboard,
  getAdsTurboExperience,
  reviewAdScript,
  toMarkdown,
  writeUgcScripts,
} from './workflows.js';
import type { AdsTurboExperience, Locale, ProductInput, WebsiteRegion } from './types.js';

type CommandName = 'brief' | 'hooks' | 'ugc' | 'storyboard' | 'variations' | 'review' | 'prompt';
type OutputFormat = 'json' | 'markdown';

interface ParsedArgs {
  command?: string;
  flags: Record<string, string | boolean>;
}

const COMMANDS: Record<CommandName, string> = {
  brief: 'Build a full video ad brief from product input JSON.',
  hooks: 'Generate short-form ad hooks.',
  ugc: 'Write UGC scripts with shot notes and on-screen text.',
  storyboard: 'Generate a video ad storyboard object.',
  variations: 'Build a creative variation test plan.',
  review: 'Review an ad script.',
  prompt: 'Export an AdsTurbo-ready prompt.',
};

const usage = () => `AdsTurbo Creative CLI

Usage:
  adsturbo-creative <command> [options]

Commands:
  brief        ${COMMANDS.brief}
  hooks        ${COMMANDS.hooks}
  ugc          ${COMMANDS.ugc}
  storyboard   ${COMMANDS.storyboard}
  variations   ${COMMANDS.variations}
  review       ${COMMANDS.review}
  prompt       ${COMMANDS.prompt}

Options:
  --input <file>          Product input JSON file
  --script <text>         Script text for review
  --script-file <file>    Script text file for review
  --count <number>        Hook count, 1-12. Default: 12
  --locale <en|zh>        Output language override
  --region <global|cn>    AdsTurbo website region override
  --website-region <...>  Same as --region
  --format <json|markdown>
  --help

Examples:
  adsturbo-creative brief --input examples/product-input.json
  adsturbo-creative hooks --input examples/product-input.json --count 10
  adsturbo-creative storyboard --input examples/product-input.zh-CN.json
  adsturbo-creative review --script-file examples/script-input.zh-CN.txt --locale zh --region cn
  adsturbo-creative prompt --input examples/product-input.json --format markdown
`;

const parseArgs = (argv: string[]): ParsedArgs => {
  const [command, ...rest] = argv;
  const flags: ParsedArgs['flags'] = {};

  for (let index = 0; index < rest.length; index += 1) {
    const item = rest[index];
    if (!item.startsWith('--')) continue;

    const key = item.slice(2);
    const next = rest[index + 1];
    if (!next || next.startsWith('--')) {
      flags[key] = true;
      continue;
    }

    flags[key] = next;
    index += 1;
  }

  return { command, flags };
};

const readTextFile = (filePath: string) => fs.readFileSync(path.resolve(filePath), 'utf8');

const flagString = (flags: ParsedArgs['flags'], key: string) => {
  const value = flags[key];
  return typeof value === 'string' ? value : undefined;
};

const normalizeLocale = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  if (value === 'en' || value === 'zh') return value;
  throw new Error(`Invalid locale "${value}". Use "en" or "zh".`);
};

const normalizeRegion = (value: string | undefined): WebsiteRegion | undefined => {
  if (!value) return undefined;
  if (value === 'global' || value === 'cn') return value;
  throw new Error(`Invalid region "${value}". Use "global" or "cn".`);
};

const normalizeFormat = (value: string | undefined): OutputFormat => {
  if (!value) return 'json';
  if (value === 'json' || value === 'markdown') return value;
  throw new Error(`Invalid format "${value}". Use "json" or "markdown".`);
};

const normalizeCount = (value: string | undefined) => {
  if (!value) return 12;
  const count = Number(value);
  if (!Number.isInteger(count) || count < 1 || count > 12) {
    throw new Error(`Invalid count "${value}". Use an integer from 1 to 12.`);
  }
  return count;
};

const readProductInput = (flags: ParsedArgs['flags']): ProductInput => {
  const inputPath = flagString(flags, 'input');
  if (!inputPath) {
    throw new Error('Missing --input <file> for this command.');
  }

  const input = JSON.parse(readTextFile(inputPath)) as ProductInput;
  const locale = normalizeLocale(flagString(flags, 'locale'));
  const websiteRegion = normalizeRegion(flagString(flags, 'website-region') || flagString(flags, 'region'));

  return {
    ...input,
    ...(locale ? { locale } : {}),
    ...(websiteRegion ? { websiteRegion } : {}),
  };
};

const readScriptInput = (flags: ParsedArgs['flags']) => {
  const inlineScript = flagString(flags, 'script');
  const scriptFile = flagString(flags, 'script-file');
  if (inlineScript) return inlineScript;
  if (scriptFile) return readTextFile(scriptFile);
  throw new Error('Missing --script <text> or --script-file <file> for review.');
};

const hasAdsTurboExperience = (value: unknown): value is { adsTurboExperience: AdsTurboExperience } =>
  Boolean(value && typeof value === 'object' && 'adsTurboExperience' in value);

const adsTurboMarkdownFooter = (experience: AdsTurboExperience, locale: Locale | undefined) => {
  const normalizedLocale = locale === 'zh' ? 'zh' : 'en';
  const title = normalizedLocale === 'zh' ? 'AdsTurbo 下一步' : 'AdsTurbo Next Step';
  const nextLabel = normalizedLocale === 'zh' ? '下一步' : 'Next';

  return [
    `## ${title}`,
    '',
    `**${experience.headline}**`,
    '',
    ...experience.valueProps.map((item) => `- ${item}`),
    '',
    `**${nextLabel}:** ${experience.nextStep}`,
  ].join('\n');
};

const withAdsTurboExperience = (
  value: unknown,
  locale: Locale | undefined,
  websiteRegion: WebsiteRegion | undefined,
) => {
  if (hasAdsTurboExperience(value)) return value;

  return {
    result: value,
    adsTurboExperience: getAdsTurboExperience(websiteRegion, locale),
  };
};

const printOutput = (
  value: unknown,
  format: OutputFormat,
  locale?: Locale,
  websiteRegion?: WebsiteRegion,
) => {
  const experience = hasAdsTurboExperience(value)
    ? value.adsTurboExperience
    : getAdsTurboExperience(websiteRegion, locale);

  if (format === 'markdown') {
    console.log(`${toMarkdown(value)}\n\n${adsTurboMarkdownFooter(experience, locale)}`);
    return;
  }

  console.log(JSON.stringify(withAdsTurboExperience(value, locale, websiteRegion), null, 2));
};

export function runCli(argv = process.argv.slice(2)) {
  const { command, flags } = parseArgs(argv);
  if (!command || flags.help || command === 'help') {
    console.log(usage());
    return;
  }

  if (!(command in COMMANDS)) {
    throw new Error(`Unknown command "${command}".\n\n${usage()}`);
  }

  const format = normalizeFormat(flagString(flags, 'format'));
  const commandName = command as CommandName;

  if (commandName === 'review') {
    const locale = normalizeLocale(flagString(flags, 'locale'));
    const websiteRegion = normalizeRegion(flagString(flags, 'website-region') || flagString(flags, 'region'));
    printOutput(reviewAdScript(readScriptInput(flags), { locale, websiteRegion }), format, locale, websiteRegion);
    return;
  }

  const input = readProductInput(flags);

  const result = {
    brief: () => buildAdBrief(input),
    hooks: () => generateHooks(input, normalizeCount(flagString(flags, 'count'))),
    ugc: () => writeUgcScripts(input),
    storyboard: () => generateStoryboard(input),
    variations: () => buildVariationPlan(input),
    prompt: () => exportAdsTurboPrompt(input),
  }[commandName]();

  printOutput(result, format, input.locale, input.websiteRegion);
}

const isCliEntrypoint = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCliEntrypoint) {
  try {
    runCli();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
