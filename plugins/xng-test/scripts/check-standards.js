// SessionStart hook: when the repo's xng-test standards are older than this plugin
// version's, or files the repo's stamp lists are missing, tell the user to re-run
// /xng-test:init-standards. Stays silent otherwise, and never fails the session.
const fs = require('fs');
const path = require('path');

// Releases before 0.3.0 stored the version in the first line of .claude/CLAUDE.md.
const LEGACY_MARKER = /<!--\s*xng-test-standards:\s*(\d+)/;

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function readLegacyVersion(file) {
  try {
    const match = fs.readFileSync(file, 'utf8').match(LEGACY_MARKER);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

function notify(notice) {
  const changelog = path.join(pluginRoot, 'CHANGELOG.md');
  process.stdout.write(JSON.stringify({
    systemMessage: `⚠️ ${notice}`,
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: `${notice} Start your first reply with this notice as its own line, in bold and prefixed with ⚠️, for example: "⚠️ **${notice}**". Then answer the user's message. What changed is in ${changelog}.`
    }
  }));
}

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, '..');
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

const standards = readJson(path.join(pluginRoot, 'skills', 'init-standards', 'standards.json'));
const latest = Number(standards && standards.version);
if (!latest) process.exit(0);

const stampFile = path.join(projectDir, '.claude', 'xng-test.json');
const stamp = fs.existsSync(stampFile) ? readJson(stampFile) : null;

let installed;
let missing = [];

if (stamp) {
  installed = Number(stamp.standardsVersion) || 0;
  missing = (Array.isArray(stamp.files) ? stamp.files : [])
    .filter((file) => !fs.existsSync(path.join(projectDir, file)));
} else if (fs.existsSync(stampFile)) {
  notify('The xng-test stamp .claude/xng-test.json in this repo is unreadable. Run /xng-test:init-standards to repair it.');
  process.exit(0);
} else {
  installed = readLegacyVersion(path.join(projectDir, '.claude', 'CLAUDE.md'));
  // Not initialized in this repo, or the file isn't ours: nothing to report.
  if (installed === null) process.exit(0);
}

if (installed < latest) {
  notify(`xng-test standards in this repo are outdated (v${installed}, latest v${latest}). Run /xng-test:init-standards to update them.`);
} else if (missing.length) {
  notify(`xng-test standards in this repo are incomplete: ${missing.join(', ')} missing. Run /xng-test:init-standards to restore them.`);
}
