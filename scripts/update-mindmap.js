#!/usr/bin/env node
/**
 * scripts/update-mindmap.js
 *
 * Automatically regenerates the dynamic sections of mindmap.md:
 *   - Impact Matrix  (<!-- AUTO:IMPACT_MATRIX:START/END -->)
 *   - Dependency Map (<!-- AUTO:DEP_MAP:START/END -->)
 *   - Timestamp      (<!-- AUTO:TIMESTAMP:START/END -->)
 *
 * Also updates the "Last Updated" line in README.md.
 *
 * Usage:
 *   node scripts/update-mindmap.js
 *
 * No npm dependencies — uses only Node.js built-ins.
 */

const fs = require("fs");
const path = require("path");

// ─── Configuration ─────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");
const MINDMAP_PATH = path.join(ROOT, "mindmap.md");
const README_PATH = path.join(ROOT, "README.md");

// Directories to scan for source files
const SCAN_DIRS = [
  path.join(ROOT, "backend"),
  path.join(ROOT, "frontend", "src"),
];

// Directories/patterns to skip
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".next",
  "uploads",
  "scripts",
  "tests",
  "public",
]);

// File extensions to analyze
const SOURCE_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]);

// ─── File Discovery ─────────────────────────────────────────────────────────────

function walk(dir, files = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && SOURCE_EXTS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

// ─── Import Extraction ──────────────────────────────────────────────────────────

/**
 * Extract all local (relative) imports from a file.
 * Handles:
 *   require("./foo")
 *   require("../bar/baz")
 *   import ... from "./foo"
 *   import("./foo")
 */
function extractLocalImports(filePath) {
  let src;
  try {
    src = fs.readFileSync(filePath, "utf8");
  } catch {
    return [];
  }

  const results = [];

  // ES import: import ... from "..."  /  import("...")
  const esRe = /\bimport\s[^'"]*['"](\.\.?\/[^'"]+)['"]/g;
  let m;
  while ((m = esRe.exec(src)) !== null) {
    results.push(m[1]);
  }

  // CJS require: require("...")
  const cjsRe = /\brequire\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g;
  while ((m = cjsRe.exec(src)) !== null) {
    results.push(m[1]);
  }

  return results;
}

/**
 * Resolve a relative import specifier to an absolute path, trying common
 * extensions (.js, .jsx, .ts, .tsx, /index.js, /index.jsx …).
 */
function resolveImport(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [
    base,
    base + ".js",
    base + ".jsx",
    base + ".ts",
    base + ".tsx",
    base + ".mjs",
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

// ─── Build Dependency Graph ─────────────────────────────────────────────────────

/**
 * Returns:
 *   forward:  Map<absPath, Set<absPath>>  — file → files it imports
 *   reverse:  Map<absPath, Set<absPath>>  — file → files that import it
 */
function buildGraph(sourceFiles) {
  const forward = new Map();
  const reverse = new Map();

  // Initialise
  for (const f of sourceFiles) {
    forward.set(f, new Set());
    reverse.set(f, new Set());
  }

  for (const file of sourceFiles) {
    const specs = extractLocalImports(file);
    for (const spec of specs) {
      const resolved = resolveImport(file, spec);
      if (!resolved) continue;
      // Only track if the resolved file is in our scanned set
      if (!forward.has(resolved)) continue;

      forward.get(file).add(resolved);
      reverse.get(resolved).add(file);
    }
  }

  return { forward, reverse };
}

// ─── Relative Path Helper ───────────────────────────────────────────────────────

function rel(absPath) {
  return path.relative(ROOT, absPath).replace(/\\/g, "/");
}

// ─── Markdown Generation ────────────────────────────────────────────────────────

function buildImpactMatrix(sourceFiles, reverse) {
  const rows = [];

  // Sort: files with most importers first, then alphabetically
  const sorted = [...sourceFiles].sort((a, b) => {
    const diff = (reverse.get(b)?.size ?? 0) - (reverse.get(a)?.size ?? 0);
    return diff !== 0 ? diff : rel(a).localeCompare(rel(b));
  });

  for (const file of sorted) {
    const importers = [...(reverse.get(file) ?? [])].map(rel).sort();
    const importerStr =
      importers.length === 0
        ? "_(entry point or not imported by any tracked file)_"
        : importers.map((p) => `\`${p}\``).join(", ");
    rows.push(`| \`${rel(file)}\` | ${importerStr} |`);
  }

  return [
    "## ⚡ Impact Matrix — Auto-Generated",
    "",
    "> **How to use:** Find the file you are about to change in the left column. The right column lists every file that imports it (direct impact). Check all those files after your change.",
    "",
    "| File You Change | Direct Importers (will be affected) |",
    "|---|---|",
    ...rows,
  ].join("\n");
}

function buildDepMap(sourceFiles, forward) {
  const backendFiles = sourceFiles.filter((f) =>
    f.startsWith(path.join(ROOT, "backend"))
  );
  const frontendFiles = sourceFiles.filter((f) =>
    f.startsWith(path.join(ROOT, "frontend"))
  );

  function section(files, label) {
    const rows = [...files].sort((a, b) => rel(a).localeCompare(rel(b)));
    const tableRows = rows.map((file) => {
      const deps = [...(forward.get(file) ?? [])].map(rel).sort();
      const depStr =
        deps.length === 0
          ? "_(no local imports)_"
          : deps.map((p) => `\`${p}\``).join(", ");
      return `| \`${rel(file)}\` | ${depStr} |`;
    });

    return [
      `### ${label}`,
      "",
      "| File | Local Imports |",
      "|---|---|",
      ...tableRows,
    ].join("\n");
  }

  return [
    "## 📁 Full Dependency Map — Auto-Generated",
    "",
    "> Each file lists its local imports (relative require/import). Generated from static analysis.",
    "",
    section(backendFiles, "Backend"),
    "",
    section(frontendFiles, "Frontend"),
  ].join("\n");
}

function buildTimestamp() {
  const now = new Date().toISOString();
  const branch = getBranch();
  const commit = getCommit();
  const commitMsg = getCommitMessage();

  return [
    "## 🕐 Last Auto-Updated",
    "",
    `**Date:** ${now}  `,
    `**Commit:** \`${commit}\`  `,
    `**Message:** ${commitMsg}  `,
    `**Branch:** ${branch}`,
  ].join("\n");
}

// ─── Git Helpers ────────────────────────────────────────────────────────────────

function execSync(cmd) {
  try {
    return require("child_process")
      .execSync(cmd, { cwd: ROOT, encoding: "utf8" })
      .trim();
  } catch {
    return "unknown";
  }
}

function getBranch() {
  return (
    process.env.GITHUB_REF_NAME ||
    execSync("git rev-parse --abbrev-ref HEAD")
  );
}

function getCommit() {
  return (
    (process.env.GITHUB_SHA || execSync("git rev-parse HEAD")).slice(0, 8)
  );
}

function getCommitMessage() {
  return execSync('git log -1 --pretty=format:"%s"');
}

// ─── Section Replacement ────────────────────────────────────────────────────────

/**
 * Replace the content between two HTML comment markers in a string.
 *
 * Example markers:
 *   <!-- AUTO:IMPACT_MATRIX:START -->
 *   <!-- AUTO:IMPACT_MATRIX:END -->
 */
function replaceSection(content, key, newInner) {
  const startMarker = `<!-- AUTO:${key}:START -->`;
  const endMarker = `<!-- AUTO:${key}:END -->`;

  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    // Markers not found — append as new section
    return (
      content +
      "\n\n" +
      startMarker +
      "\n" +
      newInner +
      "\n" +
      endMarker +
      "\n"
    );
  }

  return (
    content.slice(0, startIdx + startMarker.length) +
    "\n" +
    newInner +
    "\n" +
    content.slice(endIdx)
  );
}

// ─── README Update ──────────────────────────────────────────────────────────────

function updateReadme() {
  if (!fs.existsSync(README_PATH)) return;

  let readme = fs.readFileSync(README_PATH, "utf8");
  const now = new Date().toISOString();
  const commit = getCommit();
  const badge = `![Docs Updated](https://img.shields.io/badge/docs%20updated-${encodeURIComponent(now.slice(0, 10))}-blue)`;

  const startMarker = "<!-- AUTO:README_BADGE:START -->";
  const endMarker = "<!-- AUTO:README_BADGE:END -->";

  const newBadgeSection = `${badge}  \n_Mindmap last regenerated: **${now}** · commit \`${commit}\`_`;

  if (readme.includes(startMarker)) {
    readme = replaceSection(readme, "README_BADGE", newBadgeSection);
  } else {
    // Insert after the first top-level heading
    const headingMatch = readme.match(/^#[^#].+\n/m);
    if (headingMatch) {
      const insertAt = readme.indexOf(headingMatch[0]) + headingMatch[0].length;
      readme =
        readme.slice(0, insertAt) +
        "\n" +
        startMarker +
        "\n" +
        newBadgeSection +
        "\n" +
        endMarker +
        "\n" +
        readme.slice(insertAt);
    }
  }

  fs.writeFileSync(README_PATH, readme, "utf8");
  console.log("✅  README.md updated");
}

// ─── Main ───────────────────────────────────────────────────────────────────────

function main() {
  console.log("🔍  Scanning source files…");
  const allFiles = [];
  for (const dir of SCAN_DIRS) {
    walk(dir, allFiles);
  }
  console.log(`   Found ${allFiles.length} source files`);

  console.log("🔗  Building dependency graph…");
  const { forward, reverse } = buildGraph(allFiles);

  console.log("📝  Generating sections…");
  const impactMatrix = buildImpactMatrix(allFiles, reverse);
  const depMap = buildDepMap(allFiles, forward);
  const timestamp = buildTimestamp();

  if (!fs.existsSync(MINDMAP_PATH)) {
    console.error("❌  mindmap.md not found at", MINDMAP_PATH);
    process.exit(1);
  }

  let mindmap = fs.readFileSync(MINDMAP_PATH, "utf8");
  mindmap = replaceSection(mindmap, "IMPACT_MATRIX", impactMatrix);
  mindmap = replaceSection(mindmap, "DEP_MAP", depMap);
  mindmap = replaceSection(mindmap, "TIMESTAMP", timestamp);

  fs.writeFileSync(MINDMAP_PATH, mindmap, "utf8");
  console.log("✅  mindmap.md updated");

  updateReadme();

  console.log("🎉  Done");
}

main();
