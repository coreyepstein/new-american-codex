---
id: server-only-curriculum
title: curriculum.ts is server-only
scope: repo
trigger: any edit touching site/src
enforcement: hard
---

## Rule

`site/src/lib/curriculum.ts` is marked `server-only`. It must never be imported from:
- Client components (`"use client"` components)
- Edge runtime routes
- Any file that could execute in the browser

Access curriculum data only via Server Components, Route Handlers, or server actions.

## Rationale

`curriculum.ts` uses Node.js `fs` to read files from disk. This module will throw at build time if imported on the client. The `import "server-only"` guard at the top of the file is the defense, but agents that refactor components must not move curriculum imports into client boundaries.
