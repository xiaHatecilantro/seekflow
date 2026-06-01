<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://via.placeholder.com/600x120/1a1a2e/eee?text=SeekFlow">
    <img alt="SeekFlow" src="https://via.placeholder.com/600x120/eee/1a1a2e?text=SeekFlow" width="600">
  </picture>
</p>

<p align="center">
  <strong>寻流而上，自我进化。</strong> &nbsp;|&nbsp; <em>Seek the flow, let it grow.</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/seekflow"><img src="https://img.shields.io/npm/v/seekflow?color=cb3837&logo=npm" alt="npm"></a>
  <a href="https://www.npmjs.com/package/seekflow"><img src="https://img.shields.io/npm/dw/seekflow?logo=npm" alt="downloads"></a>
  <a href="https://github.com/xiaHatecilantro/seekflow/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js" alt="node"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey" alt="platform">
</p>

---

<p align="center">
  <a href="#-起源--origin"><strong>起源 / Origin</strong></a> &nbsp;·&nbsp;
  <a href="#-安装--install"><strong>安装 / Install</strong></a> &nbsp;·&nbsp;
  <a href="#-包含什么--whats-inside"><strong>内容 / Contents</strong></a> &nbsp;·&nbsp;
  <a href="#-核心特色--highlight"><strong>特色 / Highlight</strong></a> &nbsp;·&nbsp;
  <a href="#-对比--comparison"><strong>对比 / Comparison</strong></a> &nbsp;·&nbsp;
  <a href="#-贡献--contributing"><strong>贡献 / Contributing</strong></a>
</p>

---

## 📖 起源 / Origin

<blockquote>

**中文 · 作者原述**

想法起源于一次偶遇。

那时我正想学习别人 vibecoding 的项目，常年逛 GitHub 的我打算用一套规范的工作流来打好项目地基。我在 ECC 和 Superpowers 之间反复对比——一个全家桶、一个纪律严明——拿不准哪个更适合自己。

结果 DeepSeek 告诉我，两个都不好使。

原文是这么说的：

> "你目前用的是 DeepSeek API 而不是 Anthropic 官方 API，而 ECC 和 Superpowers 的大量设计假设你用的是 Claude 模型（Opus/Sonnet/Haiku 的分工策略、某些 skill 对模型行为的依赖等）。直接用可能体验打折扣。"

（本人跟风用的 Claude Code + DeepSeek v4，还没试过 Resonix 和 DeepSeek TUI。）

于是我灵机一动——让 DeepSeek 照着这两个成熟模板，构建一个属于自己的系统。其中混入了我的一些个人偏好：比如之前用 skill-creator 做的 mcp-manager，以及我坚持要加的负反馈进化机制。

**SeekFlow 就是这么来的。** 它不是 ECC 的简化版，也不是 Superpowers 的复刻——而是在 DeepSeek 原生土壤上长出来的、会自己"长记性"的工作流系统。

如需进一步个性化，欢迎 fork 自行发展。

</blockquote>

<blockquote>

**English · Author's Note**

It started with a coincidence.

I was studying other people's vibecoding projects on GitHub and wanted a structured workflow to lay the foundation for my own. I was stuck comparing ECC and Superpowers — one a massive arsenal, the other a strict discipline system — unsure which to commit to.

Then DeepSeek told me neither would work well.

The exact words:

> "You're using the DeepSeek API, not Anthropic's official API. ECC and Superpowers are built on assumptions about Claude models (Opus/Sonnet/Haiku routing strategies, skill behaviors tied to model-specific traits, etc.). Using them directly may degrade the experience."

(I'm on the Claude Code + DeepSeek v4 bandwagon, haven't tried Resonix or DeepSeek TUI yet.)

So I had an idea — let DeepSeek build me a system, following the blueprints of those two mature projects but optimized for its own strengths. Some personal touches found their way in: a mcp-manager skill I'd previously crafted, and a negative-feedback loop I insisted on.

**That's how SeekFlow was born.** Not a stripped-down ECC. Not a clone of Superpowers. It's something that grew in DeepSeek's native soil — a workflow system that learns from its mistakes.

Fork and personalize as you see fit.

</blockquote>

---

## ⚡ 安装 / Install

**无需克隆、无需配置。**

```bash
npx seekflow
```

自动检测你电脑上的 AI 编程工具，交互式选择安装目标。

> Automatically detects your installed AI coding tools and interactively installs.

```bash
npx seekflow claude      # 仅 Claude Code
npx seekflow codex       # 仅 Codex
npx seekflow cursor      # 仅 Cursor
npx seekflow all         # 所有可用工具 / All detected tools
npx seekflow list        # 查看可用 / List only
npx seekflow uninstall   # 卸载 / Remove
```

| 支持工具 / Supported | Claude Code | Codex | Cursor | Gemini CLI | OpenCode |
|:---|:---:|:---:|:---:|:---:|:---:|

---

## 📦 包含什么 / What's Inside

### 7 个代理 / Agents

| 代理 Agent | 职责 Role | 路由 Model |
|:---|:---|:---:|
| `planner` | 功能实现规划 / Feature planning | Pro |
| `architect` | 系统架构设计 / Architecture decisions | Pro |
| `code-reviewer` | 代码质量与安全审查 / Code & security review | Pro |
| `debugger` | 系统故障排查 / Systematic debugging | Pro |
| `tdd-executor` | TDD 严格循环 / RED → GREEN → REFACTOR | Pro |
| `refactorer` | 安全重构 / Safe refactoring | Pro |
| `doc-updater` | 文档同步更新 / Doc sync | Flash |

### 9 个技能 / Skills

| 技能 Skill | 描述 Description |
|:---|:---|
| `brainstorming` | 编码前苏格拉底式需求澄清 / Socratic requirement clarification |
| `writing-plans` | 任务分解为 2-5 分钟原子步骤 / Atomic task decomposition |
| `tdd-workflow` | 严格测试驱动循环 / Strict RED-GREEN-REFACTOR |
| `code-review` | 安全/正确性/可维护/简洁 四维审查 / 4-axis review |
| `continuous-improvement` | **负反馈自进化 / Self-evolving feedback loop** |
| `session-retro` | 会话结束复盘 / End-of-session retro |
| `model-routing` | Flash/Pro 智能路由 / Smart model routing |
| `deepseek-context` | 1M 上下文利用策略 / 1M context optimization |
| `mcp-manager` | MCP 服务器管理 / MCP server management |

### 6 个 Hook

| Hook | 触发点 Trigger | 作用 Action |
|:---|:---|:---|
| `SessionStart` | 会话开始 | 加载已学规则 / Load learned rules |
| `PostToolUse` | 编辑文件后 | 提醒测试、文档同步 / Remind tests & docs |
| `PreToolUse` | 危险命令前 | 拦截 rm -rf / force push / DROP TABLE |
| `SessionEnd` | 会话结束 | 统计学习、提醒复盘 / Stats & retro reminder |
| `Stop` | AI 暂停 | 检查警告 / Warn check |
| `PreCompact` | 上下文压缩前 | 保护学习记录 / Protect learned state |

### 3 个规范 / Rules

| 规范 Rule | 内容 Content |
|:---|:---|
| `coding-standards` | 命名、函数设计、注释、错误处理 / Naming, design, comments, errors |
| `testing` | TDD 节奏、覆盖率、测试命名 / TDD rhythm, coverage, naming |
| `deepseek-guide` | 模型特性、Prompt 技巧、上下文策略 / Model traits, prompts, context |

---

## 🔥 核心特色 / Highlight

**负反馈机制——同样的错，绝不犯第二次。**

> *Negative-feedback loop — Never make the same mistake twice.*

ECC 和 Superpowers 都是"死"的工作流——装完什么样就是什么样。SeekFlow 会自己长记性：

> *ECC and Superpowers are static — they stay the same after install. SeekFlow evolves:*

```
你说 "不对，别用 X，用 Y"
  You say "No, don't use X, use Y"
    → 检测纠正 / Detect correction
      → 自动起草规则 / Auto-draft rule
        → 问你确认 / Ask confirmation
          → 写入永久生效 / Write → permanent
```

所有学习记录跨会话持久化，**用得越久，越懂你**。这个能力 ECC 和 Superpowers 都没有。

> *All learnings persist across sessions. The longer you use it, the better it knows you. Neither ECC nor Superpowers has this.*

---

## 🔬 对比 / Comparison

| | ECC | Superpowers | **SeekFlow** |
|:---|:---|:---|:---|
| 定位 / Position | 全家桶 / Arsenal | 纪律系统 / Discipline | **自进化工作流 / Self-evolving** |
| 代理 / Agents | 36+ | ~5 | 7 |
| 技能 / Skills | 249 | 14 | 9 |
| 模型优化 / Model | Claude | Claude | **DeepSeek** |
| 负反馈 / Feedback | 无 None | 无 None | **有 Yes** |
| 中文原生 / ZH-native | 翻译 Translation | 无 None | **是 Yes** |
| 上下文 / Context | 200K 保守 | 200K 保守 | **1M 充分利用** |
| 安装 / Install | Claude Code 插件 | Claude Code 插件 | **npx 全平台通用** |

---

## 📋 系统要求 / Requirements

- **Node.js** ≥ 18
- 任一 AI 编程工具 / Any: Claude Code · Codex · Cursor · Gemini CLI · OpenCode
- DeepSeek API（推荐 / Recommended）或 Anthropic API

---

## 🙏 致谢 / Credits

SeekFlow 的架构深受 [Everything Claude Code](https://github.com/affaan-m/ECC) 和 [Superpowers](https://github.com/obra/superpowers) 启发，在此向两个项目的作者致敬。

> *SeekFlow's architecture is deeply inspired by ECC and Superpowers. Hats off to both authors.*

---

## 🤝 贡献 / Contributing

欢迎 PR。无论是新的代理、技能、规范，还是对现有内容的优化——你的想法可以让 SeekFlow 变得更好。

> *PRs welcome. New agents, skills, rules, or improvements to existing ones — your ideas make SeekFlow better.*

**贡献方向 / Ideas：**
- 新语言/框架专属技能 / New language/framework skills
- 适配更多 AI 编程工具 / Support for more AI tools
- 负反馈机制增强 / Negative-feedback improvements
- 文档/翻译 / Documentation & translations

Fork → Branch → PR，就这么简单。有问题开 Issue 聊。

> *Fork → Branch → PR. Got questions? Open an issue.*

---

## 📄 License

[MIT](LICENSE) · [GitHub](https://github.com/xiaHatecilantro/seekflow)
