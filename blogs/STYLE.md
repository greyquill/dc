# Greyquill blog — style & authoring guide

Scope: the `blogs/` folder only. Every post here shares one look so the blog reads as a
single senior voice. This doc is the source of truth for that look and for how a post is
assembled. It pairs with the *copy* rules in the marketing spokesperson prompt (voice,
no em-dashes, no overclaiming, escalation gates) — this file governs **design and
structure**; that prompt governs **words**.

## The look (decided)

Clean, senior, enterprise. Restraint is the brand — these are regulated-enterprise buyers
(auditors, risk officers, CDOs), not a consumer feed. Deliberately **not** the cream /
serif "editorial" aesthetic. Colors and type match **greyquill.io** exactly.

- **Canvas:** white, one readable column (~700px), generous line spacing.
- **Brand blue:** `#0B4F88` (from the site) for the wordmark, headings, and links; hover
  and decorative accents use `#1a6bb5`.
- **Ink:** `#0A1628` (the site's brand ink) for body text.
- **Mist:** `#EEFBFF` light wash for callout boxes.
- **Type (self-hosted, matching the site):** **Sora** for headings/display, **Inter** for
  body. The woff2 files live in `assets/fonts/` — no CDN, nothing external to break.
- **Light + dark mode:** a real toggle sits in the site bar on every blog screen. It
  defaults to the reader's OS setting and remembers their choice (localStorage). Both
  themes are driven by CSS tokens — don't hard-code colors in a post; use the
  elements/classes below and they adapt to whichever theme is active.

All of this lives in one file: [`assets/blog.css`](assets/blog.css), with the toggle logic
in [`assets/theme.js`](assets/theme.js). A post never carries its own `<style>` block,
inline colors, or scripts — that's what keeps the blog consistent.

## How a post is assembled

1. Copy [`_template.html`](_template.html) to `blogs/<slug>.html` (kebab-case slug).
2. Fill the placeholders: `{{TITLE}}`, `{{DECK}}` (one-line takeaway), `{{AUTHOR}}`
   (**default: Amarnath Bagineni** — always shown in the byline), `{{DATE}}`,
   `{{READING_TIME}}`, `{{SLUG}}` (must equal the filename), and `{{BODY}}`.
3. Write the body as plain semantic HTML using the vocabulary below.
4. Served at `https://www.greyquill.io/dc/blogs/<slug>.html`.

The template already includes the canonical URL and Open Graph tags, so the link previews
correctly when the matching LinkedIn post is shared.

## Body markup vocabulary

Use these and only these — they're all styled by `blog.css`:

| Element | Use for |
|---|---|
| `<h2>` / `<h3>` | Section and sub-section headers (descriptive, so a skimmer gets the arc) |
| `<p>` | One idea per paragraph; break up walls of text |
| `<ul>` / `<ol>` | Lists |
| `<blockquote>` | A pull quote — one of the sharpest lines, for rhythm |
| `<figure><img alt="…"><figcaption>…</figcaption></figure>` | Images. `alt` is required; caption optional |
| `<pre><code>…</code></pre>` / `<code>` | Code or fixed-width content |
| `<table>` | Tabular data (scrolls on mobile automatically) |
| Key-takeaways box | See below |

**Key-takeaways / callout box** (near the top or bottom of a longer piece):

```html
<aside class="callout">
  <div class="callout__label">Key takeaways</div>
  <ul>
    <li>…</li>
  </ul>
</aside>
```

## Rules

- **No `<style>` blocks, no inline `style=""`, no hard-coded colors in a post.** The whole
  point is consistency — the shared stylesheet owns all of that.
- **No external resources** (remote fonts, CDNs, trackers, remote images). Everything is
  local under `blogs/assets/` — the fonts, the stylesheet, and the one shared `theme.js`.
  The only scripts a post carries are the shared theme toggle (the `theme.js` link and the
  tiny inline no-flash snippet, both already in `_template.html`) — never a per-post script.
- **Every image has meaningful `alt` text**, and is a licensed / original / generated
  asset (never client or copyrighted imagery). Charts use real, grounded data.
- The copy rules still apply: **no em-dashes**, no invented metrics, no named clients or
  competitors, escalation-gated claims held for sign-off. See the spokesperson prompt.

## Adding a post to the index

`index.html` lists posts. When publishing, prepend one card (newest first) — the markup to
copy is in an HTML comment at the top of the post list in `index.html`.
