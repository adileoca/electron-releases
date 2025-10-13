# Agent Notes

## Observability

- Use `logDebug`, `logInfo`, `logWarn`, and `logError` from `src/lib/logging.ts` for structured logs. They noop in production builds but appear in development (browser console & Electron log).
- When adding logs, prefer a short label plus a small payload object (`logDebug("orders-fetch-start", { key, reason })`); this keeps the log stream readable.
- Long running background behaviours (fetch retries, realtime events, cache invalidations) should emit at least a start/success/error log trio.
- Electron logs live in `logs/electron-dev.log`. Tail them while testing to spot loops or excessive refreshes.
- You can raise/lower verbosity with `localStorage.setItem("log-level", "info|warn|error|debug")` (defaults to `debug` in development, `warn` in production).

## Data Fetching & Caching

- Shared query caching lives in `src/lib/cache/QueryCache.ts`. Always build cache keys via `createCacheKey(namespace, payload)` to guarantee stable ordering.
- Hooks should call `sharedQueryCache.get` to hydrate from cache before issuing network calls. Compare the cached object against current state before calling `setState` to avoid render loops.
- Use the safe setters (`setUpdatingSafe`, `setShouldRefreshSafe`) pattern when you need to toggle context booleans frequently. This prevents dispatching identical values and causing depth errors.
- When wiring realtime handlers, invalidate the cache via `sharedQueryCache.invalidatePrefix("<namespace>:")`, then queue a refresh if a fetch is already running.

## UI Patterns

- Pagination components expect a loading flag (`state.updating`). Leave it `true` while a background refresh is running so the spinner is shown, but toggle with the safe setters to avoid flicker.
- When multiple views share the same pagination affordances, build small composable pieces (`PaginationRoot`, `PaginationSection`, `PaginationButton`, etc.) inside `src/components/pagination`. Keep the default styling consistent (orders view sets the baseline) and expose props so individual screens can override width, spacing, or button treatments without copy/pasting layout code.

## Development Flow

1. Tail `logs/electron-dev.log` while testing complex behaviour.
2. Add debug logs around new data pipelines.
3. Run `npm run lint` before handing off.

## Photoshop Plugin Automation

- Use `npm run plugin:update -- --bump <patch|minor|major>` to bump the Photoshop plugin, rebuild it, and refresh `assets/plugin/package_PS.ccx`. Works when the app and plugin folders share the same parent; pass `--plugin-dir` if the plugin lives elsewhere. Add `--dry-run` to inspect the changes without writing files.
- Use `npm run build -- --update-plugin` (or the same flag with `npm run deploy`) to bump and rebuild the Photoshop plugin right before the desktop build. Append `--plugin-bump`, `--plugin-version`, `--plugin-dir`, or `--plugin-dry-run` to control the plugin update step, and `--dry-run` to preview the full release flow.
- Add `--app-bump <patch|minor|major|prerelease>` (or `--app-version <x.y.z>`) when running `npm run build` / `npm run deploy` to bump the Electron app version before building. Combine with `--app-dry-run` or the top-level `--dry-run` to skip writing to `package.json`.

Feel free to extend this doc with any new conventions introduced by future work.
