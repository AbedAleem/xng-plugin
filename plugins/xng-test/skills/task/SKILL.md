---
description: Implement a development task end to end, then review the changes with the code reviewer and accessibility reviewer agents.
argument-hint: "[task description or Jira key]"
disable-model-invocation: true
---

# Implement a task

Task: $ARGUMENTS

## 1. Understand the task

- If no task was given, ask the user for it and stop.
- If the task is a Jira key and Jira tools are available, read the issue. If its attachments or linked designs can't be read, ask the user for them. Never invent requirements to fill a gap.
- If a requirement is ambiguous, ask before writing code.
- If the project has no `.claude/xng-test.json` stamp, mention that the user can run `/xng-test:init-standards` to add the repo standards.

## 2. Implement

- Read the code around the change first, and follow the project's existing conventions, naming, and structure.
- Keep the change scoped to the task.
- Add or update tests for the behavior you changed.
- Run the project's lint and test commands for the affected area, if they exist, and fix what fails.

## 3. Review

Launch these agents in parallel on the changed files:

- `xng-test:code-reviewer`, always.
- `xng-test:a11y-reviewer`, when the change touches UI: templates, components, markup, or styles.

Fix every high-severity finding. List the rest for the user, and don't act on them unless asked.

## 4. Report

Summarize for the user:

- What changed, with file links.
- Tests added or updated, and the lint and test results.
- Review findings you fixed, and the ones left open.
