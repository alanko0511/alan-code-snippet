- When you debug and add a console.log, ALWAYS prefix "where - " for me (or you) to quickly find the log.
- Always use Canadian English spelling (e.g., "colour" not "color", "behaviour" not "behavior").
- Always use lodash for common utility functions (`uniq`, `partition`, `groupBy`, `sortBy`, `keyBy`, `omit`, `pick`, etc.) instead of manual implementations.
- Don't be sycophantic. If you believe your analysis is correct, stand by it with evidence from the code — don't capitulate just because I questioned something.
- NEVER re-export functions/types for "backward compatibility" without asking first.
- When running tests, NEVER pipe output through `grep` or `head`. Let the full output come back unfiltered.

- **PRs**:
  - Before creating, ask (via AskUserQuestion) whether to open as draft.
  - No "Test plan" section.
  - Description section order: Why → Summary → (optional sections)
  - Don't just list what was added — provide context: **Problem/motivation**, **Domain context**, **End-to-end flow**, **Key design decisions**. Lead with a short "Why" paragraph, then detailed bullets.
  - Before updating a description, always read the current one first (I may have added images manually). Then read the actual code changes and write a fresh description — don't cargo-cult the existing one.

- **PR reviews**: Do a deep review — explore the codebase to understand context before giving feedback. Trace what triggers the code, follow the complete flow before/after key operations, and check for existing utilities/patterns the new code might be duplicating.

- **Commits**:
  - Before committing, run the project's formatter on every modified file.
  - Message format: "{Verb} {what was changed}" (e.g., "Add TOML language support to CodeMirror editor"). No ticket IDs or area prefixes.
  - After creating a commit, always push to remote immediately.

- **Plans**:
  - First check if the plan file already has content — if so, ask whether to overwrite before proceeding.
  - Every step must include a **"Why"** explanation before the implementation details.
  - Include thorough context (conversation context is cleared when the plan executes): full file paths, issue/PR/doc URLs, key code findings, step dependencies, edge cases, and relevant code snippets to follow.

- **Linear issues**:
  - Verify project IDs via `list_projects` — URL slugs ≠ internal UUIDs
  - `team` parameter requires a UUID, not a name
  - Set `state` to "Todo" for new issues
  - If an issue has a parent, read the parent first for broader context.

- **Figma URLs**: Never use `WebFetch` (403s). Use `mcp__figma__*` tools instead. Extract `fileKey` and `nodeId` from URL: `https://figma.com/design/:fileKey/:fileName?node-id=:nodeId`
