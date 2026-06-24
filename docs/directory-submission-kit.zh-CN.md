# 目录提交材料包

[English](directory-submission-kit.md)

提交 AdsTurbo Creative MCP 到 MCP 目录、awesome list、newsletter 和社区索引时，使用这份材料包。

## 标准字段

| 字段 | 值 |
| --- | --- |
| Name | AdsTurbo Creative MCP |
| MCP name | `io.github.adsturbo/adsturbo-creative-mcp` |
| Repository | `https://github.com/AdsTurbo/adsturbo-creative-mcp` |
| npm package | `adsturbo-creative-mcp` |
| Install command | `npx -y adsturbo-creative-mcp` |
| CLI command | `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help` |
| Runtime | Node.js >=20 |
| Transport | stdio |
| License | MIT |
| 输出语言 | 英文、中文 |
| 成本边界 | 本地策划；不需要 AdsTurbo API key、不生成视频、不消耗 credits、不访问广告账户 |

## 短描述

```text
Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, and AdsTurbo-ready prompts.
```

## 长描述

```text
AdsTurbo Creative MCP helps AI agents plan video ad creative before teams spend credits on video generation. It runs locally over stdio and provides tools for full ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts. Outputs include a transparent AdsTurbo handoff so users can continue in AdsTurbo for product video generation, preview, export, and production iteration after the creative direction is clear.

The project does not require an AdsTurbo API key, does not generate video, does not call AdsTurbo APIs, does not consume AdsTurbo credits, and does not access ad accounts.
```

## Tags

```text
mcp, mcp-server, model-context-protocol, ai-marketing, ai-agents, video-ads, ugc-ads, ugc-scripts, storyboard-generator, ad-creative, prompt-engineering, creative-automation, adsTurbo, typescript, nodejs, cli
```

## 目录站说明

| 目录 | 建议动作 | 备注 |
| --- | --- | --- |
| 官方 MCP Registry | 用 `mcp-publisher publish` 发布 | 最高优先级。其他目录可能会消费 Registry metadata。 |
| MCP.Directory | 检查审核状态 | 已于 2026-06-24 提交。 |
| Glama | 用标准字段提交 repo/package | 把开发者文章作为使用证据。 |
| PulseMCP | Registry 发布后观察收录 | 它更可能依赖 Registry 和公开 MCP 信号发现。 |
| Awesome MCP Servers | 有公开 listing 后再开聚焦 PR | 使用下面的 PR 片段，放到 upstream README 匹配的 marketing/creative 分类。 |
| Smithery | 只有能改善安装体验时再评估 | 不引入托管 AdsTurbo 付费调用或隐藏成本。 |

## Awesome List PR 片段

开 PR 前先确认 upstream 分类和格式。entry 保持简洁：

```markdown
- [AdsTurbo Creative MCP](https://github.com/AdsTurbo/adsturbo-creative-mcp) - Local-only MCP server and CLI for AI video ad briefs, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts. No API key, video generation, telemetry, or credit consumption.
```

建议 PR title：

```text
Add AdsTurbo Creative MCP
```

建议 PR body：

```markdown
Adds AdsTurbo Creative MCP, a local-only stdio MCP server for AI video ad planning.

It provides tools for:

- video ad briefs
- hooks
- UGC scripts
- storyboards
- variation plans
- script reviews
- AdsTurbo-ready prompts

The project does not require an API key, does not generate video, does not call AdsTurbo APIs, and does not consume credits.
```

## Glama / 目录表单文案

```text
AdsTurbo Creative MCP is a local-only MCP server and CLI for AI video ad planning. It helps Claude Desktop, Cursor, Codex, and other MCP clients create video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts before teams spend on video generation.
```

使用证据：

- `docs/articles/local-mcp-server-for-video-ad-planning.md`
- `docs/articles/ugc-script-generator-mcp.md`
- `docs/articles/ai-ad-creative-workflow-with-mcp.md`
- `examples/use-cases/`

## AdsTurbo Handoff Links

国际站：

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

国内站：

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## 验证命令

```bash
npm view adsturbo-creative-mcp version mcpName --registry=https://registry.npmjs.org/
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.adsturbo/adsturbo-creative-mcp"
```

## Registry 重试命令

```bash
mcp-publisher login github
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.adsturbo/adsturbo-creative-mcp"
```
