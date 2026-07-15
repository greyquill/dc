# Greyquill blog — style & authoring guide

Scope: the `blogs/` folder only. Every post here shares one look so the blog reads as a
single senior voice. This doc is the source of truth for that look and for how a post is
assembled. It pairs with the *copy* rules in the marketing spokesperson prompt (voice,
no em-dashes, no overclaiming, escalation gates) — this file governs **design and
structure**; that prompt governs **words**.

## The look (decided)

Clean, senior, enterprise. Restraint is the brand — these are regulated-enterprise buyers
(auditors, risk officers, CDOs), not a consumer feed. Deliberately **not** the cream /
serif "editorial" aesthetic.

- **Canvas:** white, one readable column (~700px), generous line spacing.
- **Brand color:** primary-dark navy `#083D6A` for the wordmark and every heading.
- **Accent:** blue `#5A9FD4` / `#2F7FC4` for links, rules, and callout edges. Used
  sparingly.
- **Type:** a system sans stack (no web fonts, no CDNs — nothing external to break).
- **Dark mode:** automatic via `prefers-color-scheme`. Don't hard-code colors in a post;
  use the elements/classes below and they adapt.

All of this lives in one file: [`assets/blog.css`](assets/blog.css). A post never carries
its own `<style>` block or inline colors — that's what keeps the blog consistent.

## How a post is assembled

1. Copy [`_template.html`](_template.html) to `blogs/<slug>.html` (kebab-case slug).
2. Fill the placeholders: `{{TITLE}}`, `{{DECK}}` (one-line takeaway), `{{DATE}}`,
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
- **No external resources** (fonts, scripts, trackers, remote images). Images are local
  files under `blogs/assets/`.
- **Every image has meaningful `alt` text**, and is a licensed / original / generated
  asset (never client or copyrighted imagery). Charts use real, grounded data.
- The copy rules still apply: **no em-dashes**, no invented metrics, no named clients or
  competitors, escalation-gated claims held for sign-off. See the spokesperson prompt.

## Adding a post to the index

`index.html` lists posts. When publishing, prepend one card (newest first) — the markup to
copy is in an HTML comment at the top of the post list in `index.html`.
