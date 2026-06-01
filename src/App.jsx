import { useState, useEffect } from 'react'
import { applySchemeAttr, applyImageFilter, loadImageFilter, applyTheme, loadTheme, applySeeds, loadSeeds, PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS, applyFont, loadFont, loadLaunchHub, loadBrandLogoVisible, loadAskAiPage } from './seeds.js'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import FAB from './components/FAB'
import Home from './pages/Home'
import Search from './pages/Search'
import Feed from './pages/Feed'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import './App.css'

function HubWebView({ onClose }) {
  return (
    <div className="hub-webview">
      <div className="hub-webview-bar">
        <button className="hub-webview-back" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="hub-webview-url">hub.yourcompany.com</span>
        <div style={{ width: 32 }} />
      </div>
      <div className="hub-webview-content">
        <img src="/hub-web-view.png" alt="Hub" style={{ width: '100%', display: 'block' }} />
      </div>
    </div>
  )
}

const PAGES = {
  home:          { title: 'Home',          component: <Home /> },
  search:        { title: 'Search',        component: <Search /> },
  feed:          { title: 'Feed',          component: <Feed /> },
  shop:          { title: 'Shop',          component: <Shop /> },
  profile:       { title: 'You',           component: <Profile /> },
  notifications: { title: 'Notifications', component: <Notifications /> },
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [showHub, setShowHub] = useState(false)
  const [launchHubEnabled, setLaunchHubEnabled] = useState(() => loadLaunchHub())
  const [brandLogoVisible, setBrandLogoVisible] = useState(() => loadBrandLogoVisible())
  const [askAiPage, setAskAiPage] = useState(() => loadAskAiPage())
  useEffect(() => {
    const onHubChange = (e) => setLaunchHubEnabled(e.detail)
    const onLogoChange = (e) => setBrandLogoVisible(e.detail)
    const onAskAiChange = (e) => setAskAiPage(e.detail)
    window.addEventListener('launch-hub-changed', onHubChange)
    window.addEventListener('brand-logo-visible-changed', onLogoChange)
    window.addEventListener('ask-ai-page-changed', onAskAiChange)
    return () => {
      window.removeEventListener('launch-hub-changed', onHubChange)
      window.removeEventListener('brand-logo-visible-changed', onLogoChange)
      window.removeEventListener('ask-ai-page-changed', onAskAiChange)
    }
  }, [])
  useEffect(() => {
    applySchemeAttr()
    applyImageFilter(loadImageFilter())
    applyFont(loadFont())
    const seeds = loadSeeds()
    applySeeds({
      primary:   PRIMARY_PRESETS[seeds.primary]   || PRIMARY_PRESETS[0],
      secondary: SECONDARY_PRESETS[seeds.secondary] || SECONDARY_PRESETS[0],
      neutral:   NEUTRAL_PRESETS[seeds.neutral]   || NEUTRAL_PRESETS[0],
    })
    applyTheme(loadTheme())
  }, [])
  const { title } = PAGES[activePage]
  const component = activePage === 'feed'
    ? <Feed onLaunchHub={launchHubEnabled ? () => setShowHub(true) : null} />
    : PAGES[activePage].component

  function handlePageChange(page) {
    setActivePage(page)
  }

  return (
    <div className="app">
      <main className="content">
        <div className={`app-top ${activePage === 'home' ? 'app-top--home' : 'app-top--page'}`}>
          <StatusBar />
          <Header title={title} isHome={activePage === 'home'} onNotifClick={() => setActivePage('notifications')} showLogo={brandLogoVisible} />
        </div>
        {component}
      </main>
      <FAB activePage={activePage} askAiPage={askAiPage} />
      <BottomNav active={activePage} onChange={handlePageChange} />
      {showHub && <HubWebView onClose={() => setShowHub(false)} />}
    </div>
  )
}
