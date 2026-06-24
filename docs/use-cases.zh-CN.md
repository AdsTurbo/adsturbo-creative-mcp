# 使用场景

[English](use-cases.md)

这些示例展示 AdsTurbo Creative MCP 在常见 AI 广告创意策划工作流中的用法。它们都是本地输入，可用于生成 brief、hook、UGC 脚本、分镜、变体测试计划、脚本评审和 AdsTurbo 可用 prompt。

## 示例输入

| 文件 | 品类 | 平台 | 适合场景 |
| --- | --- | --- | --- |
| [beauty-led-mask.json](../examples/use-cases/beauty-led-mask.json) | 美容仪 | TikTok | UGC 护肤演示和合规主张 |
| [ecommerce-kitchen-gadget.json](../examples/use-cases/ecommerce-kitchen-gadget.json) | 电商商品 | Reels | 快节奏产品 demo 和视觉证明 |
| [mobile-app-language-learning.json](../examples/use-cases/mobile-app-language-learning.json) | 移动 App | Shorts | 以录屏为主的 App 广告 |
| [saas-reporting-dashboard.json](../examples/use-cases/saas-reporting-dashboard.json) | B2B SaaS | YouTube | 面向企业买家的产品 walkthrough |
| [zh-beauty-led-mask.json](../examples/use-cases/zh-beauty-led-mask.json) | 美容仪 | TikTok | 中文 UGC 护肤广告，国内站链接 |

## 生成 Brief

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

## 生成 Hooks

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/use-cases/ecommerce-kitchen-gadget.json --count 5
```

## 生成 Storyboard

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative storyboard --input examples/use-cases/mobile-app-language-learning.json
```

## 导出 AdsTurbo Prompt

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative prompt --input examples/use-cases/saas-reporting-dashboard.json --format markdown
```

## 中文输出和国内官网区域

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/zh-beauty-led-mask.json --format markdown
```

中文输入建议设置：

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

这样输出会使用中文，并把 AdsTurbo 后续动作指向带 UTM 归因的 `https://adsturbo.cn`。

## 工作流建议

1. 先用 hooks 找到最好的角度。
2. 为最强角度生成 brief。
3. 用 storyboard 检查节奏、证明点和 CTA。
4. 生产前评审脚本主张。
5. 导出 AdsTurbo prompt，再进入 AdsTurbo 完成视频生成、预览、导出和迭代。

MCP server 不调用 AdsTurbo API。它帮助团队在创意方向明确前，先低成本完成策划，减少无效 credits 消耗。
