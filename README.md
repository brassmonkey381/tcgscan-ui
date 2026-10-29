# tcgscan-ui

The page shell and control kit for the TCGScan apps. See `AGENTS.md` for the rules and the
release steps, and `../docs/PAGE-SHELL-HANDOFF.md` (workspace) for the design numbers.

```tsx
import { KitProvider, Shell, Button } from 'tcgscan-ui';
```

Each app wraps its tree in `KitProvider` with its tcgscan-theme palette and a `KitSkin`
(radius per role, display face, primary shadow), then renders pages in `Shell`.
