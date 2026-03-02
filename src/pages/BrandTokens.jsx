import { useState, useEffect } from 'react'
import './BrandTokens.css'
import {
  PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS,
  applySeeds, saveSeeds, loadSeeds,
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
  { token: '--color-surface-brand',        label: 'Brand' },
  { token: '--color-surface-brand-tint',   label: 'Brand Tint' },
  { token: '--color-surface-accent-tint',  label: 'Accent Tint' },
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
  { token: '--color-accent-tint',   label: 'Accent Tint' },
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

export default function BrandTokens() {
  const [primaryIdx,   setPrimaryIdx]   = useSeed('primary',   PRIMARY_PRESETS)
  const [secondaryIdx, setSecondaryIdx] = useSeed('secondary', SECONDARY_PRESETS)
  const [neutralIdx,   setNeutralIdx]   = useSeed('neutral',   NEUTRAL_PRESETS)

  return (
    <div className="bt-page">
      <header className="bt-header">
        <h1>Brand Tokens</h1>
        <p>Live token reference — all values respond to seed changes below</p>
        <div className="bt-seeds">
          <label className="bt-seed">
            <div className="bt-seed-dot" style={{ background: 'var(--color-primary-500)' }} />
            <span>Primary</span>
            <select className="bt-select" value={primaryIdx} onChange={e => setPrimaryIdx(Number(e.target.value))}>
              {PRIMARY_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </label>
          <label className="bt-seed">
            <div className="bt-seed-dot" style={{ background: 'var(--color-secondary-500)' }} />
            <span>Secondary</span>
            <select className="bt-select" value={secondaryIdx} onChange={e => setSecondaryIdx(Number(e.target.value))}>
              {SECONDARY_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </label>
          <label className="bt-seed">
            <div className="bt-seed-dot" style={{ background: 'var(--color-neutral-500)' }} />
            <span>Neutral</span>
            <select className="bt-select" value={neutralIdx} onChange={e => setNeutralIdx(Number(e.target.value))}>
              {NEUTRAL_PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
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

      <Section title="Secondary Scale">
        <div className="bt-scale">
          {PRIMARY_STOPS.map(s => (
            <Swatch key={s} bg={`--color-secondary-${s}`} label={s} />
          ))}
        </div>
      </Section>

      <Section title="Neutral Scale">
        <div className="bt-scale">
          {NEUTRAL_STOPS.map(s => (
            <Swatch key={s} bg={`--color-neutral-${s}`} label={s} border={s === 0} />
          ))}
        </div>
      </Section>

      <Section title="Brand & Accent">
        <div className="bt-scale">
          {BRAND_TOKENS.map(t => (
            <Swatch key={t.token} bg={t.token} label={t.label} />
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

      <Section title="Component Tokens in Use">
        <div className="bt-components">

          <div className="bt-component-group">
            <h3>Buttons / FAB</h3>
            <div className="bt-row">
              <button className="bt-fab">+</button>
              <button className="bt-btn-primary">Primary Button</button>
              <button className="bt-btn-ghost">Ghost Button</button>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Feed Tabs</h3>
            <div className="bt-row">
              <button className="bt-tab bt-tab--active">All <span className="bt-tab-count">4</span></button>
              <button className="bt-tab">Saved <span className="bt-tab-count">2</span></button>
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
          </div>

          <div className="bt-component-group">
            <h3>Badges & Tags</h3>
            <div className="bt-row">
              <span className="bt-badge">Badge</span>
              <span className="bt-tag">Tag</span>
              <span className="bt-pill">Pill</span>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Avatars</h3>
            <div className="bt-row">
              <div className="bt-avatar">RS</div>
              <div className="bt-avatar bt-avatar--brand">AB</div>
            </div>
          </div>

          <div className="bt-component-group">
            <h3>Progress Bar</h3>
            <div className="bt-progress-track">
              <div className="bt-progress-fill" style={{ width: '65%' }} />
            </div>
          </div>

        </div>
      </Section>
    </div>
  )
}
