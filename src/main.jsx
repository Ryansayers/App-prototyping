import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MvpApp from './MvpApp.jsx'
import BrandTokens from './pages/BrandTokens.jsx'
import DesktopView from './pages/DesktopView.jsx'
import DesktopPageNav2 from './pages/DesktopPageNav2.jsx'
import { applySeeds, loadSeeds, PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS, applyBg, loadBg, applyTheme, loadTheme, applyCardBg, loadCardBg, CTA_DISCOUNTS_PRESETS, CTA_REWARDS_PRESETS, applyFont, loadFont, applySchemeAttr, applyImageFilter, loadImageFilter } from './seeds.js'

applySchemeAttr()
applyImageFilter(loadImageFilter())

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
const titles = {
  '/brand-tokens':     'Brand Tokens',
  '/desktop-view':     'Desktop-vision',
  '/desktop-page-nav2':'Desktop-consolidation',
  '/mvp':              'MVP',
}
document.title = titles[path] || 'Long-term-vision'

const root = path === '/brand-tokens'      ? <BrandTokens />
           : path === '/desktop-view'       ? <DesktopView />
           : path === '/desktop-page-nav2'  ? <DesktopPageNav2 />
           : path === '/mvp'               ? <MvpApp />
           : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>{root}</StrictMode>
)
