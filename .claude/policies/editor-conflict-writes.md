---
id: editor-conflict-writes
title: VS Code auto-save conflicts with Write/Edit tools
scope: repo
trigger: any file edit to an existing file while dev server or editor is running
enforcement: soft
---

## Rule

When editing EXISTING files (layout.tsx, middleware.ts, Nav.tsx, page.tsx routes, components) in this repo, prefer Bash heredoc writes over the Write/Edit tools if the user has VS Code open with auto-save. VS Code buffers in-editor content and overwrites external file changes on auto-save, silently reverting all edits. Bash writes also get reverted but fail loudly. The mitigation is to ask the user to close/save/reload affected files before making changes, or to stage and commit immediately after writing so git holds the truth.

## Rationale

During the 2026-03-29 session, every Write/Edit to layout.tsx, Nav.tsx, PersonalizePage.tsx, and personalize/page.tsx was silently reverted within seconds by VS Code auto-save. The user had the old file versions open and auto-save wrote them back. None of the Clerk integration persisted. Session was wasted.
