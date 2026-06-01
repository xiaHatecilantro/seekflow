#!/usr/bin/env node

/**
 * SeekFlow — 通用安装器
 *
 * 用法：
 *   npx seekflow             交互式安装
 *   npx seekflow claude      仅安装到 Claude Code
 *   npx seekflow codex       仅安装到 Codex
 *   npx seekflow cursor      仅安装到 Cursor
 *   npx seekflow gemini      仅安装到 Gemini CLI
 *   npx seekflow opencode    仅安装到 OpenCode
 *   npx seekflow all         安装到所有可用工具
 *   npx seekflow list        列出可用工具但不安装
 *   npx seekflow uninstall   卸载
 *
 * 零依赖，纯 Node.js。
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const HOME = os.homedir();
const PACKAGE_ROOT = path.resolve(__dirname, "..");

// ============================================================
// 工具检测
// ============================================================

const TOOLS = {
  claude: {
    name: "Claude Code",
    configDir: path.join(HOME, ".claude"),
    check: () => {
      try {
        const { execSync } = require("child_process");
        execSync("claude --version", { stdio: "ignore" });
        return true;
      } catch {
        return fs.existsSync(path.join(HOME, ".claude"));
      }
    },
    install: (dryRun) => installToClaudeCode(dryRun),
  },
  codex: {
    name: "Codex CLI",
    configDir: path.join(HOME, ".codex"),
    check: () => {
      try {
        const { execSync } = require("child_process");
        execSync("codex --version", { stdio: "ignore" });
        return true;
      } catch {
        return fs.existsSync(path.join(HOME, ".codex"));
      }
    },
    install: (dryRun) => installGeneric("Codex CLI", path.join(HOME, ".codex"), dryRun),
  },
  opencode: {
    name: "OpenCode",
    configDir: path.join(HOME, ".opencode"),
    check: () => fs.existsSync(path.join(HOME, ".opencode")),
    install: (dryRun) => installGeneric("OpenCode", path.join(HOME, ".opencode"), dryRun),
  },
  cursor: {
    name: "Cursor",
    configDir: path.join(HOME, ".cursor"),
    check: () => {
      return (
        fs.existsSync(path.join(HOME, ".cursor")) ||
        process.env.CURSOR_TRACE_ID !== undefined
      );
    },
    install: (dryRun) => {
      installGeneric("Cursor", path.join(HOME, ".cursor"), dryRun);
      // Cursor 也支持项目级 .cursorrules
      console.log("  💡 Cursor 用户可将 rules/ 内容添加到 .cursorrules");
    },
  },
  gemini: {
    name: "Gemini CLI",
    configDir: path.join(HOME, ".gemini"),
    check: () => {
      try {
        const { execSync } = require("child_process");
        execSync("gemini --version", { stdio: "ignore" });
        return true;
      } catch {
        return fs.existsSync(path.join(HOME, ".gemini"));
      }
    },
    install: (dryRun) => installGeneric("Gemini CLI", path.join(HOME, ".gemini"), dryRun),
  },
};

// ============================================================
// 安装逻辑
// ============================================================

function copyDir(src, dest, dryRun) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = path.join(src, e.name);
    const destPath = path.join(dest, e.name);
    if (e.isDirectory()) {
      copyDir(srcPath, destPath, dryRun);
    } else {
      if (dryRun) {
        console.log(`    → ${destPath}`);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function mergeHooks(settingsPath, hooksConfig) {
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    } catch {
      settings = {};
    }
  }
  settings.hooks = settings.hooks || {};
  for (const [event, hooks] of Object.entries(hooksConfig.hooks)) {
    if (!settings.hooks[event]) {
      settings.hooks[event] = hooks;
    }
  }
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
}

function installToClaudeCode(dryRun) {
  const dest = path.join(HOME, ".claude");

  if (dryRun) {
    console.log("  将安装到: ~/.claude/");
    console.log("    agents/ → ~/.claude/agents/");
    console.log("    skills/ → ~/.claude/skills/");
    console.log("    rules/ → ~/.claude/rules/");
    console.log("    hooks → ~/.claude/settings.json");
    return;
  }

  copyDir(path.join(PACKAGE_ROOT, "agents"), path.join(dest, "agents"));
  copyDir(path.join(PACKAGE_ROOT, "skills"), path.join(dest, "skills"));
  copyDir(path.join(PACKAGE_ROOT, "rules"), path.join(dest, "rules"));

  // 安装 hooks
  const hooksJson = JSON.parse(
    fs.readFileSync(path.join(PACKAGE_ROOT, "hooks", "hooks.json"), "utf-8")
  );
  // 修正 hooks 路径指向全局安装位置
  const fixedHooks = JSON.parse(JSON.stringify(hooksJson));
  for (const event of Object.keys(fixedHooks.hooks)) {
    for (const hook of fixedHooks.hooks[event]) {
      if (hook.command && hook.command.includes("node hooks/")) {
        hook.command = hook.command.replace(
          "node hooks/",
          `node "${PACKAGE_ROOT}/hooks/`
        );
      }
    }
  }
  mergeHooks(path.join(dest, "settings.json"), fixedHooks);
}

function installGeneric(name, destDir, dryRun) {
  if (dryRun) {
    console.log(`  将安装到: ${destDir}/`);
    console.log("    agents/ → ~/." + path.basename(destDir) + "/agents/");
    console.log("    skills/ → ~/." + path.basename(destDir) + "/skills/");
    return;
  }

  copyDir(path.join(PACKAGE_ROOT, "agents"), path.join(destDir, "agents"));
  copyDir(path.join(PACKAGE_ROOT, "skills"), path.join(destDir, "skills"));
  copyDir(path.join(PACKAGE_ROOT, "rules"), path.join(destDir, "rules"));
}

// ============================================================
// 卸载
// ============================================================

function uninstall() {
  console.log("\n🧹 卸载 SeekFlow\n");

  for (const [id, tool] of Object.entries(TOOLS)) {
    if (tool.check()) {
      const dirs = ["agents", "skills", "rules"].map((d) =>
        path.join(tool.configDir, d)
      );
      const existing = dirs.filter((d) => fs.existsSync(d));

      if (existing.length > 0) {
        console.log(`  在 ${tool.name} 中发现:`);
        existing.forEach((d) => console.log(`    ${d}`));
      }
    }
  }

  console.log("\n  手动删除上述目录即可完成卸载。");
  console.log("  Hook 配置需手动从 settings.json 中移除。\n");
}

// ============================================================
// 主入口
// ============================================================

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "";

  // Banner
  console.log(`
  ╔══════════════════════════════════════╗
  ║         SeekFlow v1.0.0              ║
  ║  寻流而上，自我进化                   ║
  ║  DeepSeek 原生开发工作流系统           ║
  ╚══════════════════════════════════════╝
  `);

  // 检测已安装的工具
  const available = Object.entries(TOOLS).filter(([, t]) => t.check());
  const availableIds = available.map(([id]) => id);

  console.log("🔍 检测到以下 AI 编程工具：\n");
  for (const [id, tool] of Object.entries(TOOLS)) {
    const icon = tool.check() ? "✓" : "-";
    console.log(`  ${icon} ${tool.name}`);
  }

  // 处理特殊命令
  if (target === "list") {
    console.log("\n  运行 npx seekflow <工具名> 安装到指定工具\n");
    availableIds.forEach((id) =>
      console.log(`    npx seekflow ${id}`)
    );
    console.log(`    npx seekflow all`);
    return;
  }

  if (target === "uninstall") {
    uninstall();
    return;
  }

  if (available.length === 0) {
    console.log(
      "\n⚠️  未检测到任何支持的 AI 编程工具。"
    );
    console.log("  支持的工具: Claude Code, Codex, Cursor, OpenCode, Gemini CLI");
    console.log("  如果你确实已安装上述工具，请确认它们在 PATH 中。\n");
    process.exit(1);
  }

  // 确定安装目标
  let targets = [];
  if (availableIds.includes(target)) {
    targets = [target];
  } else if (target === "all") {
    targets = availableIds;
  } else if (target === "") {
    // 交互模式
    console.log("\n选择安装目标：");
    available.forEach(([id, tool], i) =>
      console.log(`  ${i + 1}) ${tool.name}`)
    );
    console.log(`  ${available.length + 1}) 全部可用工具`);

    const answer = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    answer.question("\n输入数字 (默认全部): ", (num) => {
      const n = parseInt(num);
      if (n >= 1 && n <= available.length) {
        targets = [available[n - 1][0]];
      } else {
        targets = availableIds;
      }
      answer.close();
      doInstall(targets);
    });
    return;
  } else {
    console.log(`\n⚠️  未知目标: ${target}`);
    console.log(`  可用: ${availableIds.join(", ")}, all\n`);
    process.exit(1);
  }

  doInstall(targets);
}

function doInstall(targets) {
  const dryRun = process.argv.includes("--dry-run");

  console.log(`\n📦 安装内容：`);
  console.log(`  • 7 个代理 (agents/)`);
  console.log(`  • 9 个技能 (skills/)`);
  console.log(`  • 6 个 Hook (hooks/) — 仅 Claude Code`);
  console.log(`  • 3 个规范 (rules/)`);
  console.log(`  • 负反馈学习机制 (.claude/learned/)`);

  if (dryRun) {
    console.log(`\n🔍 模拟模式 (--dry-run)，不会实际写入：\n`);
  }

  for (const targetId of targets) {
    const tool = TOOLS[targetId];
    console.log(`\n── 安装到 ${tool.name} ──`);
    tool.install(dryRun);
  }

  console.log(`\n✅ 安装完成！`);
  if (targets.includes("claude")) {
    console.log(`  重启 Claude Code 即可使用 SeekFlow。`);
  }
  console.log(`  首次使用建议运行 /retro 查看系统全貌。`);
  console.log(`  遇到问题？https://github.com/xiaHatecilantro/seekflow/issues\n`);
}

// ============================================================
// 运行
// ============================================================

main();
