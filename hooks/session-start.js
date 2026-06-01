#!/usr/bin/env node
/**
 * SessionStart Hook - 加载已学规则，准备项目上下文
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.env.CLAUDE_PROJECT_ROOT || process.cwd();
const LEARNED_PATH = path.join(PROJECT_ROOT, ".claude", "LEARNED.md");

// 检查 LEARNED.md 是否存在
if (fs.existsSync(LEARNED_PATH)) {
  const learned = fs.readFileSync(LEARNED_PATH, "utf-8");
  const lines = learned.split("\n").filter((l) => l.startsWith("- ["));
  const ruleCount = lines.length;

  if (ruleCount > 0) {
    console.log(`\n📚 已加载 ${ruleCount} 条学习规则：`);
    lines.forEach((line) => console.log(`  ${line.replace("- ", "")}`));
  }
}

// 检查是否有上次会话的复盘待处理
const RETRO_PATH = path.join(PROJECT_ROOT, ".claude", "learned", ".pending-retro.md");
if (fs.existsSync(RETRO_PATH)) {
  console.log("\n⚠️  上次会话有未处理的复盘结果：");
  console.log(fs.readFileSync(RETRO_PATH, "utf-8"));
}
