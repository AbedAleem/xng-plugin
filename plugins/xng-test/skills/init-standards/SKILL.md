---
description: Add or update the xng-test standards files (.claude/CLAUDE.md) in the current repository.
disable-model-invocation: true
---

# Initialize repo standards

Install the standards templates into this repository. Never read, create, or modify the root `CLAUDE.md`.

`${CLAUDE_SKILL_DIR}/standards.json` holds the current standards `version` (call it `N`) and the `files` to install. Each file has a `template`, relative to `${CLAUDE_SKILL_DIR}`, and a `target`, relative to the project root.

The repo records what was installed in the stamp file `.claude/xng-test.json`:

```json
{
  "standardsVersion": 2,
  "pluginVersion": "0.3.0",
  "files": [".claude/CLAUDE.md"]
}
```

## Steps

1. Read `standards.json`.
2. Find the repo's installed version:
   - **Stamp exists**: its `standardsVersion`.
   - **No stamp, but the first line of `.claude/CLAUDE.md` has the legacy marker `<!-- xng-test-standards: M`**: version `M`. Earlier releases stored the version this way.
   - **Neither**: the repo isn't initialized.
3. Act on the result:
   - **Installed at `N` and every stamped file exists**: tell the user the standards are up to date, and stop.
   - **Installed at `N` but some stamped files are missing**: write only the missing files from their templates.
   - **Installed below `N`**: read `${CLAUDE_PLUGIN_ROOT}/CHANGELOG.md` and tell the user what changed between their version and `N`. Then overwrite every target with its template. Local edits to these files are replaced, so say so.
   - **Not initialized**: write each target from its template, creating `.claude/` if needed. If a target already exists, it wasn't created by this plugin: ask the user before overwriting it, and skip it if they decline.
4. Write the stamp `.claude/xng-test.json` with `standardsVersion` set to `N`, `pluginVersion` set to the `version` in `${CLAUDE_PLUGIN_ROOT}/.claude-plugin/plugin.json`, and `files` set to the targets you installed. Use 2-space indentation and a trailing newline. Don't write the stamp if you installed nothing.
5. Report the files you wrote and the standards version installed. Tell the user to commit `.claude/xng-test.json` along with the standards files, so teammates get the same standards and update notices.
