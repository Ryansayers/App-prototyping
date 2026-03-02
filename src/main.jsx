import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BrandTokens from './pages/BrandTokens.jsx'
import { applySeeds, loadSeeds, PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS } from './seeds.js'

const { primary, secondary, neutral } = loadSeeds()
applySeeds({
  primary:   PRIMARY_PRESETS[primary],
  secondary: SECONDARY_PRESETS[secondary],
  neutral:   NEUTRAL_PRESETS[neutral],
})

const root = window.location.pathname === '/brand-tokens' ? <BrandTokens /> : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>{root}</StrictMode>
)
