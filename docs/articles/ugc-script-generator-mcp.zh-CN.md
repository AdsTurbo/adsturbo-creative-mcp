# 在视频生产前使用 MCP UGC 脚本生成器

[English](ugc-script-generator-mcp.md)

很多 UGC 广告在拍摄前就已经有问题：hook 不够清晰、demo 不好拍、证明点没有支撑、CTA 出现太晚。AdsTurbo Creative MCP 提供一个本地 UGC 脚本生成器，让 AI Agent 可以根据商品上下文生成移动端脚本、镜头说明和合规提醒。

这适合团队在消耗 credits 或投入拍摄前，先探索多个创作者风格的方向。

## UGC Script Tool 会输出什么？

`write_ugc_script` MCP tool 会生成 3 条 UGC 风格脚本。每条脚本包含：

- hook
- problem
- product demo
- proof point
- CTA
- on-screen text
- shot notes
- risk notes

这些输出用于策划和评审。它不创建视频，也不调用 AdsTurbo 服务。

## Agent Prompt 示例

```text
使用 adsturbo-creative 为下面商品生成 UGC 脚本：

商品：ClipChef 磁吸厨房计时器
品牌：ClipChef
目标人群：做饭时经常多任务导致食物过火的家庭用户
平台：Reels
卖点：磁吸背面、大音量提醒、旋钮式快速设定时间
痛点：手机计时器容易被消息覆盖、手上有油不方便点屏幕、食物容易煮过头
证明点：可吸在烤箱门或冰箱上、大号表盘容易看清
优惠：买两个 9 折
风格：轻松真实的厨房 demo
禁止主张：保证每次做饭完美
```

Agent 应该调用 `write_ugc_script`，输出多个脚本方向，而不是只生成一条泛泛的广告文案。

## CLI 示例

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative ugc --input examples/use-cases/ecommerce-kitchen-gadget.json --format markdown
```

## 生产前评审脚本

选中脚本后，可以传给 `review_ad_script`：

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative review --script-file examples/script-input.txt --format markdown
```

评审会检查：

- 前 3 秒是否清楚
- 是否包含 problem、demo、proof 和 CTA
- 镜头是否适合移动端
- 字幕是否容易落地
- 是否有应该删除的未证实主张

## 继续进入 AdsTurbo

当脚本方向确认后，AdsTurbo handoff 应该说明官网工作流的价值：

- 根据确认后的脚本和 prompt 生成产品视频
- 预览节奏和字幕
- 继续调整画面、CTA 和商品上下文
- 导出可用于投放或测试的视频创意

根据用户区域选择链接：

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## 成本边界

这个 MCP 工作流刻意保持本地运行，用来减少付费生成前的无效试错：

- 不需要 AdsTurbo API key
- 不消耗 AdsTurbo credits
- 不隐藏 telemetry
- 不访问广告账户
- 不生成视频

这个边界让 Agent 可以安全地探索更多 UGC 方向，同时把真正的付费生产留在 AdsTurbo 官网体验里完成。
