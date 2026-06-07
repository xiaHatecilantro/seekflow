#!/usr/bin/env node
/**
 * SessionStart Hook - 智能分级加载
 *
 * 只加载 general 标签的规则，其余按需由 AI 根据任务上下文决定。
 * 这样 .claude/learned/ 再臃肿也不会拖慢启动。
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.env.CLAUDE_PROJECT_ROOT || process.cwd();
const LEARNED_PATH = path.join(PROJECT_ROOT, ".claude", "LEARNED.md");
const MEMORY_PATH = path.join(PROJECT_ROOT, ".claude", "memory", "MEMORY.md");

// 加载项目决策记录
if (fs.existsSync(MEMORY_PATH)) {
  const memory = fs.readFileSync(MEMORY_PATH, "utf-8");
  const decisions = memory.split("\n").filter((l) => l.startsWith("## [")).length;
  if (decisions > 0) {
    console.log(`\n🧠 已加载 ${decisions} 条项目决策记录 (MEMORY.md)`);
  }
}

function parseLearnedIndex(content) {
  const result = { general: [], network: [], python: [], typescript: [], git: [], shell: [], other: [] };
  const lines = content.split("\n");
  let currentTag = "other";

  for (const line of lines) {
    // 检测标签标记：`[general]` `[python, git]` 等
    const tagMatch = line.match(/\[([^\]]+)\]/);
    if (tagMatch) {
      const tags = tagMatch[1].split(",").map((t) => t.trim());
      const entry = line.replace(/^-\s*/, "").trim();
      tags.forEach((t) => {
        if (result[t]) result[t].push(entry);
        else result.other.push(entry);
      });
    }
  }
  return result;
}

if (fs.existsSync(LEARNED_PATH)) {
  const learned = fs.readFileSync(LEARNED_PATH, "utf-8");
  const categorized = parseLearnedIndex(learned);

  const generalRules = categorized.general;
  const totalRules = Object.values(categorized).reduce((sum, arr) => sum + arr.length, 0);

  if (generalRules.length > 0) {
    console.log(`\n📚 已加载 ${generalRules.length}/${totalRules} 条学习规则（仅 general 标签）：`);
    generalRules.forEach((rule) => console.log(`  - ${rule}`));
    if (totalRules > generalRules.length) {
      console.log(`  💡 其余 ${totalRules - generalRules.length} 条规则将在相关任务时按需加载`);
    }
  }
}
