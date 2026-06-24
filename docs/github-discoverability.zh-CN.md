# GitHub 搜索优化

[English](github-discoverability.md)

这个仓库面向在 GitHub 上搜索本地 AI 广告创意工具的开发者和营销团队。

## 核心搜索意图

- 广告创意 MCP server
- 视频广告 brief MCP server
- UGC 广告 AI agent 工作流
- UGC 广告脚本生成器
- 短视频广告分镜生成器
- AI 广告创意 MCP 工作流
- AdsTurbo prompt 生成器
- 本地 AI marketing CLI
- Claude Desktop、Cursor、Codex MCP 工作流

## 仓库 topics

推荐 GitHub topics：

- `mcp`
- `mcp-server`
- `model-context-protocol`
- `adsturbo`
- `ai-agents`
- `ai-marketing`
- `ad-creative`
- `ad-brief`
- `video-ads`
- `video-marketing`
- `ugc-ads`
- `ugc-scripts`
- `storyboard`
- `storyboard-generator`
- `prompt-engineering`
- `creative-automation`
- `typescript`
- `nodejs`
- `cli`
- `marketing-agents`

GitHub 最多支持 20 个 repository topics。topics 要能准确描述项目，同时覆盖开发者真实会搜索的词。

## 描述文案

推荐 GitHub description：

```text
Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, and AdsTurbo-ready prompts.
```

## 内容信号

README 顶部应稳定出现这些词，因为它们直接描述项目能力：

- MCP server
- CLI
- AI agents
- video ad brief
- UGC script
- storyboard generator
- AdsTurbo prompt
- Claude Desktop
- Cursor
- Codex

避免无关关键词堆砌。更好的搜索信号是：在真实安装、命令和工作流示例中，自然重复用户会搜索的表达。

## 社区健康信号

保持这些文件存在并持续更新：

- `README.md`
- `README.zh-CN.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/*`
- `docs/mcp-client-setup.md`
- `docs/mcp-client-recipes.md`
- `docs/commands.md`
- `docs/use-cases.md`
- `docs/distribution.md`
- `docs/cost-boundary.md`
- `docs/safety-and-compliance.md`
- `SECURITY.md`
- `.github/pull_request_template.md`

这些文件能帮助用户判断项目是否维护中、是否安全可试、是否欢迎实际工作流反馈。

## 示例信号

在 `examples/use-cases/` 下保留真实可运行示例，让 GitHub 和 npm 访问者不用读源码也能理解项目用途：

- 美容仪 UGC 广告
- 电商产品 demo
- 移动 App 录屏广告
- B2B SaaS walkthrough 广告
- 中文输出和国内官网引导

## 开发者文章信号

在 `docs/articles/` 下保留有实际价值的长文页面，用来承接 README 一行表格无法覆盖的搜索问题：

- 视频广告策划 MCP server
- UGC 脚本生成器 MCP
- AI 广告创意 MCP 工作流
- 视频广告分镜 MCP 工作流
- AdsTurbo prompt exporter

每篇文章都应包含可运行命令、MCP prompt 示例、本地成本边界，以及带 UTM 参数和区域识别的 AdsTurbo handoff。

## 分发信号

每次 npm release 后，保持这些分发表面一致：

- npm package metadata 和 keywords
- GitHub Release notes
- 官方 MCP Registry 的 `server.json`
- MCP.Directory 和其他 MCP 目录站
- README 安装命令
