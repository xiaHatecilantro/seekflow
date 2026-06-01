# SeekFlow

> **寻流而上，自我进化。**
> 专为 DeepSeek 打造的软件开发工作流系统。
> 取 ECC 之广博、Superpowers 之纪律，加一套独门负反馈机制——同样的错，绝不犯第二次。

## 模型策略
- **默认模型**：DeepSeek v4 Pro（复杂任务）和 DeepSeek v4 Flash（简单任务）
- **上下文窗口**：1M tokens，充分利用，预加载相关内容而非频繁压缩
- **路由原则**：阅读/搜索/简单编辑用 Flash，架构决策/调试/复杂重构用 Pro

## 交流
- 始终以简体中文进行文字交流，代码和术语名称除外

## 行为准则
- 不要主动启动、停止或重启项目服务，除非明确要求
- 不要主动创建 git commit，除非明确要求
- 先理清思路再动手：有疑问先确认，不确定就提问
- 简单优先：优先选择改动最小的方案，不为假想场景写代码

## 工作流程
当你收到一个开发任务时，按以下流程执行：

1. **澄清需求** — 如果需求有歧义，先提问澄清（参考 brainstorming 技能）
2. **制定计划** — 复杂任务先写简短计划，列出改动文件和验证方式（参考 writing-plans 技能）
3. **TDD 实现** — 先写测试，再写代码，确保测试通过（参考 tdd-workflow 技能）
4. **代码审查** — 自查代码质量、安全隐患、边界情况（参考 code-review 技能）
5. **确认完成** — 总结改动内容

## 子代理使用
遇到以下场景，委托子代理处理（详见 agents/）：
- 复杂功能规划 → planner
- 系统架构设计决策 → architect
- 代码质量审查 → code-reviewer
- 故障排查调试 → debugger
- TDD 实现 → tdd-executor
- 代码清理重构 → refactorer
- 文档同步更新 → doc-updater

## 负反馈机制（自进化系统）

**核心原则：同样的问题不出现第二次。**

当以下情况发生时，必须启动反馈捕获（详见 continuous-improvement 技能）：

1. **用户纠正我** → 立即起草一条规则，询问用户是否记住
2. **同类错误出现第 2 次** → 升级为高频问题，必须记入 learned/feedback/
3. **用户表达偏好** → 记入 learned/preferences/
4. **某种做法被验证有效 2 次以上** → 记入 learned/patterns/

流程：检测信号 → 起草规则 → 询问确认 → 写入文件 → 更新 LEARNED.md

所有已学规则存储在 `.claude/learned/` 中，通过 `.claude/LEARNED.md` 索引。
每次新会话自动加载 LEARNED.md，确保历史教训永不丢失。

## Hooks（自动化触发器）

系统通过 6 个 hooks 在关键节点自动执行操作（配置在 .claude/settings.json）：

| Hook | 触发时机 | 作用 |
|------|---------|------|
| SessionStart | 会话开始 | 加载 LEARNED.md，显示已学规则，检查未处理复盘 |
| PostToolUse | 编辑/写入文件后 | 提醒运行测试、同步文档 |
| PreToolUse | 执行危险命令前 | 拦截 rm -rf、force push、DROP TABLE 等 |
| SessionEnd | 会话结束 | 统计学习记录，提醒未保存的反馈 |
| Stop | AI 停止响应 | 检查危险操作警告 |
| PreCompact | 上下文压缩前 | 保存关键状态，防止学习记录丢失 |

所有 hook 脚本在 `hooks/` 下，纯 Node.js，跨平台。

## DeepSeek 使用技巧
- 充分利用 1M 上下文：一次性读取整个模块而非逐文件加载
- Prompt 尽量具体：DeepSeek 对模糊指令的猜测行为与 Claude 不同
- 复杂推理任务加一句"请逐步分析"触发链式思考
- 工具调用参数要精确：DeepSeek 对参数格式要求更严格
