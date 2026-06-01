#!/usr/bin/env node
/**
 * PreBash Hook - 危险命令拦截确认
 */

const command = process.argv[2] || "";

const DANGEROUS_PATTERNS = [
  { pattern: /rm\s+-rf\s/, message: "⚠️  递归强制删除 (rm -rf)" },
  {
    pattern: /git\s+push\s+--force/,
    message: "⚠️  强制推送 (git push --force)，会覆盖远程历史",
  },
  {
    pattern: /git\s+reset\s+--hard/,
    message: "⚠️  硬重置 (git reset --hard)，未提交的改动将丢失",
  },
  {
    pattern: /git\s+clean\s+-f/,
    message: "⚠️  清理未跟踪文件 (git clean -f)",
  },
  {
    pattern: /DROP\s+TABLE/i,
    message: "⚠️  删除数据库表 (DROP TABLE)",
  },
  {
    pattern: /DELETE\s+FROM/i,
    message: "⚠️  删除数据库记录 (DELETE FROM)，可能无 WHERE 条件",
  },
  {
    pattern: /curl.*\|\s*(ba)?sh/,
    message: "⚠️  直接执行远程脚本 (curl | sh)，请确认来源可信",
  },
];

const matched = DANGEROUS_PATTERNS.find((d) => d.pattern.test(command));

if (matched) {
  console.log(`\n${matched.message}`);
  console.log(`  命令: ${command.substring(0, 120)}`);
  console.log("  请确认你确实想执行此操作。\n");

  // 写入警告标记，AI 可以在下一步读取
  const fs = require("fs");
  const path = require("path");
  const warnDir = path.join(
    process.env.CLAUDE_PROJECT_ROOT || process.cwd(),
    ".claude",
    "learned",
    ".warnings"
  );
  if (!fs.existsSync(warnDir)) fs.mkdirSync(warnDir, { recursive: true });
  fs.writeFileSync(
    path.join(warnDir, `${Date.now()}.json`),
    JSON.stringify({ command, warning: matched.message, time: new Date().toISOString() })
  );
}
