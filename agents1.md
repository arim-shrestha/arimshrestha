# AGENTS.md — ARIM Portfolio: Manual GitHub Pages Deployment

## Project context
- Project: Arim Shrestha personal portfolio, built with Next.js.
- Intended production domain: `arimshrestha.com.np`.
- Existing GitHub repository: `Areem-Shrestha/Arim`.
- Deployment choice: **manual static export**, not GitHub Actions.
- Preserve the existing portfolio design, dark/light mode, navigation, animations, responsive layouts, and ARIM branding.

## Your task
Inspect the repository first. Make the **smallest safe changes** needed to build a fully static site compatible with GitHub Pages. Do not assume the Next.js version, router, package manager, existing config, or branch name. Report what you find before changing behavior.

## Requirements
1. Identify the Next.js version and current build scripts. Update the existing `next.config.js`, `next.config.mjs`, or `next.config.ts` rather than creating a conflicting second config.
2. Enable `output: 'export'` and `images: { unoptimized: true }` if needed. Consider `trailingSlash: true` to make static routes work predictably.
3. Since the site uses a **custom apex/subdomain** (`arimshrestha.com.np`) rather than a GitHub Pages project URL, do **not** add a repository-name `basePath` or `assetPrefix` unless evidence shows it is necessary.
4. Audit every route and feature for static-export compatibility. Replace or clearly flag any unsupported dynamic server feature, including runtime SSR, API routes, Server Actions, middleware, request-time cookies/headers, dynamic routes without static params, or Next.js image optimization. Do not silently remove features.
5. Check local navigation, links, downloads, images, fonts, CSS, JavaScript, theme switching, and client-side interactions. Keep contact forms functional only if they use a supported external/client-side service; never expose secrets in client bundles.
6. Ensure `public/CNAME` contains exactly `arimshrestha.com.np` (one line) so it is copied into the export's root. If there is already a CNAME elsewhere, reconcile it without duplicates.
7. Ensure `public/.nojekyll` exists so GitHub Pages serves Next.js `_next` assets correctly. Verify both `CNAME` and `.nojekyll` appear in `out/` after building.
8. Run the project's actual install/build commands and fix any export errors. Confirm `out/index.html`, `out/_next/`, `out/CNAME`, and `out/.nojekyll` exist. If a command cannot run, state why and give the exact next command.
9. Do not commit generated `out/` to the source branch unless explicitly asked. Do not delete or overwrite the old deployed site without confirmation.
10. Do not add GitHub Actions, change DNS, change the custom domain, or push/deploy automatically. Do not touch repository secrets or credentials.

## Manual deployment approach
The preferred manual deployment is a dedicated publishing branch such as `gh-pages` with the **contents of `out/` at the branch root**, selected in GitHub **Settings → Pages → Deploy from a branch → gh-pages → /(root)**. Do not upload the `out` folder as a nested folder. GitHub Pages branch publishing supports the branch root or `/docs`, not an arbitrary `/out` folder.

Before publishing, inspect the current GitHub Pages source, existing deployment branch, and custom domain to avoid accidentally replacing an unrelated site. A private repository may have plan-dependent Pages restrictions; verify in GitHub Settings rather than assuming it will work.

If the current source is already configured for a different publishing branch, explain the necessary change and ask before modifying it. Do not force-push or delete branch history without explicit approval.

## Expected deliverables
- Minimal Next.js config changes for static export.
- Any narrowly scoped compatibility fixes, with explanation.
- A working `npm run build` (or the project's actual package-manager equivalent) producing `out/`.
- A `DEPLOY_GITHUB_PAGES.md` file with step-by-step manual instructions for this repository, including:
  - How to build locally.
  - How to publish only the **contents** of `out/` to the configured Pages branch root (using safe Git commands or GitHub UI where feasible).
  - How to configure Pages branch/root and verify the custom domain.
  - How to validate deployment, HTTPS, assets, navigation, and light/dark mode.
  - How to update the site next time.
  - How to roll back safely if the new deployment fails.
- A final report listing changed files, build results, remaining limitations, and the exact manual commands the user should execute.

## Working style
- Read before editing; avoid broad refactors.
- Keep the current visual identity unchanged.
- Prefer small, reviewable diffs.
- Explain risks before destructive operations.
- Never claim deployment succeeded unless it has actually been verified on the live domain.
