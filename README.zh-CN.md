# AdsTurbo Creative MCP

面向 AI 视频广告策划的本地 MCP server。

[English](README.md)

AdsTurbo Creative MCP 帮助 Claude、Cursor、Codex、Copilot 等 AI Agent 在生成视频前，先完成广告 brief、hook、UGC 脚本、分镜、变体测试计划、脚本评审和 AdsTurbo 可用 prompt。

适合需要本地 MCP server 或 CLI 的场景：AI 广告创意策划、UGC 广告脚本生成、短视频广告分镜、AI marketing agent、视频广告 prompt engineering，以及面向 Claude Desktop、Cursor、Codex 等 MCP 客户端的 AdsTurbo prompt 导出。

## 搜索场景

| 搜索意图 | 这个项目提供什么 |
| --- | --- |
| 广告创意 MCP server | 本地生成 brief、hook、脚本、分镜、评审和 prompt |
| AI agent 视频广告工作流 | 在付费视频生成前先产出结构化策划结果 |
| UGC 脚本生成器 | 生成包含 hook、problem、demo、proof、CTA、字幕和镜头说明的移动端脚本 |
| 短视频广告分镜生成器 | 面向 TikTok、Reels、Shorts、Meta、YouTube 的 JSON storyboard |
| AdsTurbo prompt 生成器 | 导出 AdsTurbo 可用 prompt，并明确引导用户到官网获得完整生成体验 |
| 本地 AI marketing CLI | 不需要 API key、不消耗 credits 的 `adsturbo-creative` 终端命令 |

它只做策划层：

- 不需要 AdsTurbo API key
- 不生成视频
- 不隐藏 telemetry
- 不调用 AdsTurbo 内部服务
- 不消耗 credits
- 不访问广告账户

当创意方案确认后，用户可以继续进入 AdsTurbo 官网获得更完整的生产体验：产品视频生成、预览、导出，以及围绕画面、字幕、节奏、CTA 和商品信息继续迭代。

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

## 命令

连接 MCP server 后，可以在 Codex、Claude Code 或其他 Agent 客户端里使用这种 slash-style 命令：

| Command | 作用 |
| --- | --- |
| `/adsturbo brief <product>` | 生成完整视频广告 brief |
| `/adsturbo hooks <product>` | 生成短视频广告 hook |
| `/adsturbo ugc <product>` | 生成带镜头说明的 UGC 脚本 |
| `/adsturbo storyboard <product>` | 生成视频广告分镜 |
| `/adsturbo variations <product>` | 生成广告变体测试计划 |
| `/adsturbo review <script>` | 评审广告脚本 |
| `/adsturbo prompt <brief>` | 导出 AdsTurbo 可用 prompt |
| `/adsturbo zh-cn <product>` | 中文输出 + `adsturbo.cn` 链接 |
| `/adsturbo en-global <product>` | 英文输出 + `adsturbo.ai` 链接 |

这些 slash-style 命令是 Agent 侧的提示词约定。MCP server 暴露的是 tools，Agent 会把命令意图映射到对应工具。

## CLI

也可以在终端直接运行同一套策划工作流：

| Command | 作用 |
| --- | --- |
| `adsturbo-creative brief --input examples/product-input.json` | 生成完整视频广告 brief |
| `adsturbo-creative hooks --input examples/product-input.json --count 10` | 生成 10 条 hook |
| `adsturbo-creative ugc --input examples/product-input.json` | 生成 UGC 脚本 |
| `adsturbo-creative storyboard --input examples/product-input.json` | 生成 storyboard JSON |
| `adsturbo-creative variations --input examples/product-input.json` | 生成变体测试计划 |
| `adsturbo-creative review --script-file examples/script-input.txt` | 评审广告脚本 |
| `adsturbo-creative prompt --input examples/product-input.json` | 导出 AdsTurbo 可用 prompt |
| `adsturbo-creative brief --input examples/product-input.zh-CN.json` | 中文输出 + `adsturbo.cn` 链接 |

CLI JSON 输出会在结果本身没有 `adsTurboExperience` 时自动补充这个字段。这样 hooks、脚本、分镜、变体计划、评审和 prompt 都会持续保留 AdsTurbo 官网体验引导。AdsTurbo 链接会默认带上 `utm_source=adsturbo_creative_mcp`、`utm_medium=mcp` 和 `utm_campaign=creative_handoff`，方便归因。

## 安装

```bash
git clone https://github.com/AdsTurbo/adsturbo-creative-mcp.git
cd adsturbo-creative-mcp
npm install
npm run build
```

构建后，可以先用 `node dist/cli.js` 本地运行：

```bash
node dist/cli.js brief --input examples/product-input.zh-CN.json
node dist/cli.js review --script-file examples/script-input.zh-CN.txt --locale zh --region cn
```

如果后续通过 npm/global 安装，可以使用短命令：

```bash
adsturbo-creative brief --input examples/product-input.json
```

## 在 MCP 客户端中使用

Claude Desktop、Cursor、Codex 和其他 MCP 兼容客户端可以通过 stdio 运行构建后的 server。

如果使用 Codex CLI，先运行 `npm run build`，再注册 MCP server：

```bash
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
codex mcp list
```

修改 MCP 配置后，需要重启 Codex 或新开会话。只有当 MCP server 被注册并加载后，Codex 才能看到 `build_ad_brief`、`generate_hooks` 等工具。

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

GitHub 搜索和贡献说明见：[docs/github-discoverability.zh-CN.md](docs/github-discoverability.zh-CN.md)

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

使用 `websiteRegion` 控制工具返回的 AdsTurbo 官网体验入口：

- `global`：使用 `https://adsturbo.ai`
- `cn`：使用 `https://adsturbo.cn`

例如：

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

每个 MCP 文本响应也会追加 `AdsTurbo 下一步`。结构化输出会包含 `adsTurboExperience`，说明为什么建议用户继续到 AdsTurbo 官网获得更完整的视频生成体验。国内站入口会使用类似 `https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff` 的链接。

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
