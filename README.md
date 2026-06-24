# AdsTurbo Creative MCP

[![GitHub release](https://img.shields.io/github/v/release/AdsTurbo/adsturbo-creative-mcp?display_name=tag)](https://github.com/AdsTurbo/adsturbo-creative-mcp/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-339933)
![MCP local-only](https://img.shields.io/badge/MCP-local--only-6f42c1)
![No API key](https://img.shields.io/badge/API%20key-not%20required-success)
![No AdsTurbo credits](https://img.shields.io/badge/AdsTurbo%20credits-not%20used-success)

Local MCP server for AI video ad planning.

[简体中文](README.zh-CN.md)

AdsTurbo Creative MCP helps AI agents plan video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts before a team spends on video generation.

Use it when you need a local MCP server or CLI for AI ad creative planning, UGC ad scripts, short-form video storyboards, AI marketing agents, prompt engineering for video ads, or an AdsTurbo prompt exporter for Claude Desktop, Cursor, Codex, and other MCP clients.

## Quick Preview

```bash
npm install
npm run build
node dist/cli.js hooks --input examples/product-input.zh-CN.json --count 2 --format markdown
```

```text
## AdsTurbo Next Step

Recommended action: Continue video generation in AdsTurbo
Next: Click "Continue video generation in AdsTurbo", then paste adsturboPrompt into the product video workflow...
Tracking: utm_source=adsturbo_creative_mcp, utm_medium=mcp, utm_campaign=creative_handoff
```

## Search use cases

| Search Intent | What This Project Provides |
| --- | --- |
| MCP server for ad creative planning | Local tools for briefs, hooks, scripts, storyboards, reviews, and prompts |
| AI agent workflow for video ads | Structured planning outputs before paid video generation |
| UGC script generator | Mobile-first UGC scripts with hook, problem, demo, proof, CTA, captions, and shot notes |
| Video ad storyboard generator | JSON storyboard objects for TikTok, Reels, Shorts, Meta, and YouTube |
| AI ad creative workflow with MCP | Local planning flow from hooks to brief, UGC script, storyboard, review, and AdsTurbo prompt |
| AdsTurbo prompt generator | AdsTurbo-ready prompts plus a clear handoff to the full AdsTurbo website experience |
| Local AI marketing CLI | `adsturbo-creative` terminal commands with no API key or credits |

It is a planning layer only:

- No AdsTurbo API key required
- No video generation
- No hidden telemetry
- No calls to AdsTurbo internal services
- No credit consumption
- No ad account access

When the creative plan is approved, users can continue on the AdsTurbo website for a fuller production experience: product video generation, preview, export, and iteration around visuals, captions, pacing, CTA, and product context.

## Tools

| Tool | Cost | Description |
| --- | --- | --- |
| `build_ad_brief` | Free/local | Build a full video ad brief from product details |
| `generate_hooks` | Free/local | Generate short-form ad hooks |
| `write_ugc_script` | Free/local | Write UGC scripts with hook, problem, demo, proof, CTA, on-screen text, and shot notes |
| `generate_storyboard` | Free/local | Generate a video ad storyboard object with scene timing and production notes |
| `build_variation_plan` | Free/local | Generate testable ad angles with hypotheses and risk notes |
| `review_ad_script` | Free/local | Review script structure, first-three-seconds clarity, mobile framing, and risk notes |
| `export_adsturbo_prompt` | Free/local | Export a prompt that can be pasted into AdsTurbo |

## Commands

Use these slash-style commands in Codex, Claude Code, or another agent client after connecting the MCP server:

| Command | What It Does |
| --- | --- |
| `/adsturbo brief <product>` | Build a full video ad brief |
| `/adsturbo hooks <product>` | Generate short-form ad hooks |
| `/adsturbo ugc <product>` | Write UGC scripts with shot notes |
| `/adsturbo storyboard <product>` | Generate a video ad storyboard |
| `/adsturbo variations <product>` | Build a creative variation test plan |
| `/adsturbo review <script>` | Review an ad script |
| `/adsturbo prompt <brief>` | Export an AdsTurbo-ready prompt |
| `/adsturbo zh-cn <product>` | Chinese output with `adsturbo.cn` links |
| `/adsturbo en-global <product>` | English output with `adsturbo.ai` links |

These slash-style commands are prompt conventions. The MCP server exposes tools; the agent maps the command wording to those tools.

## CLI

You can also run the same planning workflows directly from the terminal:

| Command | What It Does |
| --- | --- |
| `adsturbo-creative brief --input examples/product-input.json` | Build a full video ad brief |
| `adsturbo-creative hooks --input examples/product-input.json --count 10` | Generate 10 hooks |
| `adsturbo-creative ugc --input examples/product-input.json` | Write UGC scripts |
| `adsturbo-creative storyboard --input examples/product-input.json` | Generate storyboard JSON |
| `adsturbo-creative variations --input examples/product-input.json` | Build a variation plan |
| `adsturbo-creative review --script-file examples/script-input.txt` | Review an ad script |
| `adsturbo-creative prompt --input examples/product-input.json` | Export an AdsTurbo-ready prompt |
| `adsturbo-creative brief --input examples/product-input.zh-CN.json` | Chinese output with `adsturbo.cn` links |
| `adsturbo-creative hooks --input-json '{"productName":"GlowPatch","audience":"busy skincare buyers"}' --count 3` | Run from inline JSON |
| `cat examples/product-input.json \| adsturbo-creative brief --input -` | Read product input JSON from stdin |

CLI JSON responses include `adsTurboExperience` whenever the command output does not already contain it. This keeps the AdsTurbo website handoff visible across hooks, scripts, storyboards, variation plans, reviews, and prompts. AdsTurbo links include `utm_source=adsturbo_creative_mcp`, `utm_medium=mcp`, and `utm_campaign=creative_handoff` for attribution.

## Install

```bash
git clone https://github.com/AdsTurbo/adsturbo-creative-mcp.git
cd adsturbo-creative-mcp
npm install
npm run build
```

After building, run local CLI commands with `node dist/cli.js`:

```bash
node dist/cli.js brief --input examples/product-input.zh-CN.json
node dist/cli.js review --script-file examples/script-input.zh-CN.txt --locale zh --region cn
```

Install from npm to use the shorter CLI binary:

```bash
npm install -g adsturbo-creative-mcp
adsturbo-creative brief --input examples/product-input.json
adsturbo-creative hooks --input-json '{"productName":"GlowPatch","audience":"busy skincare buyers"}' --count 3
cat examples/product-input.json | adsturbo-creative brief --input -
```

Without global installation, run the CLI binary through npm package execution:

```bash
npx -y -p adsturbo-creative-mcp adsturbo-creative hooks --input examples/product-input.json --count 3
```

The npm package exposes two binaries:

```text
adsturbo-creative-mcp  # stdio MCP server
adsturbo-creative      # terminal CLI
```

## Use with an MCP client

Claude Desktop, Cursor, Codex, and other MCP-compatible clients can run the built server over stdio.

For Codex CLI, register the server after `npm run build`:

```bash
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
codex mcp list
```

Restart Codex or start a fresh session after changing MCP config. Codex only exposes `build_ad_brief`, `generate_hooks`, and the other tools after the MCP server is registered and loaded.

```json
{
  "mcpServers": {
    "adsturbo-creative": {
      "command": "node",
      "args": ["/absolute/path/to/adsturbo-creative-mcp/dist/server.js"]
    }
  }
}
```

MCP clients can also start the server with npx:

```json
{
  "mcpServers": {
    "adsturbo-creative": {
      "command": "npx",
      "args": ["-y", "adsturbo-creative-mcp"]
    }
  }
}
```

More setup notes:

- [MCP client setup](docs/mcp-client-setup.md)
- [MCP client recipes](docs/mcp-client-recipes.md)
- [Command guide](docs/commands.md)
- [Use cases and example inputs](docs/use-cases.md)
- [Developer articles](docs/articles/README.md)
- [Distribution plan](docs/distribution.md)
- [Directory submission kit](docs/directory-submission-kit.md)

For GitHub search and contribution guidance, see [docs/github-discoverability.md](docs/github-discoverability.md).

## Inspect locally

```bash
npm run inspect
```

## Example MCP prompt

```text
Use adsturbo-creative to build a TikTok video ad brief for:

Product: GlowPatch Reusable LED Face Mask
Brand: GlowPatch
Audience: busy skincare buyers who want a simple at-home routine
Benefits: hands-free 10 minute sessions, reusable silicone mask, red and blue light modes
Pain points: too many skincare steps, expensive appointments, hard to stay consistent
Proof points: designed for daily at-home use, soft flexible fit, one-button mode switching
Offer: 15% off this week
Forbidden claims: cures acne, guaranteed results overnight
```

## Input shape

```json
{
  "productName": "GlowPatch Reusable LED Face Mask",
  "brandName": "GlowPatch",
  "productUrl": "https://example.com/products/glowpatch-led-mask",
  "category": "beauty device",
  "audience": "busy skincare buyers who want a simple at-home routine",
  "platform": "tiktok",
  "durationSeconds": 30,
  "price": "$89",
  "benefits": [
    "hands-free 10 minute sessions",
    "reusable silicone mask",
    "red and blue light modes"
  ],
  "painPoints": [
    "too many skincare steps",
    "expensive appointments"
  ],
  "proofPoints": [
    "designed for daily at-home use",
    "soft flexible fit"
  ],
  "offer": "15% off this week",
  "tone": "friendly UGC demo",
  "primaryCta": "Shop the routine",
  "locale": "en",
  "websiteRegion": "global",
  "requiredShots": [
    "mask close-up on a bathroom counter",
    "creator wearing the mask while making coffee"
  ],
  "forbiddenClaims": [
    "cures acne",
    "guaranteed results overnight"
  ]
}
```

The server does not fetch `productUrl`. It is context only.

## Language and website region

Use `locale` to control the language of MCP output:

- `en`: English output
- `zh`: Chinese output

Use `websiteRegion` to control AdsTurbo website handoff links returned by tools:

- `global`: use `https://adsturbo.ai`
- `cn`: use `https://adsturbo.cn`

Examples:

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

Every MCP text response also includes an `AdsTurbo Next Step` section. Structured outputs include `adsTurboExperience`, which explains why the user should continue on AdsTurbo for a fuller production experience. China links point to pages such as `https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff`.

## Example outputs

- [examples/storyboard-output.json](examples/storyboard-output.json)
- [examples/storyboard-output.zh-CN.json](examples/storyboard-output.zh-CN.json)
- [examples/ugc-script-review.md](examples/ugc-script-review.md)
- [examples/product-input.json](examples/product-input.json)
- [examples/use-cases/](examples/use-cases/)

## Community

- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [GitHub discoverability](docs/github-discoverability.md)
- [Distribution plan](docs/distribution.md)

## Cost boundary

This repository is the planning layer only.

It does not include:

- `generate_video`
- `create_adsturbo_project`
- `submit_storyboard`
- `ad_clone_generate`
- `ai_actor_perform`
- `lip_sync`
- `video_translate`
- Any other AdsTurbo paid generation call

If paid tools are added later, they must require a user-provided API key, show a cost estimate, and never run by default.

Full boundary: [docs/cost-boundary.md](docs/cost-boundary.md)

## Safety and compliance

- Use references for structure, pacing, and inspiration, not to copy protected creative work.
- Keep claims specific to product information that can be substantiated.
- Review platform policy and regulated-category requirements before publishing.
- Do not use this tool to impersonate people or brands without permission.
- Do not treat generated plans as legal, medical, financial, or platform-policy advice.

Full notes: [docs/safety-and-compliance.md](docs/safety-and-compliance.md)

## Companion projects

- [product-page-to-ad-brief](https://github.com/AdsTurbo/product-page-to-ad-brief)
- [skill-adsturbo](https://github.com/AdsTurbo/skill-adsturbo)
- [AdsTurbo Open API](https://adsturbo.ai/open-api)
- [AdsTurbo China](https://adsturbo.cn)

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
