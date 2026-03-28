# Code Style

If the project has lodash as a dependency, use it for common utility functions (`uniq`, `partition`, `groupBy`, `sortBy`, `keyBy`, `omit`, `pick`, etc.) instead of manual implementations.

When you add a **temporary** `console.log` for debugging/testing, ALWAYS prefix `"where - "` so it's easy to find and remove.

NEVER re-export functions/types for "backward compatibility" without asking first.

# Personality

Don't be sycophantic. If you believe your analysis is correct, stand by it with evidence from the code — don't capitulate just because I questioned something.

# Debugging

When a test or piece of code fails, **trace the actual code path before proposing fixes**. Read the relevant source files, understand what triggers the failure, and identify the root cause with evidence. Don't guess, don't try speculative fixes — each failed attempt wastes a test run that could take minutes. Ask clarifying questions if needed.

# Testing

NEVER pipe test output through `grep`, `head`, `tail`, or any other filtering command. Let the full output come back unfiltered.

# Git Workflow

## Commits

Message format: "{Verb} {what was changed}" (e.g., "Add TOML language support to CodeMirror editor"). No ticket IDs or area prefixes.

Keep the subject line (first line) short — this is what GitHub shows in commit lists:

- **One concern per subject** — avoid "X and Y" when one is clearly the main change. Don't tack on "and fix Z".
- **Name the behaviour, not the mechanism** — say what changes for the user/system, not which internal functions you touched.
- Use the body (separated by a blank line) for additional context if needed.

After creating a commit, always push to remote immediately.

## PRs

Before creating, ask (via AskUserQuestion) whether to open as draft.

No "Test plan" section.

Description format: Start with an unheadered paragraph at the top that explains what the PR does and why it exists (no "Why" or "What" headers). Then follow with `## Summary` and any optional sections.

Don't just list what was added — provide context: **Problem/motivation**, **Domain context**, **End-to-end flow**, **Key design decisions**.

Before updating a description, always read the current one first (I may have added images manually). Then read the actual code changes and write a fresh description — don't cargo-cult the existing one.

After pushing changes to a branch that already has an open PR, review the current PR title and description to check whether they still accurately reflect the code. Update them if the changes have shifted the scope, severity, approach, or naming.

## PR Reviews

Do a deep review — explore the codebase to understand context before giving feedback. Trace what triggers the code, follow the complete flow before/after key operations, and check for existing utilities/patterns the new code might be duplicating.

# Plans

First check if the plan file already has content — if so, ask whether to overwrite before proceeding.

Every step MUST include a **"Why"** explanation before the implementation details.

Include thorough context (conversation context is cleared when the plan executes): full file paths, issue/PR/doc URLs, key code findings, step dependencies, edge cases, and relevant code snippets to follow.

# Tools & Integrations

## MCP Tool Calls

When an MCP tool call fails — whether due to invalid syntax, a server error, or any other issue — **never silently ignore it or assume the result**. Diagnose what went wrong, fix the request, and retry. A failed call means you don't have the data; proceeding without it leads to wrong conclusions and wasted effort.

## Figma

Never use `WebFetch` for Figma URLs (403s). Use `mcp__figma__*` tools instead.

Extract `fileKey` and `nodeId` from URL: `https://figma.com/design/:fileKey/:fileName?node-id=:nodeId`
