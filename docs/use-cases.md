# Use Cases

[简体中文](use-cases.zh-CN.md)

These examples show how to use AdsTurbo Creative MCP across common AI ad creative planning workflows. They are local-only inputs for briefs, hooks, UGC scripts, storyboards, variation plans, reviews, and AdsTurbo-ready prompts.

## Example Inputs

| File | Category | Platform | Best For |
| --- | --- | --- | --- |
| [beauty-led-mask.json](../examples/use-cases/beauty-led-mask.json) | Beauty device | TikTok | UGC skincare demos and compliance-aware claims |
| [ecommerce-kitchen-gadget.json](../examples/use-cases/ecommerce-kitchen-gadget.json) | Ecommerce product | Reels | Fast product demos and visual proof |
| [mobile-app-language-learning.json](../examples/use-cases/mobile-app-language-learning.json) | Mobile app | Shorts | Screen-recording led app ads |
| [saas-reporting-dashboard.json](../examples/use-cases/saas-reporting-dashboard.json) | B2B SaaS | YouTube | Product-led walkthroughs for business buyers |
| [zh-beauty-led-mask.json](../examples/use-cases/zh-beauty-led-mask.json) | 美容仪 | TikTok | 中文 UGC 护肤广告，国内站链接 |

## Run a Brief

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

## Generate Hooks

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/use-cases/ecommerce-kitchen-gadget.json --count 5
```

## Build a Storyboard

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative storyboard --input examples/use-cases/mobile-app-language-learning.json
```

## Export an AdsTurbo Prompt

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative prompt --input examples/use-cases/saas-reporting-dashboard.json --format markdown
```

## Chinese Output and China Website Region

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/zh-beauty-led-mask.json --format markdown
```

Chinese inputs should set:

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

This keeps the output in Chinese and points the AdsTurbo handoff to `https://adsturbo.cn` with UTM attribution.

## Workflow Pattern

1. Start with hooks to find the best angle.
2. Build a brief for the strongest angle.
3. Generate a storyboard to check pacing, proof, and CTA.
4. Review claims before production.
5. Export the AdsTurbo prompt and continue in AdsTurbo for video generation, preview, export, and iteration.

The MCP server does not call AdsTurbo APIs. It helps teams avoid spending credits before the creative direction is clear.
