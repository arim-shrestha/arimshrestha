# Deploying to GitHub Pages (manual)

The site is a fully static Next.js export. `npm run build` writes it to `dist/`. Its contents are published to the root of the `gh-pages` branch of `Areem-Shrestha/Arim`, which serves `arimshrestha.com.np`.

- **Source code:** `main` branch, this `frontend/` folder. `dist/` is git-ignored and is never committed here.
- **Published site:** `gh-pages` branch. It holds only the **contents** of `dist/`, at the branch root.
- **Publish folder:** `../arim-gh-pages`, a separate local clone of `gh-pages` next to `frontend/`. This keeps the source and the build output apart.

`public/CNAME` (`arimshrestha.com.np`) and `public/.nojekyll` are copied into `dist/` on every build. Without `.nojekyll`, GitHub Pages hides the `_next/` folder and the site loads unstyled.

---

## 1. Before the first deploy

Check these once, so you don't replace a site that is already live.

1. Open **github.com/Areem-Shrestha/Arim → Settings → Pages** and note:
   - **Source.** If it already deploys from another branch or folder, or uses "GitHub Actions", decide whether to switch before going further. Switching to `gh-pages` takes the old source offline.
   - **Custom domain.** It should be `arimshrestha.com.np`.
   - **Visibility.** Pages on a private repository needs a paid plan. If the repository is private and Pages is unavailable, make it public or upgrade.
2. Check whether a `gh-pages` branch already exists:

   ```bash
   git ls-remote --heads https://github.com/Areem-Shrestha/Arim.git gh-pages
   ```

   If this prints a line, the branch exists and may hold the current live site. Its history is your rollback point, so never force-push over it.

3. Connect this source folder to GitHub, if it isn't already connected:

   ```bash
   cd /Users/arimshrestha/Desktop/portfolio/frontend
   git remote -v                     # empty means no remote yet
   git remote add origin https://github.com/Areem-Shrestha/Arim.git
   ```

## 2. Build

```bash
cd /Users/arimshrestha/Desktop/portfolio/frontend
npm ci            # clean install from package-lock.json
npm run lint
npm run build     # writes dist/
```

Check the output:

```bash
ls -a dist        # should list index.html, 404.html, _next, CNAME, .nojekyll, favicon.ico
cat dist/CNAME    # arimshrestha.com.np
```

Optionally, preview it the way GitHub Pages will serve it:

```bash
python3 -m http.server 4173 -d dist
# open http://localhost:4173 and click through the site, then press Ctrl+C
```

## 3. Publish the contents of `dist/` to `gh-pages`

### First time only: create the publish folder

**If `gh-pages` already exists** (step 1.2 printed a line):

```bash
cd /Users/arimshrestha/Desktop/portfolio
git clone --branch gh-pages --single-branch https://github.com/Areem-Shrestha/Arim.git arim-gh-pages
```

**If it doesn't exist yet:**

```bash
cd /Users/arimshrestha/Desktop/portfolio
mkdir arim-gh-pages && cd arim-gh-pages
git init -b gh-pages
git remote add origin https://github.com/Areem-Shrestha/Arim.git
```

### Every deploy

```bash
cd /Users/arimshrestha/Desktop/portfolio/arim-gh-pages
git pull --ff-only origin gh-pages 2>/dev/null || true   # sync if the branch exists

# Replace everything except .git with the new build
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R ../frontend/dist/. .

ls -a                     # CNAME, .nojekyll, index.html and _next must be at the top level
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -u origin gh-pages
```

`cp -R ../frontend/dist/. .` copies what is *inside* `dist/`. The branch must not end up with a nested `dist/` folder, because Pages only serves the branch root or `/docs`.

## 4. Configure Pages (first time only)

1. **Settings → Pages → Build and deployment → Source:** choose **Deploy from a branch**.
2. **Branch:** `gh-pages`, folder **/(root)**, then **Save**.
3. **Custom domain:** `arimshrestha.com.np`, then **Save**. The `CNAME` file in the build keeps this setting in place on every deploy.
4. Once the DNS check passes, tick **Enforce HTTPS**. The certificate can take up to about an hour to be issued.

DNS stays with your domain provider. GitHub's custom-domain guide lists the records it needs: apex `A`/`AAAA` records, plus a `www` `CNAME` pointing to `areem-shrestha.github.io` if you also want `www` to work.

## 5. Verify the live site

The **Actions** tab shows a "pages build and deployment" run after each push. Wait for it to turn green, then:

- [ ] `https://arimshrestha.com.np` loads over HTTPS with no certificate warning.
- [ ] `http://` redirects to `https://`.
- [ ] Styles, fonts (Poppins, Clash Display) and animations load. In DevTools → Network, filter on `_next` and check there are no 404s.
- [ ] Every navbar link scrolls to its section, on desktop and in the mobile menu.
- [ ] The theme switcher works, and the logo and colours change between light and dark.
- [ ] The CV downloads (`/arim-shrestha-cv.pdf`).
- [ ] Project images and the Fotoghar video load.
- [ ] Email, phone and social links open correctly.
- [ ] The tab icon appears. Use a private window if your browser shows an old one.
- [ ] A made-up path such as `/nope` shows the site's 404 page.

## 6. Updating the site later

1. Edit the content in `src/data/*.json` or the code.
2. `npm run lint && npm run build`
3. Repeat **every deploy** from step 3.

If you change the favicon, bump `?v=2` in `src/app/layout.tsx` so browsers fetch the new one.

## 7. Rolling back

Each deploy is one commit on `gh-pages`, so going back means reverting it. This keeps the history and needs no force-push.

```bash
cd /Users/arimshrestha/Desktop/portfolio/arim-gh-pages
git log --oneline -5           # find the bad deploy
git revert --no-edit HEAD      # or: git revert --no-edit <commit>
git push origin gh-pages
```

Pages redeploys the previous version within a minute or two. Fix the problem in the source, rebuild, and deploy again.
