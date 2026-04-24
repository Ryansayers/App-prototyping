# PeopleCarousel — Front-end Spec

Used for both **Birthdays** and **Work Anniversaries**. `BirthdayCarousel` is a thin wrapper that maps birthday data into the shape this component expects.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `people` | `Person[]` | — | Array of people to cycle through. Returns `null` if empty or undefined. |
| `eyebrow` | `string` | `'Birthday'` | Label above the date/sublabel (e.g. `'Work Anniversary'`). |
| `ctaLabel` | `string` | `'Recognise'` | Text on the primary action button. |

### Person object

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `number` | ✓ | Unique key |
| `name` | `string` | ✓ | Displayed below the sublabel in primary colour |
| `sublabel` | `string` | ✓ | Main heading — date (e.g. `'29 Mar'`) or tenure (e.g. `'3 years'`) |
| `initials` | `string` | ✓ | Shown when no image is available |
| `colour` | `string` | ✓ | Avatar background colour (CSS colour value) — used when no image |
| `image` | `string \| null` | — | URL to avatar photo. Falls back to initials + colour if null |

---

## Layout structure

```
.bday-card                  ← card root, flex column, centred, full swipe target
  .bday-eyebrow             ← "BIRTHDAY" / "WORK ANNIVERSARY"
  .bday-date                ← sublabel (date or tenure), 20px / 800 weight
  .bday-name                ← person name, primary-600 colour
  .bday-avatars
    .bday-av-tap--prev      ← invisible button wrapping prev avatar
      .bday-av--side        ← 40×40, 50% opacity
    .bday-av--active        ← 56×56, primary-400 outline ring
    .bday-av-tap--next      ← invisible button wrapping next avatar
      .bday-av--side        ← 40×40, 50% opacity
  .bday-dots                ← one dot per person
    .bday-dot               ← 6×6, inactive
    .bday-dot--active       ← primary-500, scaled 1.3×
  .bday-recognise-btn       ← full-width, 44px, primary-600
```

---

## Navigation

Three ways to move between people — all use the same `prev()` / `next()` functions, which wrap around infinitely.

| Method | Trigger | Threshold |
|---|---|---|
| Swipe | `touchstart` / `touchend` on `.bday-card` | > 40px horizontal delta |
| Tap avatar | Click `.bday-av-tap--prev` or `--next` | — |
| Dot | Click any `.bday-dot` | — |

---

## Avatar states

| Class | Size | Opacity | Ring |
|---|---|---|---|
| `.bday-av--active` | 56×56px | 100% | 3px solid `--color-primary-400`, offset 2px |
| `.bday-av--side` | 40×40px | 50% | None |

Avatar rendering priority: photo (`<img>`) → initials + `colour` background.

---

## Tokens used

| Token | Element |
|---|---|
| `--anniv-card-bg` | Card background |
| `--anniv-card-border` | Card border colour |
| `--radius-card-lg` | Card corner radius |
| `--stroke-subtle` | Card border width |
| `--color-text-muted` | Eyebrow text |
| `--color-text-primary` | Sublabel (date/tenure) |
| `--color-primary-400` | Active avatar ring |
| `--color-primary-500` | Active dot |
| `--color-primary-600` | Name text + CTA button background |
| `--color-border-default` | Inactive dot |
| `--radius-control` | CTA button radius |

---

## Placement

| Context | Location |
|---|---|
| Mobile (Home.jsx) | Below Work Anniversaries, above Discover More |
| Desktop sidebar (DesktopView) | Below Quick Links |
| Desktop sidebar (DesktopPageNav2) | Below Quick Links |

Work Anniversaries is hidden on `/desktop-page-nav2`. Birthdays are hidden on mobile.

---

## Accessibility

- Side avatar buttons have `aria-label="Previous"` / `"Next"`
- Dot buttons have `aria-label="Go to {name}"`
- All interactive targets meet the 44×44px minimum touch size (side avatars via `min-width/min-height`, dots via `::before` pseudo-element with `inset: -8px`)
