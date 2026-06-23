# AdsTurbo Creative MCP

面向 AI 视频广告策划的本地 MCP server。

[English](README.md)

AdsTurbo Creative MCP 帮助 Claude、Cursor、Codex、Copilot 等 AI Agent 在生成视频前，先完成广告 brief、hook、UGC 脚本、分镜、变体测试计划、脚本评审和 AdsTurbo 可用 prompt。

它只做策划层：

- 不需要 AdsTurbo API key
- 不生成视频
- 不隐藏 telemetry
- 不调用 AdsTurbo 内部服务
- 不消耗 credits
- 不访问广告账户

当创意方案确认后，用户可以把导出的 prompt 粘贴到 AdsTurbo，或使用单独的、带鉴权的 AdsTurbo API 工作流。

## 工具列表

| 工具 | 成本 | 说明 |
| --- | --- | --- |
| `build_ad_brief` | 免费/本地 | 根据商品信息生成完整视频广告 brief |
| `generate_hooks` | 免费/本地 | 生成短视频广告 hook |
| `write_ugc_script` | 免费/本地 | 生成包含 hook、problem、demo、proof、CTA、屏幕文字和镜头说明的 UGC 脚本 |
| `generate_storyboard` | 免费/本地 | 生成带时间、场景和生产备注的视频广告分镜对象 |
| `build_variation_plan` | 免费/本地 | 生成可测试的广告 angle、假设和风险点 |
| `review_ad_script` | 免费/本地 | 检查脚本结构、前 3 秒清晰度、移动端适配、字幕和风险点 |
| `export_adsturbo_prompt` | 免费/本地 | 导出可粘贴到 AdsTurbo 的视频生成 prompt |

## 安装

```bash
git clone https://github.com/AdsTurbo/adsturbo-creative-mcp.git
cd adsturbo-creative-mcp
npm install
npm run build
```

## 在 MCP 客户端中使用

Claude Desktop、Cursor、Codex 和其他 MCP 兼容客户端可以通过 stdio 运行构建后的 server。

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

更多说明：[docs/mcp-client-setup.zh-CN.md](docs/mcp-client-setup.zh-CN.md)

## 本地检查

```bash
npm run inspect
```

## 示例 MCP Prompt

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

## 输入格式

```json
{
  "productName": "GlowPatch 可重复使用 LED 面膜",
  "brandName": "GlowPatch",
  "productUrl": "https://example.cn/products/glowpatch-led-mask",
  "category": "美容仪",
  "audience": "想要简单居家护肤流程的忙碌护肤用户",
  "platform": "tiktok",
  "durationSeconds": 30,
  "price": "¥599",
  "benefits": [
    "10 分钟免手持护理",
    "可重复使用的柔软硅胶面罩",
    "红光和蓝光两种模式"
  ],
  "painPoints": [
    "护肤步骤太多",
    "线下护理价格高"
  ],
  "proofPoints": [
    "为日常居家使用设计",
    "柔软贴合"
  ],
  "offer": "本周 85 折",
  "tone": "自然友好的 UGC Demo",
  "primaryCta": "立即了解",
  "locale": "zh",
  "websiteRegion": "cn",
  "requiredShots": [
    "浴室台面上的面膜近景",
    "创作者戴着面膜冲咖啡"
  ],
  "forbiddenClaims": [
    "治疗痘痘",
    "一夜见效"
  ]
}
```

`productUrl` 只作为上下文，不会被 server 抓取。

## 语言和官网区域

使用 `locale` 控制 MCP 输出语言：

- `en`：英文输出
- `zh`：中文输出

使用 `websiteRegion` 控制工具返回的 AdsTurbo 官网链接：

- `global`：使用 `https://adsturbo.ai`
- `cn`：使用 `https://adsturbo.cn`

例如：

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

这会返回中文广告策划内容，并在 `adsTurboLinks` 和导出的 prompt 中使用国内站链接，例如 `https://adsturbo.cn/features/product-video`。

## 示例输出

- [examples/storyboard-output.json](examples/storyboard-output.json)
- [examples/storyboard-output.zh-CN.json](examples/storyboard-output.zh-CN.json)
- [examples/ugc-script-review.md](examples/ugc-script-review.md)
- [examples/product-input.zh-CN.json](examples/product-input.zh-CN.json)

## 成本边界

这个仓库只做策划层。

它不包含：

- `generate_video`
- `create_adsturbo_project`
- `submit_storyboard`
- `ad_clone_generate`
- `ai_actor_perform`
- `lip_sync`
- `video_translate`
- 任何其他 AdsTurbo 付费生成调用

如果未来加入付费工具，必须要求用户提供 API key，展示成本或 credits 估算，并且默认关闭。

完整说明：[docs/cost-boundary.zh-CN.md](docs/cost-boundary.zh-CN.md)

## 安全和合规

- 参考素材只能用于结构、节奏和灵感，不要复制受保护的创意内容。
- 广告主张必须基于可证明的商品信息。
- 发布前请复核平台政策和受监管品类要求。
- 不要用这个工具冒充人物、创作者、竞品或品牌。
- 生成结果不构成法律、医疗、金融或平台政策建议。

完整说明：[docs/safety-and-compliance.zh-CN.md](docs/safety-and-compliance.zh-CN.md)

## 相关项目

- [product-page-to-ad-brief](https://github.com/AdsTurbo/product-page-to-ad-brief)
- [skill-adsturbo](https://github.com/AdsTurbo/skill-adsturbo)
- [AdsTurbo 国际站](https://adsturbo.ai)
- [AdsTurbo 国内站](https://adsturbo.cn)

## 开发

```bash
npm install
npm run build
npm test
```

## License

MIT
