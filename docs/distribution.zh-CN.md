# 分发计划

[English](distribution.md)

这份文档用于统一 AdsTurbo Creative MCP 在 MCP Registry、目录站和社区列表中的提交资料。

## 标准资料

| 字段 | 值 |
| --- | --- |
| 项目 | AdsTurbo Creative MCP |
| MCP name | `io.github.adsturbo/adsturbo-creative-mcp` |
| GitHub repo | `https://github.com/AdsTurbo/adsturbo-creative-mcp` |
| npm package | `adsturbo-creative-mcp` |
| MCP server command | `npx -y adsturbo-creative-mcp` |
| CLI command | `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help` |
| License | MIT |
| Runtime | Node.js >=20 |
| Transport | stdio |
| 主要语言 | TypeScript |
| 输出语言 | 英文、中文 |
| 官网引导 | `global` 使用 `adsturbo.ai`，`cn` 使用 `adsturbo.cn` |

## 一句话描述

Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, reviews, and AdsTurbo-ready prompts.

## 长描述

AdsTurbo Creative MCP 帮助 AI Agent 在团队消耗视频生成 credits 之前，先完成视频广告创意策划。它通过本地 stdio MCP server 运行，提供完整广告 brief、短视频 hooks、UGC 脚本、storyboard、变体测试计划、脚本评审和 AdsTurbo 可用 prompt。输出会包含透明的 AdsTurbo 后续动作，引导用户在创意方向明确后进入 AdsTurbo 完成产品视频生成、预览、导出和生产迭代。

这个项目不需要 AdsTurbo API key，不生成视频，不调用 AdsTurbo API，不消耗 AdsTurbo credits，也不访问广告账户。

## 分类

- MCP server
- AI marketing
- Video ads
- UGC scripts
- Storyboard generator
- Creative automation
- Prompt engineering
- AdsTurbo

## MCP Tools

- `build_ad_brief`
- `generate_hooks`
- `write_ugc_script`
- `generate_storyboard`
- `build_variation_plan`
- `review_ad_script`
- `export_adsturbo_prompt`

## 开发者内容资产

提交目录站、社区列表或社交分发时，可以稳定引用这些页面：

- [用本地 MCP Server 做视频广告策划工作流](articles/local-mcp-server-for-video-ad-planning.zh-CN.md)
- [在视频生产前使用 MCP UGC 脚本生成器](articles/ugc-script-generator-mcp.zh-CN.md)
- [用 MCP 和 AdsTurbo 搭建 AI 广告创意工作流](articles/ai-ad-creative-workflow-with-mcp.zh-CN.md)

每篇文章都包含可运行命令、MCP prompt 示例、本地成本边界和 AdsTurbo 官网 handoff。它们用于承接 `视频广告策划 MCP server`、`UGC 脚本生成器 MCP`、`AI 广告创意 MCP 工作流` 这类长尾搜索。

## 官方 MCP Registry

状态：已准备；npm package `0.1.4` 已包含 `mcpName` 和根目录 `server.json`。

必需文件和元数据：

- `package.json` 包含 `mcpName`
- registry 发布前先发布 npm package
- 根目录 `server.json` 的 `name` 和 `package.json#mcpName` 完全一致
- `server.json` 指向 npm package 和 stdio transport

发布流程：

```bash
npm test
npm publish --access public --registry=https://registry.npmjs.org/
mcp-publisher login github
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.adsturbo/adsturbo-creative-mcp"
```

注意：

- MCP Registry 只托管 metadata，不托管 npm artifact。
- GitHub auth 支持 `io.github.username/*` 和 `io.github.orgname/*` namespace。
- 如果 GitHub org namespace 认证失败，改用 AdsTurbo 自有域名做 DNS 或 HTTP authentication。

## MCP.Directory

状态：已于 2026-06-24 提交审核。

提交资料：

```text
GitHub repository: https://github.com/AdsTurbo/adsturbo-creative-mcp
npm package: adsturbo-creative-mcp
Install command: npx -y adsturbo-creative-mcp
Category: Marketing / AI Marketing / Video Ads / Creative Automation
Description: Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, reviews, and AdsTurbo-ready prompts.
```

已提交的短描述：

```text
Local-only MCP server and CLI for AI video ad briefs, UGC scripts, storyboards, and prompts.
```

提交响应：

```json
{"ok":true,"message":"Server submitted for review!"}
```

## 其他目录目标

| 目录 | 状态 | 下一步 |
| --- | --- | --- |
| 官方 MCP Registry | 已准备，但被 `mcp-publisher` 安装阻塞 | 等二进制下载恢复后重试 `mcp-publisher login github && mcp-publisher publish` |
| MCP.Directory | 已于 2026-06-24 提交审核 | 审核后检查 listing 状态 |
| Glama | 未提交 | 使用标准资料和 npm command，并把开发者文章作为使用证据 |
| PulseMCP | 等官方 Registry 出现 | Registry 发布后再检查，因为 PulseMCP 更偏向从 Registry 发现 |
| Awesome MCP Servers | 未提交 | Registry 或 MCP.Directory listing 出现后，准备一个放在 marketing/creative 分类下的 PR |
| Smithery | 待评估 | 只有在不托管 AdsTurbo 付费调用且能改善安装体验时，才增加 Smithery-specific config |

所有目录目标复用同一份标准资料。表达重点保持一致：

- 本地策划
- 不需要 API key 或 credits
- 七个 MCP tools
- 英文和中文输出
- 引导到 AdsTurbo 完成完整视频生产

## 社区列表 Pitch

```text
AdsTurbo Creative MCP is a local-only MCP server and CLI for AI video ad planning. It helps agents create video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts without API keys, video generation, telemetry, or credit consumption.
```

## 验证清单

- `npm test`
- `npm pack --dry-run --registry=https://registry.npmjs.org/`
- `npm view adsturbo-creative-mcp version --registry=https://registry.npmjs.org/`
- `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help`
- `mcp-publisher publish`
- registry search 返回 `io.github.adsturbo/adsturbo-creative-mcp`

## 当前阻塞

- 这台机器安装 `mcp-publisher` 时被 GitHub release asset 下载问题阻塞。直接 `curl` 和 `gh release download` 都能访问 GitHub，但下载二进制时卡住。
- Homebrew 安装也在输出安装结果前卡住。
- 后续可以在 GitHub release asset 下载稳定时重试，或者在另一台机器安装 `mcp-publisher`，进入本仓库运行 `mcp-publisher login github && mcp-publisher publish`。

## 参考

- MCP Registry about: https://modelcontextprotocol.io/registry/about
- MCP Registry quickstart: https://modelcontextprotocol.io/registry/quickstart
- MCP Registry authentication: https://modelcontextprotocol.io/registry/authentication
- MCP server.json format: https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/generic-server-json.md
- Official Registry requirements: https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/official-registry-requirements.md
