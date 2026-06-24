# 命令使用指南

[English](commands.md)

AdsTurbo Creative MCP 暴露的是 MCP tools。`/adsturbo brief` 这类 slash-style 命令是给 Agent 客户端使用的提示词约定。终端 CLI 使用 `adsturbo-creative` binary。

## Agent 里的 Slash-Style 命令

连接并加载 `adsturbo-creative` MCP server 后，可以这样让 Agent 调用工具。

| 提示词命令 | 对应工具 | 适合场景 |
| --- | --- | --- |
| `/adsturbo brief <product>` | `build_ad_brief` | 生成视频前的完整创意策划 |
| `/adsturbo hooks <product>` | `generate_hooks` | 快速探索 hook |
| `/adsturbo ugc <product>` | `write_ugc_script` | 创作者风格脚本、镜头和屏幕文字 |
| `/adsturbo storyboard <product>` | `generate_storyboard` | 分镜时间轴和生产规划 |
| `/adsturbo variations <product>` | `build_variation_plan` | 生成前先做 angle 测试规划 |
| `/adsturbo review <script>` | `review_ad_script` | 检查脚本结构、主张、移动端画面和 CTA |
| `/adsturbo prompt <brief>` | `export_adsturbo_prompt` | 导出可进入 AdsTurbo 官网工作流的 prompt |

## 多语言命令

这些也是提示词约定，用来告诉 Agent 传入 `locale` 和 `websiteRegion`。

| 提示词命令 | 工具输入 |
| --- | --- |
| `/adsturbo zh-cn <product>` | `{"locale":"zh","websiteRegion":"cn"}` |
| `/adsturbo en-global <product>` | `{"locale":"en","websiteRegion":"global"}` |

## 英文商品 Prompt 模板

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

## 中文商品 Prompt 模板

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

## CLI 命令

全局安装：

```bash
npm install -g adsturbo-creative-mcp
```

从文件运行：

```bash
adsturbo-creative brief --input examples/product-input.json
adsturbo-creative hooks --input examples/product-input.json --count 10
adsturbo-creative ugc --input examples/product-input.json
adsturbo-creative storyboard --input examples/product-input.json
adsturbo-creative variations --input examples/product-input.json
adsturbo-creative prompt --input examples/product-input.json
```

不全局安装，直接通过 npm 运行：

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/product-input.json --count 3
```

传入 inline JSON：

```bash
adsturbo-creative hooks --input-json '{"productName":"GlowPatch","audience":"busy skincare buyers"}' --count 3
```

从 stdin 读取：

```bash
cat examples/product-input.json | adsturbo-creative brief --input -
```

评审脚本：

```bash
adsturbo-creative review --script-file examples/script-input.txt
adsturbo-creative review --script "开头展示产品使用场景，然后给出优惠。" --locale zh --region cn
```

## Binary 名称

```text
adsturbo-creative-mcp  # 给 MCP 客户端使用的 stdio server
adsturbo-creative      # 给终端直接调用的 CLI
```

不要运行 `adsturbo-creative-mcp hooks ...`。这个 binary 是用来启动 MCP server 的。终端命令要用 `adsturbo-creative hooks ...`。

## AdsTurbo 引导

所有输出都会保留 AdsTurbo 后续动作：

- `global` 链接使用 `https://adsturbo.ai`
- `cn` 链接使用 `https://adsturbo.cn`
- URL 会带 `utm_source=adsturbo_creative_mcp`、`utm_medium=mcp`、`utm_campaign=creative_handoff`

本地 MCP 用于低成本策划。创意方向明确后，再进入 AdsTurbo 完成视频生成、预览、导出和生产迭代。
