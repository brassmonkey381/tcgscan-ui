# Working in tcgscan-ui

The page shell and control kit shared by **tcgscan-app** (Expo SDK 57) and, later,
**michi-maker** (Expo SDK 56). Both consume it by git-commit pin
(`github:brassmonkey381/tcgscan-ui#<sha>`), so a push here reaches neither app until that app
moves its pin, and the next bump takes everything since its last one.

Origin: lifted from tcgscan-app `src/components/kit` and `src/components/shell` (branch
page-shell, 2026-10-29), per the owner's decision that the lift target is a new tcgscan-ui
package and tcgscan-theme stays import-free token data. Brief: `../docs/PAGE-SHELL-HANDOFF.md`.

## Hard rules

1. **No app imports, ever.** Only `react`, `react-native`, `react-native-safe-area-context` and
   `tcgscan-theme` (all peers). Routes, nav groups, brand marks, copy and the face loader come in
   through props and `KitProvider`. That is what lets two apps use one shell.
2. **Colours come from the app's palette**, handed to `KitProvider` from tcgscan-theme. No hex
   literal in a component; the per-skin things (radius per role, display face, the one primary
   shadow) live on `KitSkin`.
3. **One size scale** (`src/kit/scale.ts`): heights 36 / 44 / 52, rows 48 with a 96 label
   column, sheets 56 + 72, toast 48, type 13 / 14 / 16 / 17 / 22 / 28 / 40, frame 216 rail,
   24 gutter (16 on a phone), widths 800 / 960 / 1440. Change a number here, not in an app.
4. **Four button looks**: primary, secondary, selected, quiet. One primary per view.
5. **A change is a change to every consumer.** Prefer additive props with back-compatible
   defaults; renaming or removing an export breaks two apps.

## Release

A release is ONE commit, the same as tcgscan-theme and tcgscan-browse:

```
npm run check            # tsc --noEmit
npm run build            # tsc -> dist/ (dist IS committed)
# bump "version" in package.json and package-lock.json
git commit -am "feat(scope): vX.Y.Z - <what changed>"
git push
```

Then bump the commit pin in each app that needs it. Never leave `dist/` stale.

## Layout

- `src/kit/` - scale, KitProvider/skin, useWindowSize (hydration-safe), and the controls.
- `src/shell/` - Shell, Header (doc / hero / workbench), Rail + Drawer, Footer, DocSection.
- `src/index.ts` - the single public surface (kit + shell).
