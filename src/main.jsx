import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BrandTokens from './pages/BrandTokens.jsx'
import DesktopView from './pages/DesktopView.jsx'
import { applySeeds, loadSeeds, PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS, applyBg, loadBg, applyTheme, loadTheme, applyCardBg, loadCardBg, CTA_DISCOUNTS_PRESETS, CTA_REWARDS_PRESETS, applyFont, loadFont } from './seeds.js'

const { primary, secondary, neutral } = loadSeeds()
applySeeds({
  primary:   PRIMARY_PRESETS[primary],
  secondary: SECONDARY_PRESETS[secondary],
  neutral:   NEUTRAL_PRESETS[neutral],
})

const { idx: bgIdx, url: bgUrl } = loadBg()
applyBg(bgIdx, bgUrl)

applyTheme(loadTheme())

const discounts = loadCardBg('discounts')
applyCardBg('--cta-discounts-bg', discounts.idx, discounts.url, CTA_DISCOUNTS_PRESETS)
const rewards = loadCardBg('rewards')
applyCardBg('--cta-rewards-bg', rewards.idx, rewards.url, CTA_REWARDS_PRESETS)

applyFont(loadFont())

const path = window.location.pathname
const root = path === '/brand-tokens' ? <BrandTokens />
           : path === '/desktop-view'  ? <DesktopView />
           : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>{root}</StrictMode>
)
