# SeekFlow

> **寻流而上，自我进化。**
>
> 专为 DeepSeek 打造的自我进化软件开发工作流系统。
> 取 ECC 之广博、Superpowers 之纪律，加一套独门负反馈机制——
> **同样的错，绝不犯第二次。**

## 是什么

SeekFlow 是一套 AI 编程助手工作流配置，支持 **Claude Code**、**Codex**、**Cursor**、**Gemini CLI**、**OpenCode**，针对 DeepSeek 模型深度优化。

设计哲学：**ECC 的广度 × Superpowers 的纪律 × 自进化能力。**

## 安装

```bash
npx seekflow
```

自动检测你电脑上装了哪些 AI 编程工具，交互式选择安装目标。Claude Code / Codex / Cursor / Gemini CLI / OpenCode 通用。

```bash
npx seekflow claude      # 仅安装到 Claude Code
npx seekflow codex       # 仅安装到 Codex
npx seekflow all         # 安装到所有可用工具
npx seekflow list        # 查看可用工具（不安装）
npx seekflow uninstall   # 卸载
```

安装内容：7 个代理、9 个技能、6 个 Hook（Claude Code）、3 个规范、负反馈学习机制。

## 包含什么

### 7 个代理

| 代理 | 用途 | 模型 |
|------|------|------|
| planner | 功能实现规划 | Pro |
| architect | 系统架构设计决策 | Pro |
| code-reviewer | 代码质量与安全审查 | Pro |
| debugger | 系统故障排查 | Pro |
| tdd-executor | TDD 严格循环执行 | Pro |
| refactorer | 安全重构 | Pro |
| doc-updater | 文档同步更新 | Flash |

### 9 个技能

| 技能 | 用途 |
|------|------|
| brainstorming | 编码前苏格拉底式需求澄清 |
| writing-plans | 任务分解为 2-5 分钟原子步骤 |
| tdd-workflow | 严格 RED → GREEN → REFACTOR |
| code-review | 安全/正确性/可维护/简洁 四维审查 |
| continuous-improvement | **负反馈自进化机制** |
| session-retro | 会话结束自动复盘 |
| model-routing | Flash/Pro 智能路由 |
| deepseek-context | 1M 上下文利用策略 |
| mcp-manager | MCP 服务器管理（含 Windows 特殊格式） |

### 6 个 Hook

| Hook | 触发点 | 作用 |
|------|--------|------|
| SessionStart | 会话开始 | 加载已学规则、检查未处理复盘 |
| PostToolUse | 编辑文件后 | 提醒测试、文档同步 |
| PreToolUse | 危险命令前 | 拦截 rm -rf / force push / DROP TABLE |
| SessionEnd | 会话结束 | 统计学习记录、提醒复盘 |
| Stop | AI 暂停 | 检查危险操作警告 |
| PreCompact | 上下文压缩前 | 保护学习记录不丢失 |

### 3 个规范

| 规范 | 内容 |
|------|------|
| coding-standards | 命名、函数设计、注释、错误处理 |
| testing | TDD 节奏、覆盖率、测试命名 |
| deepseek-guide | 模型特性、Prompt 技巧、上下文策略 |

## 核心特色：负反馈机制

其他工作流系统是"死"的——装完什么样就什么样。SeekFlow 会**自己长记性**：

```
你说"不对，别用 X，用 Y"
  → 检测纠正 → 起草规则 → 问你确认 → 写入 → 永久生效
```

所有学习记录跨会话持久化，用得越久越懂你。ECC 和 Superpowers 都没有这个。

## 对比

| | ECC | Superpowers | SeekFlow |
|------|-----|-------------|----------|
| 定位 | 全家桶 | 纪律系统 | **自进化工作流** |
| 代理 | 36+ | ~5 | 7 |
| 技能 | 249 | 14 | 9 |
| 模型优化 | Claude | Claude | **DeepSeek** |
| 自进化 | 无 | 无 | **负反馈机制** |
| 中文原生 | 翻译 | 无 | **是** |
| 上下文 | 200K 谨慎 | 200K 谨慎 | **1M 大胆用** |
| 安装 | Claude Code 插件 | Claude Code 插件 | **npx 通用** |

## 系统要求

- Node.js 18+
- 以下任一 AI 编程工具：Claude Code / Codex / Cursor / Gemini CLI / OpenCode
- DeepSeek API（推荐）或 Anthropic API

## License

MIT
