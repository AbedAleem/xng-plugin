---
description: Add or update the xng-test standards file at .claude/CLAUDE.md in the current repository.
disable-model-invocation: true
---

# Initialize repo standards

Install the standards template into this repository at `.claude/CLAUDE.md`. Never read, create, or modify the root `CLAUDE.md`.

The template is `${CLAUDE_SKILL_DIR}/templates/CLAUDE.md`. Its first line holds the marker `<!-- xng-test-standards: N -->`, where `N` is the standards version.

## Steps

1. Read the template and note its version `N`.
2. Check `.claude/CLAUDE.md` in the project root:
   - **Missing**: create `.claude/` if needed, then write the template to `.claude/CLAUDE.md` exactly as it is.
   - **Exists with a marker at version `N`**: tell the user the standards are already up to date, and stop.
   - **Exists with an older marker**: read `${CLAUDE_PLUGIN_ROOT}/CHANGELOG.md` and tell the user what changed between their version and `N`. Then overwrite the file with the template.
   - **Exists without a marker**: the file wasn't created by this plugin. Ask the user before overwriting it. If they decline, stop.
3. Report the path you wrote and the standards version installed.
