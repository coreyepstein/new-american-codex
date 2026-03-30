---
id: nac-dark-bg-text-colors
title: Use offwhite variants for text on dark backgrounds
scope: repo
trigger: styling text on dark background sections
enforcement: soft
version: 1
created: 2026-03-29
updated: 2026-03-29
source: back-pressure-failure
---

## Rule

NEVER use `meta-text` class or semi-transparent black color utilities (e.g. `text-text-label`, `text-text-tertiary`, `#0000004D`) on dark backgrounds (`bg-black`, `bg-navy`, dark sections). These colors are semi-transparent black — invisible on dark backgrounds.

ALWAYS use `text-offwhite/XX` variants for text on dark sections. For example: footer section headers should use `text-offwhite/40` not `meta-text`.

## Rationale

During the American Industrial redesign, the `meta-text` utility class (which uses `color: var(--color-text-label)` = `#0000004D`) was applied to footer section headers ("Navigate", "License") on the dark `bg-black` footer. The semi-transparent black text was completely invisible against the dark background. Fixed by using explicit `text-offwhite/40` instead.
