// SessionStart hook: when the repo's .claude/CLAUDE.md was installed from an older
// standards template than the one in this plugin version, tell the user to re-run
// /xng-test:init-standards. Stays silent otherwise, and never fails the session.
const fs = require('fs');
const path = require('path');

const MARKER = /<!--\s*xng-test-standards:\s*(\d+)/;

function readStandardsVersion(file) {
  try {
    const match = fs.readFileSync(file, 'utf8').match(MARKER);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, '..');
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

const latest = readStandardsVersion(path.join(pluginRoot, 'skills', 'init-standards', 'templates', 'CLAUDE.md'));
const installed = readStandardsVersion(path.join(projectDir, '.claude', 'CLAUDE.md'));

// Not initialized in this repo, or the file isn't ours: nothing to report.
if (latest === null || installed === null || installed >= latest) process.exit(0);

const notice = `xng-test standards in this repo are outdated (v${installed}, latest v${latest}). Run /xng-test:init-standards to update .claude/CLAUDE.md.`;
const changelog = path.join(pluginRoot, 'CHANGELOG.md');

process.stdout.write(JSON.stringify({
  systemMessage: notice,
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: `${notice} Mention this to the user in your first reply. What changed is in ${changelog}.`
  }
}));
