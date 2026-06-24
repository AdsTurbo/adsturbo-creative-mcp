# Command Guide

[简体中文](commands.zh-CN.md)

AdsTurbo Creative MCP exposes MCP tools. Slash-style commands such as `/adsturbo brief` are prompt conventions for agent clients. The terminal CLI uses the `adsturbo-creative` binary.

## Slash-Style Agent Commands

Use these after your MCP client has loaded the `adsturbo-creative` server.

| Prompt Command | Maps To | Best For |
| --- | --- | --- |
| `/adsturbo brief <product>` | `build_ad_brief` | Full creative planning before video generation |
| `/adsturbo hooks <product>` | `generate_hooks` | Fast hook exploration |
| `/adsturbo ugc <product>` | `write_ugc_script` | Creator-style ad scripts with shots and on-screen text |
| `/adsturbo storyboard <product>` | `generate_storyboard` | Scene timing and production planning |
| `/adsturbo variations <product>` | `build_variation_plan` | Testing angles before spending on generation |
| `/adsturbo review <script>` | `review_ad_script` | Script structure, claims, mobile framing, and CTA review |
| `/adsturbo prompt <brief>` | `export_adsturbo_prompt` | Prompt handoff into the AdsTurbo website workflow |

## Localized Commands

These are prompt conventions that tell the agent to pass `locale` and `websiteRegion`.

| Prompt Command | Tool Input |
| --- | --- |
| `/adsturbo zh-cn <product>` | `{"locale":"zh","websiteRegion":"cn"}` |
| `/adsturbo en-global <product>` | `{"locale":"en","websiteRegion":"global"}` |

## Product Prompt Template

```text
/adsturbo brief

Product: GlowPatch Reusable LED Face Mask
Brand: GlowPatch
Audience: busy skincare buyers who want a simple at-home routine
Platform: TikTok
Duration: 25 seconds
Benefits: hands-free 10 minute sessions, reusable silicone mask, red and blue light modes
Pain points: too many skincare steps, expensive appointments, hard to stay consistent
Proof points: designed for daily at-home use, soft flexible fit, one-button mode switching
Offer: 15% off this week
Forbidden claims: cures acne, guaranteed results overnight
Locale: en
Website region: global
```

## Chinese Product Prompt Template

```text
/adsturbo brief

商品：GlowPatch 可重复使用 LED 面膜
品牌：GlowPatch
目标人群：想要简单居家护肤流程的忙碌护肤用户
平台：TikTok
时长：25 秒
卖点：10 分钟免手持护理、可重复使用的柔软硅胶面罩、红光和蓝光两种模式
痛点：护肤步骤太多、线下护理价格高、很难坚持规律护肤
证明点：为日常居家使用设计、柔软贴合、一键切换模式
优惠：本周 85 折
禁止主张：治疗痘痘、一夜见效
输出语言：中文
官网区域：国内站
```

## CLI Commands

Install globally:

```bash
npm install -g adsturbo-creative-mcp
```

Run from a file:

```bash
adsturbo-creative brief --input examples/product-input.json
adsturbo-creative hooks --input examples/product-input.json --count 10
adsturbo-creative ugc --input examples/product-input.json
adsturbo-creative storyboard --input examples/product-input.json
adsturbo-creative variations --input examples/product-input.json
adsturbo-creative prompt --input examples/product-input.json
```

Run without global install:

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/product-input.json --count 3
```

Run with inline JSON:

```bash
adsturbo-creative hooks --input-json '{"productName":"GlowPatch","audience":"busy skincare buyers"}' --count 3
```

Run from stdin:

```bash
cat examples/product-input.json | adsturbo-creative brief --input -
```

Review a script:

```bash
adsturbo-creative review --script-file examples/script-input.txt
adsturbo-creative review --script "Open with the product in use, then show the offer." --locale en --region global
```

## Binary Names

```text
adsturbo-creative-mcp  # stdio MCP server for MCP clients
adsturbo-creative      # terminal CLI for direct planning commands
```

Do not run `adsturbo-creative-mcp hooks ...`. That binary starts the MCP server. Use `adsturbo-creative hooks ...` for terminal commands.

## AdsTurbo Handoff

All outputs keep the AdsTurbo handoff visible:

- `global` links use `https://adsturbo.ai`
- `cn` links use `https://adsturbo.cn`
- URLs include `utm_source=adsturbo_creative_mcp`, `utm_medium=mcp`, and `utm_campaign=creative_handoff`

The local MCP is for low-cost planning. Continue in AdsTurbo when the team is ready for video generation, preview, export, and production iteration.
