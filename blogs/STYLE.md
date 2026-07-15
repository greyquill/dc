# Greyquill blog — style & authoring guide

Scope: the `blogs/` folder only. Every post here shares one look so the blog reads as a
single senior voice. This doc governs **design and structure**; the marketing spokesperson
prompt governs **words** (voice, no em-dashes, no overclaiming, escalation gates).

## The look (decided)

Clean, senior, enterprise. Restraint is the brand — these are regulated-enterprise buyers
(auditors, risk officers, CDOs), not a consumer feed. Colors and type match **greyquill.io**
exactly; structure borrows from professional-services references (Deloitte, McKinsey) with
**IBM Carbon** cues (sharp 2px corners, category chips, grid).

- **Brand blue** `#0B4F88` (wordmark, headings, links), hover/accent `#1a6bb5`.
- **Ink** `#0A1628` for body text; **mist** `#EEFBFF` for callouts.
- **Type (self-hosted):** **Sora** headings, **Inter** body — the site's fonts, in
  `assets/fonts/`. No CDNs, nothing external.
- **Light + dark toggle** in the site bar on every blog screen; defaults to the OS setting,
  remembers the reader's choice. Both themes come from CSS tokens — never hard-code a color.

Everything lives in `assets/blog.css` (styles) and `assets/blog.js` (theme toggle + share).
A post carries no `<style>` block, no inline colors, and no scripts of its own.

## Article page structure (McKinsey-style header)

Top of every article, in this order — **no author byline is shown** (see below):

1. **Category eyebrow** — `<p class="eyebrow">{{CATEGORY}}</p>` (what the piece is about).
2. **Title** — `<h1 class="post__title">`.
3. **Deck** — one-line standfirst, `<p class="post__deck">`.
4. **Meta row** — date & time of posting on the left, **share buttons** on the right,
   with a **divider** underneath (`.post__headmeta`).
5. **Body** — `<article class="post__body">`.

**Author:** every post still carries the author in metadata (`<meta name="author">` and
`article:author`, default **Amarnath Bagineni**) for attribution and link previews, but it
is **not shown** in the header. Matches the McKinsey pattern.

**Share:** LinkedIn, X, Facebook, Email, and Copy-link. The buttons are in the template;
`blog.js` wires them at runtime from the canonical URL and title. No third-party scripts.

## Index page structure (Deloitte / McKinsey grid)

`index.html` is a **wide** hero + a card grid (`.blog-index`, `.blog-hero`, `.card-grid`):

- A **featured** card (`.card.card--featured`, media beside body on wide screens) for the
  latest post.
- A responsive grid of `.card`s, each with `.card__media` (image), a `.card__cat` category
  chip, `.card__title`, and `.card__meta` (date). Newest first.
- On publish, add a card for the new post and rotate the featured slot.

## Categories (McKinsey-style taxonomy)

One primary category per post, shown in the eyebrow and the index chip. Pick from
**industries** or **capabilities** — whatever an industry or business reader relates to:

- **Industries:** Financial Services · Healthcare & Life Sciences · Retail & Consumer ·
  Telecommunications, Media & Technology · Public Sector · Energy & Materials ·
  Travel, Logistics & Infrastructure · Manufacturing
- **Capabilities:** AI & Analytics · Data & Governance · Risk & Resilience ·
  Digital & Technology Transformation · Operations · Strategy & Corporate Finance ·
  Sustainability

Extend the list as real topics appear; keep labels business-legible, not internal jargon.

## How a post is assembled

1. Copy `_template.html` to `blogs/<slug>.html` (kebab-case slug).
2. Fill placeholders: `{{CATEGORY}}`, `{{TITLE}}`, `{{DECK}}`, `{{DATETIME}}` (date **and**
   time of posting), `{{SLUG}}` (must equal the filename), `{{BODY}}`, and `{{AUTHOR}}`
   (metadata only, default Amarnath Bagineni).
3. Write the body with the vocabulary below.
4. Add the post's card to `index.html` (featured or grid).

## Body markup vocabulary

| Element | Use for |
|---|---|
| `<h2>` / `<h3>` | Section and sub-section headers |
| `<p>` | One idea per paragraph |
| `<ul>` / `<ol>` | Lists |
| `<blockquote>` | A pull quote |
| `<figure><img alt="…"><figcaption>…</figcaption></figure>` | Images (alt required) |
| `<aside class="callout"><div class="callout__label">Key takeaways</div>…</aside>` | Callout box |
| `<pre><code>…</code></pre>` / `<code>` | Inline or simple code |
| `<table>` | Tabular data |

## Drop-in components

Paste these blocks into the body and fill the content — the shared CSS/JS renders them.

**Header / cover image** (optional; sits under the header, above the body — the slot is
commented in `_template.html`):

```html
<figure class="post__cover"><!-- add "post__cover--bleed" for a full-width banner -->
  <img alt="Describe the cover" src="assets/<slug>-cover.jpg">
  <figcaption>Optional caption.</figcaption>
</figure>
```

**Image** (with caption):

```html
<figure>
  <img alt="Meaningful description" src="assets/<slug>-figure.png">
  <figcaption>Caption.</figcaption>
</figure>
```

**Code snippet** (language label + copy button, handled by `blog.js`):

```html
<figure class="code">
  <figcaption class="code__bar">
    <span class="code__lang">python</span>
    <button class="code__copy" type="button" aria-label="Copy code">Copy</button>
  </figcaption>
  <pre><code>print("hello")</code></pre>
</figure>
```

**YouTube video** (click-to-load; author supplies only the video id):

```html
<div class="video" data-yt="VIDEO_ID" data-title="Short title"
     data-poster="assets/<slug>-poster.jpg"><!-- data-poster optional --></div>
```

The video shows a branded play panel and loads nothing from YouTube until the reader
clicks; it then embeds via `youtube-nocookie.com`. **This is the one sanctioned external
embed** — an explicit exception to "no external resources", because video needs it. A
local `data-poster` keeps the pre-click state fully self-contained; omit it for a plain
brand panel.

## Rules

- **No `<style>` blocks, no inline `style=""`, no hard-coded colors in a post.** The shared
  stylesheet owns all of that, in both light and dark themes.
- **No external resources** (remote fonts, CDNs, trackers, remote images). Everything is
  local under `blogs/assets/`. The only scripts are the shared `blog.js` and the tiny
  inline no-flash snippet, both already in the template — never a per-post script. The one
  sanctioned exception is the **YouTube component**, which loads `youtube-nocookie.com`
  only after the reader clicks play.
- **Every image has meaningful `alt`**, and is licensed / original / generated (never client
  or copyrighted). Charts use real, grounded data.
- Copy rules still apply: **no em-dashes**, no invented metrics, no named clients or
  competitors, escalation-gated claims held for sign-off.
