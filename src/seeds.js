export const PRIMARY_PRESETS = [
  { label: 'Cyan (default)',  h: 192, s: 100 },
  { label: 'Smarter',         h: 214, s: 85  },
  { label: 'Edenred+',        h: 256, s: 86  },
  { label: 'Eden Red',        h: 4,   s: 93  },
  { label: 'Eden Cobalt',     h: 209, s: 100 },
  { label: 'Boom Blue',       h: 196, s: 100 },
  { label: 'Boom Orange',     h: 21,  s: 88  },
  { label: 'Orange',          h: 28,  s: 95  },
  { label: 'Indigo',          h: 245, s: 80  },
  { label: 'Emerald',         h: 152, s: 76  },
  { label: 'Amber',           h: 38,  s: 95  },
  { label: 'Rose',            h: 346, s: 84  },
]

export const SECONDARY_PRESETS = [
  { label: 'Blue-Purple (default)', h: 239, s: 65  },
  { label: 'Smarter',               h: 244, s: 72  },
  { label: 'Edenred+',              h: 222, s: 56  },
  { label: 'Eden Violet',           h: 263, s: 100 },
  { label: 'Eden Mint',             h: 169, s: 100 },
  { label: 'Eden Olive',            h: 80,  s: 95  },
  { label: 'Eden Pink',             h: 349, s: 100 },
  { label: 'Boom Amber',            h: 42,  s: 100 },
  { label: 'Boom Green',            h: 109, s: 61  },
  { label: 'Pink',                  h: 330, s: 80  },
  { label: 'Teal',                  h: 174, s: 72  },
  { label: 'Sky',                   h: 204, s: 90  },
  { label: 'Violet',                h: 270, s: 76  },
]

export const NEUTRAL_PRESETS = [
  { label: 'Cyan tint (default)', h: 192, s: 20 },
  { label: 'Smarter',             h: 220, s: 8  },
  { label: 'Warm',                h: 30,  s: 15 },
  { label: 'Cool Slate',          h: 220, s: 12 },
  { label: 'Pure Grey',           h: 0,   s: 0  },
  { label: 'Rose tint',           h: 346, s: 10 },
  { label: 'Green tint',          h: 152, s: 12 },
]

export function applySeeds({ primary, secondary, neutral }) {
  const el = document.documentElement
  el.style.setProperty('--color-primary-h',   primary.h)
  el.style.setProperty('--color-primary-s',   `${primary.s}%`)
  el.style.setProperty('--color-secondary-h', secondary.h)
  el.style.setProperty('--color-secondary-s', `${secondary.s}%`)
  el.style.setProperty('--color-neutral-h',   neutral.h)
  el.style.setProperty('--color-neutral-s',   `${neutral.s}%`)
}

export const BG_PRESETS = [
  { label: 'None',          value: null },
  { label: 'Aurora Mesh',   value: 'radial-gradient(ellipse at 15% 40%, hsl(var(--color-primary-h), 60%, 75%) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, hsl(var(--color-secondary-h), 60%, 78%) 0%, transparent 55%), var(--color-surface-subtle)' },
  { label: 'Diagonal',      value: 'linear-gradient(135deg, hsl(30, 80%, 92%) 0%, hsl(20, 70%, 88%) 50%, hsl(340, 60%, 90%) 100%)' },
  { label: 'Soft Glow',     value: 'radial-gradient(circle at 50% 0%, hsl(var(--color-primary-h), 70%, 82%) 0%, var(--color-surface-default) 65%)' },
  { label: 'Violet Mist',   value: 'linear-gradient(175deg, hsl(258, 26%, 95%) 0%, hsl(248, 36%, 91%) 18%, hsl(262, 20%, 95%) 34%, hsl(248, 34%, 90%) 50%, hsl(260, 24%, 94%) 66%, hsl(250, 32%, 91%) 82%, hsl(258, 18%, 96%) 100%)' },
  { label: 'Indigo Haze',   value: 'radial-gradient(ellipse at 25% 25%, hsl(258, 38%, 86%) 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, hsl(245, 44%, 88%) 0%, transparent 50%), var(--color-surface-subtle)' },
  { label: 'Smarter',       value: "url('/app-bg-smarter.png') center / cover no-repeat" },
  { label: 'Custom Image…', value: 'custom' },
]

function isDarkMode() {
  const t = document.documentElement.getAttribute('data-theme')
  if (t === 'dark') return true
  if (t === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyBg(idx, url = '') {
  const el = document.documentElement
  const preset = BG_PRESETS[idx]
  if (!preset || preset.value === null || isDarkMode()) {
    el.style.removeProperty('--app-bg')
    el.style.removeProperty('--app-top-bg')
    el.style.removeProperty('--header-home-bg')
  } else if (preset.value === 'custom') {
    if (url) {
      el.style.setProperty('--app-bg', `url('${url}') center / cover no-repeat`)
      el.style.setProperty('--app-top-bg', 'transparent')
      el.style.setProperty('--header-home-bg', 'transparent')
    }
  } else {
    el.style.setProperty('--app-bg', preset.value)
    el.style.setProperty('--app-top-bg', 'transparent')
    el.style.setProperty('--header-home-bg', 'transparent')
  }
}

export function loadBg() {
  try {
    return {
      idx: Number(localStorage.getItem('brand-bg') || 0),
      url: localStorage.getItem('brand-bg-url') || '',
    }
  } catch { return { idx: 0, url: '' } }
}

export function saveBg(idx, url) {
  localStorage.setItem('brand-bg', idx)
  localStorage.setItem('brand-bg-url', url)
}

const CTA_SHARED_PRESETS = [
  { label: 'None',         value: null },
  { label: 'Coral',        value: 'linear-gradient(135deg, #f97060 0%, #fb9a8a 100%)' },
  { label: 'Ocean',        value: 'linear-gradient(135deg, #1e6fa8 0%, #38a3d1 100%)' },
  { label: 'Forest',       value: 'linear-gradient(135deg, #2d7a4f 0%, #52b07a 100%)' },
  { label: 'Sunset',       value: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)' },
  { label: 'Lavender',     value: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)' },
  { label: 'Plum',         value: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)' },
  { label: 'Deep Violet',  value: 'linear-gradient(150deg, #312e81 0%, #5b21b6 60%, #6d28d9 100%)' },
  { label: 'Custom Image…',value: 'custom' },
]

export const CTA_DISCOUNTS_PRESETS = [
  ...CTA_SHARED_PRESETS.slice(0, 1),
  { label: 'Smarter',      value: "url('/card-bg-smarter.png') center / cover no-repeat" },
  ...CTA_SHARED_PRESETS.slice(1),
]

export const CTA_REWARDS_PRESETS = [
  ...CTA_SHARED_PRESETS.slice(0, 1),
  { label: 'Smarter',      value: "url('/card-bg-rewards.png') center / cover no-repeat" },
  ...CTA_SHARED_PRESETS.slice(1),
]

// Keep for backward compat with applyCardBg
export const CTA_CARD_PRESETS = CTA_DISCOUNTS_PRESETS

export function applyCardBg(token, idx, url = '', presets = CTA_DISCOUNTS_PRESETS) {
  const el = document.documentElement
  const preset = presets[idx]
  if (!preset || preset.value === null || isDarkMode()) {
    el.style.removeProperty(token)
  } else if (preset.value === 'custom') {
    if (url) el.style.setProperty(token, `url('${url}') center / cover no-repeat`)
  } else {
    el.style.setProperty(token, preset.value)
  }
}

export function loadCardBg(key) {
  try {
    return {
      idx: Number(localStorage.getItem(`brand-card-bg-${key}-idx`) || 0),
      url: localStorage.getItem(`brand-card-bg-${key}-url`) || '',
    }
  } catch { return { idx: 0, url: '' } }
}

export function saveCardBg(key, idx, url) {
  localStorage.setItem(`brand-card-bg-${key}-idx`, idx)
  localStorage.setItem(`brand-card-bg-${key}-url`, url)
}

export function applyTheme(theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
  // Re-evaluate background overrides now that theme has changed
  const { idx: bgIdx, url: bgUrl } = loadBg()
  applyBg(bgIdx, bgUrl)
  const d = loadCardBg('discounts')
  applyCardBg('--cta-discounts-bg', d.idx, d.url, CTA_DISCOUNTS_PRESETS)
  const r = loadCardBg('rewards')
  applyCardBg('--cta-rewards-bg', r.idx, r.url, CTA_REWARDS_PRESETS)
}

export function loadTheme() {
  try { return localStorage.getItem('brand-theme') || 'system' }
  catch { return 'system' }
}

export function saveTheme(theme) {
  localStorage.setItem('brand-theme', theme)
}

export function saveSeeds(indices) {
  localStorage.setItem('brand-seeds', JSON.stringify(indices))
}

export function loadSeeds() {
  try {
    const saved = localStorage.getItem('brand-seeds')
    if (saved) return JSON.parse(saved)
  } catch {}
  return { primary: 0, secondary: 0, neutral: 0 }
}
