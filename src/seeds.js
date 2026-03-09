export const PRIMARY_PRESETS = [
  { label: 'Light Cobalt (default)',  h: 192, s: 100 },
  { label: 'Smarter Legacy',         h: 214, s: 85  },
  { label: 'Edenred+',        h: 256, s: 86  },
  { label: 'Eden Cobalt',     h: 209, s: 100 },
  { label: 'Boom Blue',       h: 196, s: 100 },
  { label: 'Boom Orange',     h: 21,  s: 88  },
  { label: 'Indigo',          h: 245, s: 80  },
  { label: 'Emerald',         h: 152, s: 76  },
  { label: 'Amber',           h: 38,  s: 95  },
  { label: 'Rose',            h: 346, s: 84  },
  { label: 'Next Big Stone',  h: 45,  s: 12  },
  { label: 'Paul Smith Coral',        h: 2,   s: 84  },
  { label: 'Paul Smith Amber',        h: 37,  s: 92  },
  { label: 'Paul Smith Teal',         h: 183, s: 100 },
]

export const SECONDARY_PRESETS = [
  { label: 'Blue-Purple (default)', h: 239, s: 65  },
  { label: 'Smarter Legacy',               h: 244, s: 72  },
  { label: 'Edenred+',              h: 222, s: 56  },
  { label: 'Eden Violet',           h: 263, s: 100 },
  { label: 'Eden Mint',             h: 169, s: 100 },
  { label: 'Eden Olive',            h: 80,  s: 95  },
  { label: 'ER - depreciate',             h: 349, s: 100 },
  { label: 'Boom Amber',            h: 42,  s: 100 },
  { label: 'Boom Green',            h: 109, s: 61  },
  { label: 'Pink',                  h: 330, s: 80  },
  { label: 'Teal',                  h: 174, s: 72  },
  { label: 'Sky',                   h: 204, s: 90  },
  { label: 'Violet',                h: 270, s: 76  },
  { label: 'Next Pacific Blue',     h: 192, s: 100 },
  { label: 'Paul Smith Plum',              h: 294, s: 29  },
  { label: 'Paul Smith Blush',             h: 5,   s: 72  },
]

export const NEUTRAL_PRESETS = [
  { label: 'Cyan tint (default)', h: 192, s: 20 },
  { label: 'Smarter Legacy',             h: 220, s: 8  },
  { label: 'Warm',                h: 30,  s: 15 },
  { label: 'Cool Slate',          h: 220, s: 12 },
  { label: 'Pure Grey',           h: 0,   s: 0  },
  { label: 'Rose tint',           h: 346, s: 10 },
  { label: 'Green tint',          h: 152, s: 12 },
  { label: 'Next Cool Navy-Tinted Grey', h: 205, s: 10 },
  { label: 'Paul Smith Forest',           h: 158, s: 22 },
  { label: 'Paul Smith Sage',             h: 152, s: 16 },
  { label: 'Paul Smith Steel',            h: 202, s: 19 },
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
  { label: 'None',         value: null,      darkValue: null },
  { label: 'Aura',         value: 'radial-gradient(ellipse at 15% 40%, hsl(var(--color-primary-h), 60%, 75%) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, hsl(var(--color-secondary-h), 60%, 78%) 0%, transparent 55%), var(--color-surface-subtle)',
                            darkValue: 'radial-gradient(ellipse at 15% 40%, hsl(var(--color-primary-h), 40%, 20%) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, hsl(var(--color-secondary-h), 40%, 22%) 0%, transparent 55%), var(--color-surface-subtle)' },
  { label: 'Boom Orange',  value: 'linear-gradient(135deg, hsl(30, 80%, 92%) 0%, hsl(20, 70%, 88%) 50%, hsl(340, 60%, 90%) 100%)',
                            darkValue: 'linear-gradient(135deg, hsl(30, 50%, 14%) 0%, hsl(20, 40%, 11%) 50%, hsl(340, 35%, 13%) 100%)' },
  { label: 'Boom Blue Glow', value: 'radial-gradient(circle at 50% 0%, hsl(var(--color-primary-h), 70%, 82%) 0%, var(--color-surface-default) 65%)',
                              darkValue: 'radial-gradient(circle at 50% 0%, hsl(var(--color-primary-h), 50%, 22%) 0%, var(--color-surface-default) 65%)' },
  { label: 'Smarter Mist', value: 'linear-gradient(175deg, hsl(258, 26%, 95%) 0%, hsl(248, 36%, 91%) 18%, hsl(262, 20%, 95%) 34%, hsl(248, 34%, 90%) 50%, hsl(260, 24%, 94%) 66%, hsl(250, 32%, 91%) 82%, hsl(258, 18%, 96%) 100%)',
                            darkValue: 'linear-gradient(175deg, hsl(258, 18%, 12%) 0%, hsl(248, 25%, 16%) 18%, hsl(262, 14%, 12%) 34%, hsl(248, 22%, 15%) 50%, hsl(260, 16%, 12%) 66%, hsl(250, 20%, 15%) 82%, hsl(258, 12%, 12%) 100%)' },
  { label: 'Indigo Haze',  value: 'radial-gradient(ellipse at 25% 25%, hsl(258, 38%, 86%) 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, hsl(245, 44%, 88%) 0%, transparent 50%), var(--color-surface-subtle)',
                            darkValue: 'radial-gradient(ellipse at 25% 25%, hsl(258, 28%, 20%) 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, hsl(245, 34%, 22%) 0%, transparent 50%), var(--color-surface-subtle)' },
  { label: 'Blue Purple',   value: 'linear-gradient(to right, #F1F7FF, #F1E8FF)',
                            darkValue: 'linear-gradient(to right, hsl(214, 35%, 13%), hsl(280, 35%, 13%))' },
  { label: 'Wellbeing',     value: 'linear-gradient(150deg, hsl(152, 55%, 90%) 0%, hsl(198, 60%, 88%) 50%, hsl(265, 48%, 91%) 100%)',
                            darkValue: 'linear-gradient(150deg, hsl(152, 30%, 11%) 0%, hsl(198, 35%, 13%) 50%, hsl(265, 28%, 12%) 100%)' },
  { label: 'Custom Image…', value: 'custom', darkValue: 'custom' },
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
  const dark = isDarkMode()
  const activeValue = dark ? preset?.darkValue : preset?.value

  if (!activeValue) {
    el.style.removeProperty('--app-bg')
    el.style.removeProperty('--app-top-bg')
    el.style.removeProperty('--header-home-bg')
  } else if (activeValue === 'custom') {
    if (url) {
      el.style.setProperty('--app-bg', `url('${url}') center / cover no-repeat`)
      el.style.setProperty('--app-top-bg', 'transparent')
      el.style.setProperty('--header-home-bg', 'transparent')
    }
  } else {
    el.style.setProperty('--app-bg', activeValue)
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
  { label: 'None',         value: null,                                                                     darkValue: null },
  { label: 'Coral',        value: 'linear-gradient(135deg, #f97060 0%, #fb9a8a 100%)',                     darkValue: 'linear-gradient(135deg, #b82a14 0%, #d43a20 100%)' },
  { label: 'Ocean',        value: 'linear-gradient(135deg, #1e6fa8 0%, #38a3d1 100%)',                     darkValue: 'linear-gradient(135deg, #0a3050 0%, #144870 100%)' },
  { label: 'Forest',       value: 'linear-gradient(135deg, #2d7a4f 0%, #52b07a 100%)',                     darkValue: 'linear-gradient(135deg, #0e3820 0%, #1a5030 100%)' },
  { label: 'Sunset',       value: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',                     darkValue: 'linear-gradient(135deg, #8a3400 0%, #aa5000 100%)' },
  { label: 'Lavender',     value: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',                     darkValue: 'linear-gradient(135deg, #380a80 0%, #5214a8 100%)' },
  { label: 'Plum',         value: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',                     darkValue: 'linear-gradient(135deg, #1e0840 0%, #2e1060 100%)' },
  { label: 'Deep Violet',  value: 'linear-gradient(150deg, #312e81 0%, #5b21b6 60%, #6d28d9 100%)',        darkValue: 'linear-gradient(150deg, #140e38 0%, #200a48 60%, #2e1060 100%)' },
  { label: 'Custom Image…',value: 'custom',                                                                darkValue: 'custom' },
]

export const HOME_CARD_PRESETS = [
  { label: 'Default',        value: null,                                                                                               darkValue: null },
  { label: 'Surface',        value: 'var(--color-surface-default)',                                                                     darkValue: 'var(--color-surface-default)' },
  { label: 'Subtle',         value: 'var(--color-surface-subtle)',                                                                      darkValue: 'var(--color-surface-subtle)' },
  { label: 'Raised',         value: 'var(--color-surface-raised)',                                                                      darkValue: 'var(--color-surface-raised)' },
  { label: 'Brand Tint',     value: 'var(--color-surface-brand-tint)',                                                                  darkValue: 'var(--color-surface-brand-tint)' },
  { label: 'Accent Tint',    value: 'var(--color-surface-accent-tint)',                                                                 darkValue: 'var(--color-surface-accent-tint)' },
  { label: 'Soft Primary',   value: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)',               darkValue: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-800) 100%)' },
  { label: 'Soft Secondary', value: 'linear-gradient(135deg, var(--color-secondary-50) 0%, var(--color-secondary-100) 100%)',           darkValue: 'linear-gradient(135deg, var(--color-secondary-900) 0%, var(--color-secondary-800) 100%)' },
  { label: 'Peach',          value: 'linear-gradient(135deg, #fde8e4 0%, #fcd0ca 100%)',                                               darkValue: 'linear-gradient(135deg, #3d1410 0%, #52201a 100%)' },
  { label: 'Sky',            value: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',                                               darkValue: 'linear-gradient(135deg, #0f2340 0%, #1a3254 100%)' },
  { label: 'Mint',           value: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',                                               darkValue: 'linear-gradient(135deg, #082818 0%, #0d3824 100%)' },
  { label: 'Lemon',          value: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',                                               darkValue: 'linear-gradient(135deg, #28240a 0%, #38320e 100%)' },
  { label: 'Lavender',       value: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',                                               darkValue: 'linear-gradient(135deg, #1e1040 0%, #2a1854 100%)' },
  { label: 'Rose',           value: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',                                               darkValue: 'linear-gradient(135deg, #3d0a24 0%, #520f32 100%)' },
]

export const CTA_ACTIVITY_PRESETS = [
  { label: 'None',           value: null },
  { label: 'Soft Secondary', value: 'linear-gradient(135deg, var(--color-secondary-50) 0%, var(--color-secondary-100) 100%)' },
  { label: 'Soft Primary',   value: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%)' },
  { label: 'Peach',          value: 'linear-gradient(135deg, #fde8e4 0%, #fcd0ca 100%)' },
  { label: 'Sky',            value: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
  { label: 'Mint',           value: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
  { label: 'Lemon',          value: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)' },
  { label: 'Lavender',       value: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)' },
  { label: 'Rose',           value: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
  { label: 'Custom Image…',  value: 'custom' },
]

export const CTA_DISCOUNTS_PRESETS = [
  ...CTA_SHARED_PRESETS.slice(0, 1),
  { label: 'Smarter Legacy',      value: "url('/card-bg-smarter.png') center / cover no-repeat" },
  ...CTA_SHARED_PRESETS.slice(1),
]

export const CTA_REWARDS_PRESETS = [
  ...CTA_SHARED_PRESETS.slice(0, 1),
  { label: 'Smarter Legacy',      value: "url('/card-bg-rewards.png') center / cover no-repeat" },
  ...CTA_SHARED_PRESETS.slice(1),
]

// Keep for backward compat with applyCardBg
export const CTA_CARD_PRESETS = CTA_DISCOUNTS_PRESETS

export function applyCardBg(token, idx, url = '', presets = CTA_DISCOUNTS_PRESETS, applyInDark = false) {
  const el = document.documentElement
  const preset = presets[idx]
  const dark = isDarkMode()
  if (!preset || preset.value === null || (!applyInDark && dark)) {
    el.style.removeProperty(token)
  } else if (preset.value === 'custom') {
    if (url) el.style.setProperty(token, `url('${url}') center / cover no-repeat`)
  } else {
    const activeValue = dark && preset.darkValue ? preset.darkValue : preset.value
    el.style.setProperty(token, activeValue)
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

export function applyImageFilter(enabled) {
  const el = document.documentElement
  if (enabled) {
    el.style.removeProperty('--img-filter')
    el.style.setProperty('--nc-img-filter', 'grayscale(100%) brightness(1.25)')
    el.style.setProperty('--nc-overlay-opacity', '0.6')
  } else {
    el.style.setProperty('--img-filter', 'none')
    el.style.setProperty('--nc-img-filter', 'none')
    el.style.setProperty('--nc-overlay-opacity', '0')
  }
}

export function loadImageFilter() {
  try { return localStorage.getItem('brand-img-filter') !== 'off' }
  catch { return true }
}

export function saveImageFilter(enabled) {
  localStorage.setItem('brand-img-filter', enabled ? 'on' : 'off')
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
  applyCardBg('--cta-discounts-bg', d.idx, d.url, CTA_DISCOUNTS_PRESETS, true)
  const r = loadCardBg('rewards')
  applyCardBg('--cta-rewards-bg', r.idx, r.url, CTA_REWARDS_PRESETS, true)
  const a = loadCardBg('activity')
  applyCardBg('--activity-bg', a.idx, a.url, CTA_ACTIVITY_PRESETS)
  const cc = loadCardBg('content-card')
  applyCardBg('--card-bg', cc.idx, cc.url, HOME_CARD_PRESETS, true)
  const ac = loadCardBg('anniv-card')
  applyCardBg('--anniv-card-bg', ac.idx, ac.url, HOME_CARD_PRESETS, true)
  const rn = loadCardBg('rec-nudge')
  applyCardBg('--rec-nudge-bg', rn.idx, rn.url, HOME_CARD_PRESETS, true)
  const ql = loadCardBg('quick-links')
  applyCardBg('--quick-link-card-bg', ql.idx, ql.url, HOME_CARD_PRESETS, true)
}

export function loadTheme() {
  try { return localStorage.getItem('brand-theme') || 'system' }
  catch { return 'system' }
}

export function saveTheme(theme) {
  localStorage.setItem('brand-theme', theme)
}

export const FONT_PRESETS = [
  { label: 'Ubuntu (Brand)', value: "'Ubuntu', sans-serif" },
  { label: 'SF Pro',         value: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" },
  { label: 'Roboto',         value: "'Roboto', sans-serif" },
]

export function applyFont(idx) {
  const preset = FONT_PRESETS[idx] || FONT_PRESETS[0]
  document.documentElement.style.setProperty('--font-body', preset.value)
}

export function loadFont() {
  try { return Number(localStorage.getItem('brand-font') || 0) }
  catch { return 0 }
}

export function saveFont(idx) {
  localStorage.setItem('brand-font', idx)
}

export const LOGO_PRESETS = [
  { label: 'None',        src: null },
  { label: 'Boom',        src: '/boom.svg' },
  { label: 'Next',        src: '/logo-next.svg' },
  { label: 'Paul Smith',  src: '/logo-paul-smith.svg' },
]

export function loadLogo() {
  try { return Number(localStorage.getItem('brand-logo') || 1) }
  catch { return 1 }
}

export function saveLogo(idx) {
  localStorage.setItem('brand-logo', idx)
}

export function applySchemeAttr() {
  const idx = loadLogo()
  const label = (LOGO_PRESETS[idx]?.label || 'boom').toLowerCase()
  document.documentElement.setAttribute('data-scheme', label)
}

export function loadScheme(content) {
  const logoIdx = loadLogo()
  const key = (LOGO_PRESETS[logoIdx]?.label || 'boom').toLowerCase()
  return content.schemes[key] || content.schemes.boom
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
