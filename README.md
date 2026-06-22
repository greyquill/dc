# dc — Greyquill Document Center

Public document publishing space for Greyquill. Anything committed here is served
statically over HTTPS via GitHub Pages, behind the `www.greyquill.io` custom domain.

## URL scheme

```
https://www.greyquill.io/dc/<project>/<document>.<ext>
```

- `<project>` — one folder per client / engagement / topic (kebab-case).
- `<document>` — the file itself: `.html`, `.pdf`, images, etc.
- The apex `greyquill.io/dc/...` redirects to the `www` canonical.

Example:

```
https://www.greyquill.io/dc/acme-corp/proposal-2026.pdf
https://www.greyquill.io/dc/acme-corp/estimate-q3.html
```

## Publishing a document

```bash
git clone https://github.com/greyquill/dc.git
cd dc
mkdir -p <project>
cp ~/path/to/proposal.pdf <project>/
git add <project> && git commit -m "Add <project> proposal" && git push
```

Pages rebuilds within ~1 minute. The URL is live immediately after.

## Notes

- This repo is **public**. Do not commit anything you would not share with a
  customer or investor. There is no access control on published URLs — treat
  them as unlisted, not secret.
- `.nojekyll` is present so files and folders are served verbatim (no Jekyll
  processing, underscore-prefixed names work, PDFs/assets serve raw).
- Do **not** add a `CNAME` file here — the domain is inherited from the
  `greyquill.github.io` user site. A CNAME would break the `/dc/` path routing.
