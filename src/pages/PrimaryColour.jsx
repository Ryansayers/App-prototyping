import { useState, useEffect } from 'react'
import './BrandTokens.css'
import './Page.css'
import './Feed.css'
import {
  PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS,
  applySeeds, saveSeeds, loadSeeds,
  BG_PRESETS, applyBg, loadBg, saveBg,
  applyTheme, loadTheme, saveTheme,
  HOME_CARD_PRESETS,
  CTA_ACTIVITY_PRESETS, CTA_DISCOUNTS_PRESETS, CTA_REWARDS_PRESETS, applyCardBg, loadCardBg, saveCardBg,
  CTA_BTN_PRESETS, applyCTABtn, loadCTABtn, saveCTABtn,
  FONT_PRESETS, applyFont, loadFont, saveFont,
  LOGO_PRESETS, loadLogo, saveLogo, applySchemeAttr,
  applyImageFilter, loadImageFilter, saveImageFilter,
  loadSavingsGoal, saveSavingsGoal,
  NAV_ITEM_IDS, loadNavConfig, saveNavConfig,
  loadHomeView, saveHomeView,
} from '../seeds.js'

function useSeed(key, presets) {
  const [idx, setIdx] = useState(() => loadSeeds()[key])

  function setAndSave(i) {
    setIdx(i)
    const saved = loadSeeds()
    saved[key] = i
    saveSeeds(saved)
    applySeeds({
      primary:   PRIMARY_PRESETS[key === 'primary'   ? i : saved.primary],
      secondary: SECONDARY_PRESETS[key === 'secondary' ? i : saved.secondary],
      neutral:   NEUTRAL_PRESETS[key === 'neutral'   ? i : saved.neutral],
    })
  }

  return [idx, setAndSave]
}

const PRIMARY_STOPS  = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const NEUTRAL_STOPS  = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const TEXT_TOKENS = [
  { token: '--color-text-primary',   label: 'Primary' },
  { token: '--color-text-secondary', label: 'Secondary' },
  { token: '--color-text-tertiary',  label: 'Tertiary' },
  { token: '--color-text-muted',     label: 'Muted' },
  { token: '--color-text-subtle',    label: 'Subtle' },
  { token: '--color-text-disabled',  label: 'Disabled' },
]

const SURFACE_TOKENS = [
  { token: '--color-surface-default',      label: 'Default' },
  { token: '--color-surface-subtle',       label: 'Subtle' },
  { token: '--color-surface-raised',       label: 'Raised' },
]

const BRAND_TOKENS = [
  { token: '--color-brand',         label: 'Brand' },
  { token: '--color-brand-hover',   label: 'Brand Hover' },
  { token: '--color-brand-active',  label: 'Brand Active' },
  { token: '--color-brand-subtle',  label: 'Brand Subtle' },
  { token: '--color-brand-tint',    label: 'Brand Tint' },
  { token: '--color-accent',        label: 'Accent' },
  { token: '--color-accent-hover',  label: 'Accent Hover' },
  { token: '--color-accent-subtle', label: 'Accent Subtle' },
]

const STATE_TOKENS = [
  { token: '--color-state-success', label: 'Success' },
  { token: '--color-state-warning', label: 'Warning' },
  { token: '--color-state-danger',  label: 'Danger' },
  { token: '--color-state-info',    label: 'Info' },
]

const RADIUS_TOKENS = [
  { token: '--radius-xs',     label: 'xs — 8px' },
  { token: '--radius-sm',     label: 'sm — 10px' },
  { token: '--radius-md',     label: 'md — 12px' },
  { token: '--radius-lg',     label: 'lg — 14px' },
  { token: '--radius-xl',     label: 'xl — 16px' },
  { token: '--radius-2xl',    label: '2xl — 20px' },
  { token: '--radius-3xl',    label: '3xl — 22px' },
  { token: '--radius-4xl',    label: '4xl — 28px' },
  { token: '--radius-app',    label: 'app — 40px' },
  { token: '--radius-pill',   label: 'pill — 99px' },
  { token: '--radius-circle', label: 'circle — 50%' },
]

const STROKE_TOKENS = [
  { token: '--stroke-subtle',   label: 'Subtle — 1px',   width: '1px' },
  { token: '--stroke-default',  label: 'Default — 1.5px', width: '1.5px' },
  { token: '--stroke-strong',   label: 'Strong — 2px',   width: '2px' },
  { token: '--stroke-emphasis', label: 'Emphasis — 3px', width: '3px' },
]

function Swatch({ bg, label, border }) {
  return (
    <div className="bt-swatch">
      <div className="bt-swatch-color" style={{ background: `var(${bg})`, border: border ? '1px solid var(--color-border-default)' : 'none' }} />
      <span className="bt-swatch-label">{label}</span>
      <code className="bt-swatch-token">{bg}</code>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="bt-section">
      <h2 className="bt-section-title">{title}</h2>
      {children}
    </section>
  )
}

export default function PrimaryColour() {
  const [primaryIdx, setPrimaryIdx] = useSeed('primary', PRIMARY_PRESETS)

  const [bgIdx,     setBgIdx]     = useState(() => loadBg().idx)
  const [customUrl, setCustomUrl] = useState(() => loadBg().url)
  const [themeMode, setThemeMode] = useState(() => loadTheme())

  const [fontIdx, setFontIdx] = useState(() => loadFont())
  const [logoIdx, setLogoIdx] = useState(() => loadLogo() || 1)

  const [discountIdx,  setDiscountIdx]  = useState(() => loadCardBg('discounts').idx)
  const [discountUrl,  setDiscountUrl]  = useState(() => loadCardBg('discounts').url)
  const [rewardsIdx,   setRewardsIdx]   = useState(() => loadCardBg('rewards').idx)
  const [rewardsUrl,   setRewardsUrl]   = useState(() => loadCardBg('rewards').url)
  const [activityIdx,  setActivityIdx]  = useState(() => loadCardBg('activity').idx)
  const [activityUrl,  setActivityUrl]  = useState(() => loadCardBg('activity').url)
  const [imgFilter,    setImgFilter]    = useState(() => loadImageFilter())

  const [contentCardIdx,  setContentCardIdx]  = useState(() => loadCardBg('content-card').idx)
  const [annivCardIdx,    setAnnivCardIdx]    = useState(() => loadCardBg('anniv-card').idx)
  const [recNudgeIdx,     setRecNudgeIdx]     = useState(() => loadCardBg('rec-nudge').idx)
  const [quickLinksIdx,   setQuickLinksIdx]   = useState(() => loadCardBg('quick-links').idx)

  const [savingsGoalEnabled, setSavingsGoalEnabled] = useState(() => loadSavingsGoal().enabled)
  const [savingsGoalTarget,  setSavingsGoalTarget]  = useState(() => loadSavingsGoal().target)
  const [savingsGoalLabel,   setSavingsGoalLabel]   = useState(() => loadSavingsGoal().label)

  const [ctaBtnIdx, setCtaBtnIdx] = useState(() => loadCTABtn())
  const [hiddenNav, setHiddenNav] = useState(() => loadNavConfig())
  const [homeView, setHomeView] = useState(() => loadHomeView())

  useEffect(() => {
    applyFont(loadFont())
  }, [])

  useEffect(() => {
    const { idx, url } = loadBg()
    applyBg(idx, url)
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
    applyCTABtn(loadCTABtn())
  }, [])

  function handleLogoChange(i) {
    setLogoIdx(i)
    saveLogo(i)
    applySchemeAttr()
  }

  function handleFontChange(i) {
    setFontIdx(i)
    saveFont(i)
    applyFont(i)
  }

  function handleThemeChange(mode) {
    setThemeMode(mode)
    saveTheme(mode)
    applyTheme(mode)
    applyCardBg('--cta-discounts-bg', discountIdx, discountUrl, CTA_DISCOUNTS_PRESETS)
    applyCardBg('--cta-rewards-bg', rewardsIdx, rewardsUrl, CTA_REWARDS_PRESETS)
  }

  function handleDiscountChange(i) {
    setDiscountIdx(i)
    saveCardBg('discounts', i, discountUrl)
    applyCardBg('--cta-discounts-bg', i, discountUrl, CTA_DISCOUNTS_PRESETS, true)
  }

  function handleDiscountUrl(url) {
    setDiscountUrl(url)
    saveCardBg('discounts', discountIdx, url)
    applyCardBg('--cta-discounts-bg', discountIdx, url, CTA_DISCOUNTS_PRESETS, true)
  }

  function handleRewardsChange(i) {
    setRewardsIdx(i)
    saveCardBg('rewards', i, rewardsUrl)
    applyCardBg('--cta-rewards-bg', i, rewardsUrl, CTA_REWARDS_PRESETS, true)
  }

  function handleRewardsUrl(url) {
    setRewardsUrl(url)
    saveCardBg('rewards', rewardsIdx, url)
    applyCardBg('--cta-rewards-bg', rewardsIdx, url, CTA_REWARDS_PRESETS, true)
  }

  function handleSavingsGoalTarget(val) {
    const n = Number(val)
    if (!isNaN(n) && n > 0) {
      setSavingsGoalTarget(n)
      saveSavingsGoal(savingsGoalEnabled, n, savingsGoalLabel)
    }
  }

  function handleSavingsGoalLabel(val) {
    setSavingsGoalLabel(val)
    saveSavingsGoal(savingsGoalEnabled, savingsGoalTarget, val)
  }

  function handleSavingsGoalToggle() {
    const next = !savingsGoalEnabled
    setSavingsGoalEnabled(next)
    saveSavingsGoal(next, savingsGoalTarget, savingsGoalLabel)
  }

  function handleCtaBtnChange(i) {
    setCtaBtnIdx(i)
    saveCTABtn(i)
    applyCTABtn(i)
  }

  function handleNavToggle(id) {
    const next = hiddenNav.includes(id)
      ? hiddenNav.filter((x) => x !== id)
      : [...hiddenNav, id]
    setHiddenNav(next)
    saveNavConfig(next)
    window.dispatchEvent(new Event('nav-config-changed'))
  }

  function handleHomeViewChange(view) {
    setHomeView(view)
    saveHomeView(view)
    window.dispatchEvent(new CustomEvent('home-view-changed', { detail: view }))
  }

  function handleImgFilterToggle() {
    const next = !imgFilter
    setImgFilter(next)
    saveImageFilter(next)
    applyImageFilter(next)
  }

  function handleActivityChange(i) {
    setActivityIdx(i)
    saveCardBg('activity', i, activityUrl)
    applyCardBg('--activity-bg', i, activityUrl, CTA_ACTIVITY_PRESETS)
  }

  function handleActivityUrl(url) {
    setActivityUrl(url)
    saveCardBg('activity', activityIdx, url)
    applyCardBg('--activity-bg', activityIdx, url, CTA_ACTIVITY_PRESETS)
  }

  function handleContentCardChange(i) {
    setContentCardIdx(i)
    saveCardBg('content-card', i, '')
    applyCardBg('--card-bg', i, '', HOME_CARD_PRESETS, true)
  }

  function handleAnnivCardChange(i) {
    setAnnivCardIdx(i)
    saveCardBg('anniv-card', i, '')
    applyCardBg('--anniv-card-bg', i, '', HOME_CARD_PRESETS, true)
  }

  function handleRecNudgeChange(i) {
    setRecNudgeIdx(i)
    saveCardBg('rec-nudge', i, '')
    applyCardBg('--rec-nudge-bg', i, '', HOME_CARD_PRESETS, true)
  }

  function handleQuickLinksChange(i) {
    setQuickLinksIdx(i)
    saveCardBg('quick-links', i, '')
    applyCardBg('--quick-link-card-bg', i, '', HOME_CARD_PRESETS, true)
  }

  function handleBgChange(i) {
    setBgIdx(i)
    saveBg(i, customUrl)
    applyBg(i, customUrl)
  }

  function handleCustomUrl(url) {
    setCustomUrl(url)
    saveBg(bgIdx, url)
    applyBg(bgIdx, url)
  }

  return (
    <div className="bt-page bt-page--primary-only">
      <header className="bt-header">
        <h1>Brand token page</h1>
        <p>Live token reference — all values respond to seed changes below</p>
        <div className="bt-logo-bar">
          <div className="bt-logo-preview">
            {LOGO_PRESETS[logoIdx]?.src
              ? <img src={LOGO_PRESETS[logoIdx].src} alt={LOGO_PRESETS[logoIdx].label} className="bt-logo-img" />
              : <span className="bt-logo-none">No logo</span>
            }
          </div>
          <label className="bt-seed">
            <span>Brand</span>
            <select className="bt-select" value={logoIdx} onChange={e => handleLogoChange(Number(e.target.value))}>
              {LOGO_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </label>
        </div>
        <div className="bt-seeds">
          <label className="bt-seed">
            <div className="bt-seed-dot" style={{ background: 'var(--color-primary-500)' }} />
            <span>Primary</span>
            <select className="bt-select" value={primaryIdx} onChange={e => setPrimaryIdx(Number(e.target.value))}>
              {PRIMARY_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </label>
        </div>
      </header>

      <Section title="Primary Scale">
        <div className="bt-scale">
          {PRIMARY_STOPS.map(s => (
            <Swatch key={s} bg={`--color-primary-${s}`} label={s} />
          ))}
        </div>
      </Section>

      <Section title="State">
        <div className="bt-scale">
          {STATE_TOKENS.map(t => (
            <Swatch key={t.token} bg={t.token} label={t.label} />
          ))}
        </div>
      </Section>

      <Section title="Surfaces & Backgrounds">
        <div className="bt-scale">
          {SURFACE_TOKENS.map(t => (
            <Swatch key={t.token} bg={t.token} label={t.label} border />
          ))}
        </div>
      </Section>

      <Section title="Text Hierarchy">
        <div className="bt-text-list">
          {TEXT_TOKENS.map(t => (
            <div key={t.token} className="bt-text-row">
              <span style={{ color: `var(${t.token})`, background: 'var(--color-surface-raised)', padding: '8px 12px', borderRadius: '8px' }}>
                The quick brown fox — {t.label}
              </span>
              <code className="bt-swatch-token">{t.token}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Border Radius">
        <div className="bt-radius-list">
          {RADIUS_TOKENS.map(t => (
            <div key={t.token} className="bt-radius-row">
              <div className="bt-radius-box" style={{ borderRadius: `var(${t.token})` }} />
              <div>
                <span className="bt-swatch-label">{t.label}</span>
                <code className="bt-swatch-token">{t.token}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Stroke Widths">
        <div className="bt-stroke-list">
          {STROKE_TOKENS.map(t => (
            <div key={t.token} className="bt-stroke-row">
              <div className="bt-stroke-line" style={{ borderTopWidth: t.width }} />
              <div>
                <span className="bt-swatch-label">{t.label}</span>
                <code className="bt-swatch-token">{t.token}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Components">
        <div className="bt-components">

          <div className="bt-component-group">
            <h3>Buttons &amp; FAB</h3>
            <div className="bt-row">
              <button className="bt-fab">+</button>
              <button className="bt-btn-primary">Primary</button>
              <button className="bt-btn-ghost">Ghost</button>
            </div>
            <div className="bt-token-list">
              <code>--btn-primary-bg</code>
              <code>--btn-primary-color</code>
              <code>--btn-primary-radius</code>
              <code>--btn-ghost-color</code>
              <code>--btn-ghost-radius</code>
              <code>--fab-bg</code>
              <code>--fab-radius</code>
              <code>--fab-shadow</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Navigation</h3>
            <div className="bt-nav-strip">
              {[
                { label: 'Home', active: true, path: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
                { label: 'Feed', active: false, path: 'M4 6h16M4 12h16M4 18h16' },
                { label: 'Search', active: false, path: 'M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z' },
              ].map(({ label, active, path }) => (
                <div key={label} className={`bt-nav-item ${active ? 'bt-nav-item--active' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="bt-token-list">
              <code>--nav-item-color</code>
              <code>--nav-item-active-color</code>
              <code>--nav-avatar-bg</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Feed Tabs</h3>
            <div className="bt-row">
              <button className="bt-tab bt-tab--active">All <span className="bt-tab-count">4</span></button>
              <button className="bt-tab">Recognition</button>
              <button className="bt-tab">Saved <span className="bt-tab-count">2</span></button>
            </div>
            <div className="bt-token-list">
              <code>--feed-tab-bg</code>
              <code>--feed-tab-color</code>
              <code>--feed-tab-active-bg</code>
              <code>--feed-tab-active-color</code>
              <code>--feed-tab-active-stroke-color</code>
              <code>--feed-tab-count-bg</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Search Input</h3>
            <input className="search-input" type="text" placeholder="Search content and retailers…" readOnly style={{ marginBottom: 0 }} />
            <div className="bt-token-list">
              <code>--search-stroke-color</code>
              <code>--search-stroke-color-focus</code>
              <code>--search-radius</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>News Card</h3>
            <div className="nc" style={{ maxWidth: 320 }}>
              <div className="nc-img-wrap" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <span className="nc-tag">Your Team</span>
                <span className="nc-badge">For you</span>
              </div>
              <div className="nc-body">
                <p className="nc-title">Design System v2.0 launched</p>
                <p className="nc-desc">The new component library is live. All teams encouraged to migrate by end of Q2.</p>
                <div className="card-footer">
                  <span className="nc-time">2m ago</span>
                </div>
              </div>
            </div>
            <div className="bt-token-list">
              <code>--nc-bg</code>
              <code>--nc-radius</code>
              <code>--nc-tag-bg</code>
              <code>--nc-tag-color</code>
              <code>--nc-badge-bg</code>
              <code>--nc-title-color</code>
              <code>--nc-desc-color</code>
              <code>--nc-time-color</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Card Actions</h3>
            <div className="nc" style={{ maxWidth: 320 }}>
              <div className="card-actions">
                <div className="card-actions-left">
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                    </svg>
                    <span className="action-count">12</span>
                  </button>
                  <button className="action-btn action-btn--active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                    </svg>
                    <span className="action-count">13</span>
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <span className="action-count">4</span>
                  </button>
                </div>
                <button className="save-btn save-btn--saved">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bt-token-list">
              <code>--save-btn-color</code>
              <code>--save-btn-saved-color</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Recognition Value Badges</h3>
            <div className="bt-row">
              {[
                { label: 'Innovation',    bg: '#ede9fe', text: '#7c3aed' },
                { label: 'Collaboration', bg: '#dbeafe', text: '#1d4ed8' },
                { label: 'Customer Focus',bg: '#dcfce7', text: '#15803d' },
                { label: 'Excellence',    bg: '#fef9c3', text: '#a16207' },
                { label: 'Teamwork',      bg: '#fee2e2', text: '#b91c1c' },
              ].map(v => (
                <span key={v.label} className="rc-value" style={{ background: v.bg, color: v.text }}>{v.label}</span>
              ))}
            </div>
            <div className="bt-token-list">
              <code>--rc-value-radius</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>CTA Cards</h3>
            <div className="bt-row" style={{ alignItems: 'stretch' }}>
              <div className="cta-card cta-discounts" style={{ flex: '0 0 auto', width: 200, minHeight: 0 }}>
                <p className="cta-title">Discounts</p>
                <p className="cta-label">Total Savings</p>
                <p className="cta-value">£300.00</p>
                <button className="cta-btn" style={{ marginTop: 12 }}>View Discounts</button>
              </div>
              <div
                className="cta-card cta-rewards"
                style={{
                  flex: '0 0 auto',
                  width: 200,
                  minHeight: 0,
                  ...(CTA_REWARDS_PRESETS[rewardsIdx]?.value && CTA_REWARDS_PRESETS[rewardsIdx].value !== 'custom'
                    ? { background: CTA_REWARDS_PRESETS[rewardsIdx].value }
                    : {}),
                }}
              >
                <p className="cta-title">Rewards</p>
                <p className="cta-label">Reward Points</p>
                <p className="cta-value">4,750 pts</p>
                <button className="cta-btn" style={{ marginTop: 12 }}>Redeem</button>
              </div>
            </div>
            <div className="bt-token-list">
              <code>--cta-discounts-bg</code>
              <code>--cta-rewards-bg</code>
              <code>--cta-color</code>
              <code>--cta-btn-bg</code>
              <code>--cta-card-radius</code>
              <code>--cta-bar-fill-bg</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Cards</h3>
            <div className="bt-row">
              <div className="bt-card">
                <div className="bt-card-title">Card Title</div>
                <div className="bt-card-body">Surface default with card radius and muted body text.</div>
              </div>
              <div className="bt-card bt-card--brand">
                <div className="bt-card-title">Brand Surface</div>
                <div className="bt-card-body">Using --color-surface-brand-tint background.</div>
              </div>
            </div>
            <div className="bt-token-list">
              <code>--card-bg</code>
              <code>--card-radius</code>
              <code>--card-title-color</code>
              <code>--card-body-color</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Badges &amp; Tags</h3>
            <div className="bt-row">
              <span className="bt-badge">Badge</span>
              <span className="bt-tag">Tag</span>
              <span className="bt-pill">Pill</span>
            </div>
            <div className="bt-token-list">
              <code>--color-surface-brand-tint</code>
              <code>--color-brand</code>
              <code>--radius-control</code>
              <code>--radius-pill</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Avatars</h3>
            <div className="bt-row">
              <div className="bt-avatar">RS</div>
              <div className="bt-avatar bt-avatar--brand">AB</div>
            </div>
            <div className="bt-token-list">
              <code>--nav-avatar-bg</code>
              <code>--nav-avatar-color</code>
              <code>--radius-circle</code>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Progress Bar</h3>
            <div className="bt-progress-track">
              <div className="bt-progress-fill" style={{ width: '65%' }} />
            </div>
            <div className="bt-token-list">
              <code>--goal-track-bg</code>
              <code>--goal-bar-fill</code>
              <code>--shadow-progress-track</code>
            </div>
          </div>

        </div>
      </Section>


      <h2 className="bt-page-heading">Internal Brand Configuration</h2>

      <Section title="Surfaces">
        <div className="bt-surfaces-list">
          <div className="bt-surface-row">
            <span className="bt-surface-label">Font</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <select className="bt-select" value={fontIdx} onChange={e => handleFontChange(Number(e.target.value))}>
                  {FONT_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">App Background</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot bt-seed-dot--bg" />
                <select className="bt-select" value={bgIdx} onChange={e => handleBgChange(Number(e.target.value))}>
                  {BG_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
              {BG_PRESETS[bgIdx]?.value === 'custom' && (
                <input className="bt-url-input" type="text" placeholder="https://example.com/image.jpg"
                  value={customUrl} onChange={e => handleCustomUrl(e.target.value)} />
              )}
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Discounts Card</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'linear-gradient(135deg, #f97060, #fb9a8a)' }} />
                <select className="bt-select" value={discountIdx} onChange={e => handleDiscountChange(Number(e.target.value))}>
                  {CTA_DISCOUNTS_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
              {CTA_DISCOUNTS_PRESETS[discountIdx]?.value === 'custom' && (
                <input className="bt-url-input" type="text" placeholder="https://example.com/image.jpg"
                  value={discountUrl} onChange={e => handleDiscountUrl(e.target.value)} />
              )}
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Savings Goal</span>
            <div className="bt-bg-row">
              <button
                className={`bt-toggle ${savingsGoalEnabled ? 'bt-toggle--on' : ''}`}
                onClick={handleSavingsGoalToggle}
                aria-pressed={savingsGoalEnabled}
              >
                <span className="bt-toggle-thumb" />
                <span className="bt-toggle-label">{savingsGoalEnabled ? 'On' : 'Off'}</span>
              </button>
              {savingsGoalEnabled && <>
                <input className="bt-url-input" type="number" placeholder="2000" min="1"
                  value={savingsGoalTarget} onChange={e => handleSavingsGoalTarget(e.target.value)} style={{ width: 90 }} />
                <input className="bt-url-input" type="text" placeholder="Save £2,000 by June"
                  value={savingsGoalLabel} onChange={e => handleSavingsGoalLabel(e.target.value)} />
              </>}
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Rewards Card</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }} />
                <select className="bt-select" value={rewardsIdx} onChange={e => handleRewardsChange(Number(e.target.value))}>
                  {CTA_REWARDS_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
              {CTA_REWARDS_PRESETS[rewardsIdx]?.value === 'custom' && (
                <input className="bt-url-input" type="text" placeholder="https://example.com/image.jpg"
                  value={rewardsUrl} onChange={e => handleRewardsUrl(e.target.value)} />
              )}
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">CTA Button</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <select className="bt-select" value={ctaBtnIdx} onChange={e => handleCtaBtnChange(Number(e.target.value))}>
                  {CTA_BTN_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Image filter (dark mode)</span>
            <div className="bt-bg-row">
              <button
                className={`bt-toggle ${imgFilter ? 'bt-toggle--on' : ''}`}
                onClick={handleImgFilterToggle}
                aria-pressed={imgFilter}
              >
                <span className="bt-toggle-thumb" />
                <span className="bt-toggle-label">{imgFilter ? 'On' : 'Off'}</span>
              </button>
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Wellbeing activity card</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'var(--activity-bg)' }} />
                <select className="bt-select" value={activityIdx} onChange={e => handleActivityChange(Number(e.target.value))}>
                  {CTA_ACTIVITY_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
              {CTA_ACTIVITY_PRESETS[activityIdx]?.value === 'custom' && (
                <input className="bt-url-input" type="text" placeholder="https://example.com/image.jpg"
                  value={activityUrl} onChange={e => handleActivityUrl(e.target.value)} />
              )}
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Content cards</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'var(--card-bg)' }} />
                <select className="bt-select" value={contentCardIdx} onChange={e => handleContentCardChange(Number(e.target.value))}>
                  {HOME_CARD_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
            </div>
          </div>


          <div className="bt-surface-row">
            <span className="bt-surface-label">Recognition nudge</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'var(--rec-nudge-bg)' }} />
                <select className="bt-select" value={recNudgeIdx} onChange={e => handleRecNudgeChange(Number(e.target.value))}>
                  {HOME_CARD_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="bt-surface-row">
            <span className="bt-surface-label">Quick links cards</span>
            <div className="bt-bg-row">
              <label className="bt-seed">
                <div className="bt-seed-dot" style={{ background: 'var(--quick-link-card-bg)' }} />
                <select className="bt-select" value={quickLinksIdx} onChange={e => handleQuickLinksChange(Number(e.target.value))}>
                  {HOME_CARD_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                </select>
              </label>
            </div>
          </div>

        </div>
      </Section>

      <Section title="Navigation">
        <div className="bt-nav-toggles">
          {NAV_ITEM_IDS.map((id) => {
            const isVisible = !hiddenNav.includes(id)
            const label = id === 'profile' ? 'You' : id.charAt(0).toUpperCase() + id.slice(1)
            return (
              <div key={id}>
                <div className="bt-nav-toggle-row">
                  <span className="bt-nav-toggle-label">{label}</span>
                  <button
                    className={`bt-toggle ${isVisible ? 'bt-toggle--on' : ''}`}
                    onClick={() => handleNavToggle(id)}
                    aria-pressed={isVisible}
                  >
                    <span className="bt-toggle-thumb" />
                  </button>
                </div>
                {id === 'home' && (
                  <>
                    <div className="bt-nav-sub-row">
                      <button
                        className={`bt-view-pill ${homeView === 'native' ? 'bt-view-pill--active' : ''}`}
                        onClick={() => handleHomeViewChange('native')}
                      >Native</button>
                      <button
                        className={`bt-view-pill ${homeView === 'web' ? 'bt-view-pill--active' : ''}`}
                        onClick={() => handleHomeViewChange('web')}
                      >Web</button>
                    </div>
                    <p className="bt-nav-note">⚠️ Home is still in early phases of development and should only be enabled if absolutely necessary.</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
