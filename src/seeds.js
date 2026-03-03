export const PRIMARY_PRESETS = [
  { label: 'Cyan (default)',  h: 192, s: 100 },
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
