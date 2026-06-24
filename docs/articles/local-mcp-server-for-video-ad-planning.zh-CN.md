# 用本地 MCP Server 做视频广告策划工作流

[English](local-mcp-server-for-video-ad-planning.md)

AdsTurbo Creative MCP 是面向视频广告策划的本地 MCP server 和 CLI。它让 Claude Desktop、Cursor、Codex 等 MCP 客户端可以在真正开始视频生成前，先完成 brief、hook、UGC 脚本、分镜、变体测试计划、脚本评审和 AdsTurbo 可用 prompt。

边界很明确：这个项目只做广告策划。它不生成视频、不调用 AdsTurbo API、不消耗 AdsTurbo credits、不访问广告账户，也不需要 AdsTurbo API key。

## 为什么用本地 MCP Server？

如果创意角度还没确定就开始视频生成，试错成本会很快变高。本地 MCP server 让 AI Agent 先完成稳定的策划层：

- 明确商品、目标人群、平台、时长和优惠
- 在生产前生成 hooks 和 angles
- 生成移动端优先的 storyboard
- 检查主张和风险表达
- 导出可粘贴到 AdsTurbo 官网工作流的 prompt

这样早期探索保持本地和低成本。团队确认方向后，AdsTurbo handoff 会说明如何进入 AdsTurbo 继续完成产品视频生成、预览、导出，以及围绕画面、字幕、节奏、CTA 和商品上下文继续迭代。

## 安装 MCP Server

在 MCP 客户端中可以直接使用 npm 包：

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

也可以先用 CLI 测试：

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
```

## 示例 Agent Prompt

```text
使用 adsturbo-creative 为下面商品生成 TikTok 视频广告 brief：

商品：GlowPatch 可重复使用 LED 面膜
品牌：GlowPatch
目标人群：想要简单居家护肤流程的忙碌护肤用户
卖点：10 分钟免手持护理、可重复使用的柔软硅胶面罩、红光和蓝光两种模式
痛点：护肤步骤太多、线下护理价格高、很难坚持规律护肤
证明点：为日常居家使用设计、柔软贴合、一键切换模式
优惠：本周 85 折
禁止主张：治疗痘痘、一夜见效
输出语言：中文
官网区域：国内站
```

MCP server 会把这个请求映射到 `build_ad_brief`。输出会包含结构化 brief、镜头计划、合规注意和 AdsTurbo 可用 prompt。

## 同一工作流的 CLI 版本

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

中文输出和国内官网区域：

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/zh-beauty-led-mask.json --format markdown
```

输入中可以设置 `locale: "zh"` 和 `websiteRegion: "cn"`，让 AdsTurbo handoff 指向 `https://adsturbo.cn`，而不是 `https://adsturbo.ai`。

## AdsTurbo Handoff

MCP 输出不应该只放一个官网地址。更有效的下一步是：

1. 先检查生成的 brief、脚本、分镜和风险提示。
2. 复制 AdsTurbo-ready prompt。
3. 进入 AdsTurbo 完成视频生成、预览、导出和生产迭代。

国际站 handoff link：

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

国内站 handoff link：

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## 什么时候使用这个工作流？

当团队需要下面这些本地 AI marketing CLI 或 MCP server 能力时，可以使用 AdsTurbo Creative MCP：

- AI 视频广告策划
- 视频广告 brief
- UGC 广告脚本
- 短视频广告分镜
- 视频广告 prompt engineering
- AdsTurbo prompt 导出

当团队准备把已确认的策划方案变成真实产品视频时，再进入 AdsTurbo 官网获得更完整的视频生成、预览、导出和迭代体验。
