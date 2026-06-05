<p align="center">

**Language / 语言 / 語言**

[**English**](README.md) | [**简体中文**](README.zh-CN.md)

</p>

---

<p align="center">
  <img alt="SeekFlow" src="https://via.placeholder.com/600x120/1a1a2e/eee?text=SeekFlow" width="600">
</p>

<p align="center">
  <strong>寻流而上，自我进化。</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/seekflow"><img src="https://img.shields.io/npm/v/seekflow?color=cb3837&logo=npm" alt="npm"></a>
  <a href="https://www.npmjs.com/package/seekflow"><img src="https://img.shields.io/npm/dw/seekflow?logo=npm" alt="downloads"></a>
  <a href="https://github.com/xiaHatecilantro/seekflow/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js" alt="node"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey" alt="platform">
</p>

---

## 起源

想法起源于一次偶遇。

那时我正想学习别人 vibecoding 的项目，常年逛 GitHub 的我打算用一套规范的工作流来打好项目地基。我在 [ECC](https://github.com/affaan-m/ECC) 和 [Superpowers](https://github.com/obra/superpowers) 之间反复对比——一个全家桶、一个纪律严明——拿不准哪个更适合自己。

结果 DeepSeek 告诉我，两个都不好使：

> "你目前用的是 DeepSeek API 而不是 Anthropic 官方 API，而 ECC 和 Superpowers 的大量设计假设你用的是 Claude 模型（Opus/Sonnet/Haiku 的分工策略、某些 skill 对模型行为的依赖等）。直接用可能体验打折扣。"

（本人跟风用的 Claude Code + DeepSeek v4，还没试过 Resonix 和 DeepSeek TUI。）

于是我灵机一动——让 DeepSeek 照着这两个成熟模板，构建一个属于自己的系统。其中混入了我的一些个人偏好：比如之前用 skill-creator 做的 `mcp-manager`，以及我坚持要加的负反馈进化机制。

**SeekFlow 就是这么来的。** 它不是 ECC 的简化版，也不是 Superpowers 的复刻——而是在 DeepSeek 原生土壤上长出来的、会自己"长记性"的工作流系统。

如需进一步个性化，欢迎 fork 自行发展。

---

## 安装

**无需克隆、无需配置。**

```bash
npx seekflow
```

自动检测你电脑上的 AI 编程工具，交互式选择安装目标。

```bash
npx seekflow claude      # 仅 Claude Code
npx seekflow codex       # 仅 Codex
npx seekflow cursor      # 仅 Cursor
npx seekflow all         # 所有可用工具
npx seekflow list        # 查看可用工具（不安装）
npx seekflow uninstall   # 卸载
```

| 支持工具 | Claude Code | Codex | Cursor | Gemini CLI | OpenCode |
|:---|:---:|:---:|:---:|:---:|:---:|

---

## 包含什么

### 7 个代理

| 代理 | 职责 | 模型 |
|:---|:---|:---:|
| `planner` | 功能实现规划 | Pro |
| `architect` | 系统架构设计决策 | Pro |
| `code-reviewer` | 代码质量与安全审查 | Pro |
| `debugger` | 系统故障排查 | Pro |
| `tdd-executor` | TDD 严格循环 | Pro |
| `refactorer` | 安全重构 | Pro |
| `doc-updater` | 文档同步更新 | Flash |

### 9 个技能

| 技能 | 描述 |
|:---|:---|
| `brainstorming` | 编码前苏格拉底式需求澄清 |
| `writing-plans` | 任务分解为 2-5 分钟原子步骤 |
| `tdd-workflow` | 严格 RED-GREEN-REFACTOR |
| `code-review` | 安全/正确性/可维护/简洁 四维审查 |
| `continuous-improvement` | **负反馈自进化机制** |
| `session-retro` | 会话结束复盘 |
| `model-routing` | Flash/Pro 智能路由 |
| `deepseek-context` | 1M 上下文优化策略 |
| `mcp-manager` | MCP 服务器管理 |

### 6 个 Hook

| Hook | 触发点 | 作用 |
|:---|:---|:---|
| `SessionStart` | 会话开始 | 智能分级加载已学规则 |
| `PostToolUse` | 编辑文件后 | 提醒测试、文档同步 |
| `PreToolUse` | 危险命令前 | 拦截 rm -rf / force push / DROP TABLE |
| `SessionEnd` | 会话结束 | 统计学习、提醒复盘 |
| `Stop` | AI 暂停 | 检查警告 |
| `PreCompact` | 上下文压缩前 | 保护学习记录 |

### 规范体系 — 分级加载

**领域规则嵌入代理和技能内部，按需加载，启动不臃肿。**

| 级别 | 内容 | 加载时机 |
|:---|:---|:---|
| 根级 | `CLAUDE.md` + `rules/core.md` | 每次会话 |
| 代理级 | 各 agent 内嵌原则 | 调用子代理时 |
| 技能级 | 各 SKILL.md 内嵌方法 | 触发技能时 |
| 学习级 | 带标签的学习规则 | 匹配上下文时 |

启动体积约 60 行，不会随学习规则增长而臃肿。

---

## 核心特色：负反馈机制

**同样的错，绝不犯第二次。**

ECC 和 Superpowers 都是"死"的工作流——装完什么样就是什么样。SeekFlow 会自己长记性：

```
你说"不对，别用 X，用 Y"
  → 检测纠正
    → 自动起草规则
      → 问你确认
        → 写入永久生效
```

学习规则通过标签系统分级管理——`general` 标签的规则每次启动加载，领域标签（如 `python`、`git`）只在相关任务时读取。规则再多也不会拖慢启动。

ECC 和 Superpowers 都没有这个能力。

---

## 对比

| | ECC | Superpowers | **SeekFlow** |
|:---|:---|:---|:---|
| 定位 | 全家桶 | 纪律系统 | **自进化工作流** |
| 代理 | 36+ | ~5 | 7 |
| 技能 | 249 | 14 | 9 |
| 模型优化 | Claude | Claude | **DeepSeek** |
| 负反馈 | 无 | 无 | **有** |
| 中文原生 | 翻译 | 无 | **是** |
| 上下文 | 200K 保守 | 200K 保守 | **1M 充分利用** |
| 规则架构 | 扁平全加载 | 扁平全加载 | **分级按需加载** |
| 安装方式 | Claude Code 插件 | Claude Code 插件 | **npx 全平台通用** |

---

## 系统要求

- **Node.js** ≥ 18
- 任一 AI 编程工具：Claude Code · Codex · Cursor · Gemini CLI · OpenCode
- DeepSeek API（推荐）或 Anthropic API

---

## 致谢

SeekFlow 的架构深受 [Everything Claude Code](https://github.com/affaan-m/ECC) 和 [Superpowers](https://github.com/obra/superpowers) 启发，在此向两个项目的作者致敬。

---

## 贡献

欢迎 PR。无论是新的代理、技能、规范，还是对现有内容的优化——你的想法可以让 SeekFlow 变得更好。

**贡献方向：**
- 新语言/框架专属技能
- 适配更多 AI 编程工具
- 负反馈机制增强
- 文档与翻译

Fork → Branch → PR，就这么简单。有问题开 Issue 聊。

---

## License

[MIT](LICENSE) · [GitHub](https://github.com/xiaHatecilantro/seekflow)
