# 项目决策记录

每次做出重要决定后追加一条，会话开始前自动加载。

---

## [2026-06-01] 系统命名
决定了什么：项目命名为 SeekFlow
为什么：取"Seek"关联 DeepSeek，"Flow"表达工作流；避免"Deep"前缀撞车（如 DeepFlow）
否决了什么：DeepFlow（已存在同名可观测性项目）、DeepForge、DeepSense

## [2026-06-01] 设计哲学
决定了什么：融合 ECC 广度和 Superpowers 纪律，加独创负反馈机制
为什么：ECC 249 技能太臃肿，Superpowers 14 技能太寡，取两者精华做 DeepSeek 优化
否决了什么：直接安装 ECC 或 Superpowers（都是 Claude 模型假设，DeepSeek 体验打折扣）

## [2026-06-01] 安装方式
决定了什么：npm 通用安装（npx seekflow），非 Claude Code 插件专属
为什么：覆盖 Claude Code / Codex / Cursor / Gemini CLI / OpenCode 五大平台
否决了什么：纯 Claude Code 插件（覆盖范围太窄）

## [2026-06-02] README 语言
决定了什么：主 README 为中文，英文为 README.en.md
为什么：面向中文开发者
否决了什么：中英混排单文件（阅读体验差）、英文为主中文为次（目标用户不符）

## [2026-06-02] 规则分级加载
决定了什么：四级加载体系（根级/代理级/技能级/学习级），启动体积 ~60 行
为什么：防止 learned/ 规则增多后启动臃肿；领域规则嵌入代理和技能内部按需加载
否决了什么：扁平全加载（ECC/Superpowers 做法，启动慢）

## [2026-06-06] 负反馈规则标签系统
决定了什么：每条 learned 规则必须带标签（general/python/typescript/git/network 等）
为什么：SessionStart 只加载 general 标签，其余按任务上下文匹配，避免无关规则污染
否决了什么：全部规则无条件加载（违背分级原则）

## [2026-06-06] learned/preferences 本地私有
决定了什么：learned/preferences/ 目录不提交到 Git
为什么：个人使用习惯不应污染公共仓库
否决了什么：全部提交（泄露个人偏好）、全部忽略（丢失协作需要的通用规则）

## [2026-06-06] 决策记录
决定了什么：维护 MEMORY.md 记录每次重要决策
为什么：跨会话保持决策上下文，不被 claude-mem 限制（不依赖插件），可随 git 共享
否决了什么：仅依赖 claude-mem（需插件运行，协作者不可用）
