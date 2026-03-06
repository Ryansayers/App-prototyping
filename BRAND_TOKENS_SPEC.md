# Brand Tokens & Front-End Architecture — Technical Specification

## 1. Architecture Overview

The app is a **React + Vite SPA** rendered as a fixed 390×844px mobile frame centred on a desktop viewport. It has two independent entry points sharing the same CSS token system:

| URL | Entry | Purpose |
|---|---|---|
| `/` | `App.jsx` | Live app prototype |
| `/brand-tokens` | `BrandTokens.jsx` | Token reference & brand configurator |

Routing between pages within `/` is **state-based** (`useState` in `App.jsx`) — no router library. Navigation between `/` and `/brand-tokens` is a full page reload.

---

## 2. CSS Token Architecture — 3 Tiers

```
primitives.css  →  semantic.css  →  components.css
   (raw scale)       (intent)        (per-component)
```

### Tier 1 — Primitives (`src/tokens/primitives.css`)

Raw, semantic-free values. **Never referenced directly in component CSS.**

- **Colour scales** — generated from 3 seed variables:
  - `--color-primary-h` / `--color-primary-s`
  - `--color-secondary-h` / `--color-secondary-s`
  - `--color-neutral-h` / `--color-neutral-s`
- Each scale has stops: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900` (neutral adds `0`)
- Lightness stops are **fixed** in CSS: `96%, 92%, 83%, 72%, 60%, 52%, 38%, 28%, 19%, 12%`
- **Typography:** `--font-body` (default: `'Ubuntu', sans-serif`)
- **Border radius scale:** `--radius-xs` (8px) → `--radius-app` (40px) → `--radius-pill` (99px)
- **Stroke widths:** `--stroke-width-1` (1px) → `--stroke-width-4` (3px)
- **Functional colours:** `--color-success-500`, `--color-warning-500`, `--color-danger-500`, `--color-info-500` (hardcoded hex, not brand-driven)

### Tier 2 — Semantic (`src/tokens/semantic.css`)

Intent-based aliases. All values reference Tier 1 primitives.

| Group | Tokens |
|---|---|
| Brand | `--color-brand`, `--color-brand-hover`, `--color-brand-active`, `--color-brand-subtle`, `--color-brand-tint` |
| Accent | `--color-accent`, `--color-accent-hover`, `--color-accent-subtle`, `--color-accent-tint` |
| Text | `--color-text-primary/secondary/tertiary/muted/subtle/disabled/on-brand/link` |
| Surface | `--color-surface-default/subtle/raised/overlay/brand/brand-tint/accent-tint` |
| Background | `--color-bg-page`, `--color-bg-app` |
| Border | `--color-border-default/strong/brand/brand-tint/on-surface` |
| Radius | `--radius-control`, `--radius-card`, `--radius-tab`, `--radius-fab`, `--radius-app-shell` |
| Shadow | `--shadow-card`, `--shadow-app-shell`, `--shadow-progress-track` |

### Tier 3 — Components (`src/tokens/components.css`)

Per-component aliases referencing Tier 2 only. Override this layer to skin individual components without touching brand intent.

| Component | Key Tokens |
|---|---|
| App Shell | `--app-bg`, `--app-shadow`, `--app-radius` |
| StatusBar | `--statusbar-text`, `--statusbar-icon` |
| Header | `--header-title-color`, `--header-home-bg`, `--header-icon-btn-*`, `--header-notif-dot-*` |
| BottomNav | `--nav-item-color`, `--nav-item-active-color`, `--nav-avatar-bg/color` |
| Button | `--btn-primary-bg/color/radius/ring`, `--btn-ghost-color/radius` |
| FAB | `--fab-bg`, `--fab-ai-bg`, `--fab-color`, `--fab-radius`, `--fab-shadow` |
| Feed Tabs | `--feed-tab-bg/color`, `--feed-tab-active-bg/color/stroke`, `--feed-tab-count-*` |
| NewsCard | `--nc-bg/shadow/radius`, `--nc-tag-*`, `--nc-badge-*`, `--nc-title/desc/time-color` |
| RecognitionCard | `--rc-bg/shadow/radius`, `--rc-you-*`, `--rc-avatar-*`, `--rc-value-radius` |
| SaveButton | `--save-btn-color`, `--save-btn-saved-color` |
| CTA Cards | `--cta-discounts-bg`, `--cta-rewards-bg`, `--cta-color`, `--cta-btn-bg/radius` |
| Shop Card | `--shop-card-bg/radius`, `--shop-thumb-*`, `--shop-tag-*`, `--shop-price-color` |
| Search | `--search-stroke-color/focus`, `--search-radius` |
| Goal Progress | `--goal-track-bg`, `--goal-bar-fill` |

---

## 3. Theming System

Three parallel mechanisms — all override the same semantic token set:

| Mechanism | Selector | Use case |
|---|---|---|
| OS system preference | `@media (prefers-color-scheme: dark)` | Automatic |
| Explicit dark | `:root[data-theme="dark"]` | Manual toggle |
| Explicit light | `:root[data-theme="light"]` | Manual toggle |

`data-theme` is set on `<html>` by `applyTheme()`. Value `"system"` removes the attribute, letting the media query take over.

### Dark Mode Token Overrides (semantic layer)

| Token | Light | Dark |
|---|---|---|
| `--color-text-primary` | `rgba(0,0,0,0.90)` | `rgba(255,255,255,0.95)` |
| `--color-text-secondary` | `rgba(0,0,0,0.72)` | `rgba(255,255,255,0.80)` |
| `--color-text-tertiary` | `rgba(0,0,0,0.56)` | `rgba(255,255,255,0.65)` |
| `--color-text-muted` | `rgba(0,0,0,0.55)` | `rgba(255,255,255,0.50)` |
| `--color-text-subtle` | `rgba(0,0,0,0.44)` | `rgba(255,255,255,0.35)` |
| `--color-text-disabled` | `rgba(0,0,0,0.24)` | `rgba(255,255,255,0.24)` |
| `--color-text-link` | `primary-700` | `primary-300` |
| `--color-surface-default` | `neutral-0` (#fff) | `neutral-800` |
| `--color-surface-subtle` | `neutral-50` | `neutral-700` |
| `--color-surface-raised` | `neutral-100` | `neutral-600` |
| `--color-bg-page` | `neutral-100` | `neutral-900` |
| `--color-border-default` | `neutral-200` | `rgba(255,255,255,0.10)` |
| `--color-border-strong` | `neutral-300` | `rgba(255,255,255,0.18)` |
| `--shadow-app-shell` | `0 20px 60px rgba(0,0,0,0.2)` | `0 20px 60px rgba(0,0,0,0.6)` |

### Dark Mode Component Overrides (component layer)

| Token | Light | Dark | Reason |
|---|---|---|---|
| `--btn-primary-ring` | `none` | `0 0 0 1.5px rgba(255,255,255,0.22)` | WCAG 1.4.11 non-text contrast |
| `--header-home-bg` | `primary-50→100 gradient` | `primary-900→800 gradient` | Surface contrast |
| `--cta-discounts-bg` | `primary-100→300` | `primary-700→900` | Legibility on dark |
| `--cta-rewards-bg` | `secondary-100→300` | `secondary-700→900` | Legibility on dark |
| `--cta-color` | `#000000` | `#ffffff` | Text on inverted CTA |
| `--nav-item-active-color` | `#000000` | `#ffffff` | Active nav contrast |
| `--feed-tab-active-color` | `#000000` | `#ffffff` | Active tab contrast |
| `--save-btn-color` | `#000000` | `#ffffff` | Icon visibility |

---

## 4. Brand Seed System (`src/seeds.js`)

The three CSS seed variables are the **only values a developer changes to rebrand**. All colour scales and semantic tokens cascade from them automatically.

```js
// Runtime application
applySeeds({ primary, secondary, neutral })
// Sets --color-primary-h, --color-primary-s,
//      --color-secondary-h, --color-secondary-s,
//      --color-neutral-h, --color-neutral-s on <html>
```

### Primary Presets

| Label | H | S |
|---|---|---|
| Light Cobalt (default) | 192 | 100% |
| Smarter Legacy | 214 | 85% |
| Edenred+ | 256 | 86% |
| Eden Cobalt | 209 | 100% |
| Boom Blue | 196 | 100% |
| Boom Orange | 21 | 88% |
| Indigo | 245 | 80% |
| Emerald | 152 | 76% |
| Amber | 38 | 95% |
| Rose | 346 | 84% |
| Next Big Stone | 45 | 12% |

### Secondary Presets

| Label | H | S |
|---|---|---|
| Blue-Purple (default) | 239 | 65% |
| Smarter Legacy | 244 | 72% |
| Edenred+ | 222 | 56% |
| Eden Violet | 263 | 100% |
| Eden Mint | 169 | 100% |
| Eden Olive | 80 | 95% |
| ER - depreciate | 349 | 100% |
| Boom Amber | 42 | 100% |
| Boom Green | 109 | 61% |
| Pink | 330 | 80% |
| Teal | 174 | 72% |
| Sky | 204 | 90% |
| Violet | 270 | 76% |
| Next Pacific Blue | 192 | 100% |

### Neutral Presets

| Label | H | S |
|---|---|---|
| Cyan tint (default) | 192 | 20% |
| Smarter Legacy | 220 | 8% |
| Warm | 30 | 15% |
| Cool Slate | 220 | 12% |
| Pure Grey | 0 | 0% |
| Rose tint | 346 | 10% |
| Green tint | 152 | 12% |
| Next Cool Navy-Tinted Grey | 205 | 10% |

---

## 5. Brand Logo

Defined in `LOGO_PRESETS` in `seeds.js`. The selected logo is displayed in `Header.jsx` on the home screen and in the Brand Tokens configurator.

| Label | Source |
|---|---|
| None | — |
| Boom | `/public/boom.svg` |
| Next | `/public/logo-next.svg` |

- Persisted to `localStorage('brand-logo')`
- Default: `1` (Boom)
- `Header.jsx` reads `loadLogo()` on every page load
- Logo rendered at `height: 32px; width: auto` — both light and dark mode handled via `filter: brightness(0) invert(1)` in dark

---

## 6. App Background Presets

Each preset has a `value` (light mode) and `darkValue` (dark mode). `applyBg()` selects the correct value based on `isDarkMode()`.

| Label | Light | Dark |
|---|---|---|
| None | — | — |
| Aura | Radial primary+secondary (75%/78%L) | Radial primary+secondary (20%/22%L) |
| Boom Orange | `hsl(30,80%,92%)` gradient | `hsl(30,50%,14%)` gradient |
| Boom Blue Glow | Radial primary (82%L) | Radial primary (22%L) |
| Smarter Mist | Purple linear (91–95%L) | Purple linear (12–16%L) |
| Indigo Haze | Radial indigo (86–88%L) | Radial indigo (20–22%L) |
| Blue Purple | `#F1F7FF → #F1E8FF` left→right | `hsl(214,35%,13%) → hsl(280,35%,13%)` |
| Custom Image | URL (user-provided) | Same URL |

---

## 7. CTA Card Backgrounds

Separate preset lists per card type, both supporting gradients and custom image URLs.

- **Discounts:** `CTA_DISCOUNTS_PRESETS` → sets `--cta-discounts-bg`
- **Rewards:** `CTA_REWARDS_PRESETS` → sets `--cta-rewards-bg`

Shared options: None, Coral, Ocean, Forest, Sunset, Lavender, Plum, Deep Violet, Custom Image. Each card type has one unique branded option (Smarter Legacy image).

---

## 8. Font Presets

| Label | Value |
|---|---|
| Ubuntu (Brand) | `'Ubuntu', sans-serif` |
| SF Pro | `-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif` |
| Roboto | `'Roboto', sans-serif` |

Applied via `applyFont(idx)` which sets `--font-body` on `<html>`. Loaded on both page entries in `main.jsx`.

---

## 9. Persistence

All brand settings stored in `localStorage`, rehydrated in `main.jsx` **before React renders**:

| Key | Type | Default |
|---|---|---|
| `brand-seeds` | JSON `{primary, secondary, neutral}` | `{0, 0, 0}` |
| `brand-bg` | Number (index) | `0` |
| `brand-bg-url` | String | `""` |
| `brand-theme` | `"light"` / `"dark"` / `"system"` | `"system"` |
| `brand-font` | Number (index) | `0` |
| `brand-logo` | Number (index) | `1` |
| `brand-card-bg-discounts-idx` | Number | `0` |
| `brand-card-bg-discounts-url` | String | `""` |
| `brand-card-bg-rewards-idx` | Number | `0` |
| `brand-card-bg-rewards-url` | String | `""` |

---

## 10. WCAG AA Compliance

| Token | Ratio | Standard | Status |
|---|---|---|---|
| `--color-text-primary` light | 14.1:1 | AA (4.5:1) | ✓ |
| `--color-text-secondary` light | 7.3:1 | AA (4.5:1) | ✓ |
| `--color-text-tertiary` light | 4.6:1 | AA (4.5:1) | ✓ |
| `--color-text-muted` light | 4.59:1 | AA (4.5:1) | ✓ |
| `--color-text-subtle` light | 3.24:1 | AA large/UI (3:1) | ✓ |
| All dark text tokens | ≥4.60:1 | AA | ✓ |
| `--btn-primary-ring` dark | White outline | WCAG 1.4.11 non-text | ✓ |

---

## 11. File Structure

```
src/
├── main.jsx                    # Entry — seeds + theme applied before render
├── App.jsx                     # Shell — state-based page routing
├── App.css                     # App frame layout (390×844px)
├── index.css                   # Token imports (all 3 tiers)
├── seeds.js                    # Preset data + apply/load/save functions
│
├── tokens/
│   ├── primitives.css          # Tier 1 — raw colour scales, radius, stroke
│   ├── semantic.css            # Tier 2 — intent tokens + dark mode overrides
│   └── components.css          # Tier 3 — component tokens + dark mode overrides
│
├── components/
│   ├── Header.jsx / .css       # App header — logo, title, icon buttons
│   ├── BottomNav.jsx / .css    # Tab bar navigation
│   ├── FAB.jsx / .css          # Floating action button
│   └── StatusBar.jsx / .css    # iOS-style status bar
│
└── pages/
    ├── Home.jsx                # Home feed
    ├── Feed.jsx / .css         # News/recognition feed + tabs
    ├── Search.jsx              # Search
    ├── Shop.jsx                # Shop/marketplace
    ├── Profile.jsx             # User profile
    ├── Page.css                # Shared page styles
    └── BrandTokens.jsx / .css  # Brand configurator + token reference
```

---

## 12. How to Rebrand

**Minimal rebrand (colours only):**
1. Set `--color-primary-h/s`, `--color-secondary-h/s`, `--color-neutral-h/s` on `:root` — or add a new entry to the seed presets in `seeds.js`

**Full rebrand:**
1. Add seed preset entries to `PRIMARY_PRESETS`, `SECONDARY_PRESETS`, `NEUTRAL_PRESETS`
2. Add brand logo SVG to `/public/` and register in `LOGO_PRESETS`
3. Override specific component tokens in `components.css` if needed (e.g. button shape, nav active colour)
4. Dark mode requires no extra work — all tokens cascade automatically

**No changes needed in:**
- Component JSX files
- `primitives.css` (lightness stops are fixed by design)
- `semantic.css` (unless adding new intent tokens)
