# Changelog

Each release lists its plugin version. When a release changes the standards templates, it also bumps `version` in `skills/init-standards/standards.json` and lists the new standards version here, and repos need `/xng-test:init-standards` again.

## 0.3.0

Standards: v2 (no re-init needed)

- The repo's standards version now lives in the stamp file `.claude/xng-test.json` instead of a marker line in `.claude/CLAUDE.md`. Commit the stamp with the standards files.
- The latest standards version now lives in `skills/init-standards/standards.json`.
- The session-start check also reports stamped files that are missing.
- The update notice now starts with ⚠️, and Claude opens its first reply with it in bold.
- Repos initialized with an earlier release still work. Their marker is read until the next `/xng-test:init-standards` writes the stamp.

## 0.2.0

Standards: v2 (re-run `/xng-test:init-standards`)

- Standards template: added a line to test the update flow.

## 0.1.0

Standards: v1 (re-run `/xng-test:init-standards`)

- First release: `/xng-test:task`, `/xng-test:init-standards`, and the `code-reviewer` and `a11y-reviewer` agents.
- Placeholder standards template.
