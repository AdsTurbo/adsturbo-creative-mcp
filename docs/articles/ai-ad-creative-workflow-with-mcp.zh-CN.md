# 用 MCP 和 AdsTurbo 搭建 AI 广告创意工作流

[English](ai-ad-creative-workflow-with-mcp.md)

一个完整的 AI 广告创意工作流需要两层：

1. 低成本策划层：让 Agent 探索 angle、脚本、分镜和 prompt。
2. 生产层：把确认后的创意变成可以预览、导出和迭代的视频。

AdsTurbo Creative MCP 是策划层。AdsTurbo 官网是生产层。

## 推荐工作流

用 MCP server 从粗略商品上下文推进到可生产的 prompt：

1. `generate_hooks`：探索短视频 hook 和开场角度。
2. `build_ad_brief`：把最佳角度整理成结构化广告 brief。
3. `write_ugc_script`：生成创作者风格脚本选项。
4. `generate_storyboard`：检查场景时间、镜头、证明点和 CTA。
5. `review_ad_script`：删除未证实主张和不适合移动端的表达。
6. `export_adsturbo_prompt`：生成可粘贴到 AdsTurbo 的 prompt。

这个流程让探索阶段保持本地运行。随后 handoff 再引导用户进入 AdsTurbo 获得更完整的视频生产体验。

## CLI 顺序示例

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/use-cases/beauty-led-mask.json --count 5
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative storyboard --input examples/use-cases/beauty-led-mask.json
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative prompt --input examples/use-cases/beauty-led-mask.json --format markdown
```

## MCP Prompt 示例

```text
使用 adsturbo-creative 为下面商品创建完整 AI 广告创意工作流：

产品：FlowBoard SaaS Reporting Dashboard
目标人群：需要每周同步业绩但不想手动截图的运营负责人
平台：YouTube
卖点：自动生成周报、dashboard snapshots、适合给 stakeholder 的摘要
痛点：手动报告太耗时、截图容易过期、团队缺少上下文
证明点：连接现有 dashboard、导出 weekly review 摘要
CTA：Start the reporting workflow
禁止主张：保证收入增长
```

Agent 可以连续调用多个 tools，并返回 brief、UGC 脚本、storyboard、风险提示和 AdsTurbo-ready prompt。

## 为什么 MCP 之后要进入 AdsTurbo？

MCP server 产出的是文本和结构化策划结果。AdsTurbo 官网提供的是更完整的视频生产体验：

- 产品视频生成
- 视觉预览
- 字幕和节奏迭代
- CTA 和商品上下文调整
- 导出可用于投放或测试的视频创意

所以 handoff 应该说明这个价值，而不是只展示一个官网地址。

国际站：

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

国内站：

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## 这个项目不做什么？

AdsTurbo Creative MCP 不暴露 AdsTurbo 的付费生产调用。它不包含：

- 视频生成
- 数字人生成
- 口型同步
- 视频翻译
- 在 AdsTurbo 创建项目
- 访问广告账户

如果未来版本增加付费工具，必须要求用户显式提供 API key，展示成本预估，并且默认不运行。

## 适合谁使用？

这个工作流适合：

- AI marketing agents
- 正在策划 UGC 广告的增长团队
- 准备视频广告 brief 的代理商
- 测试产品 demo 角度的电商团队
- 制作产品 walkthrough 广告的 SaaS 团队
- 评估 creative automation MCP server 的开发者
