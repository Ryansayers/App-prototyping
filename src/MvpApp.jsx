import { useState, useEffect } from 'react'
import { applySchemeAttr, applyImageFilter, loadImageFilter, applyTheme, loadTheme, loadSeeds, PRIMARY_PRESETS, NEUTRAL_PRESETS, applyFont, loadFont, loadNavConfig, loadLaunchHub, loadBrandLogoVisible, loadAskAiPage } from './seeds.js'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import FAB from './components/FAB'
import Home from './pages/Home'
import Search from './pages/Search'
import Feed from './pages/Feed'
import Shop from './pages/Shop'
import MvpProfile from './pages/MvpProfile'
import Notifications from './pages/Notifications'
import './App.css'
import './mvp.css'

const PAGES = {
  home:          { title: 'Home',          component: <Home /> },
  search:        { title: 'Search',        component: <Search /> },
  feed:          { title: 'Feed',          component: <Feed /> },
  shop:          { title: 'Shop',          component: <Shop /> },
  profile:       { title: 'You',           component: <MvpProfile /> },
  notifications: { title: 'Notifications', component: <Notifications /> },
}

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

export default function MvpApp() {
  const [activePage, setActivePage] = useState('home')
  const [hiddenNav, setHiddenNav] = useState(() => loadNavConfig())
  const [showHub, setShowHub] = useState(false)
  const [launchHubEnabled, setLaunchHubEnabled] = useState(() => loadLaunchHub())
  const [brandLogoVisible, setBrandLogoVisible] = useState(() => loadBrandLogoVisible())
  const [askAiPage, setAskAiPage] = useState(() => loadAskAiPage())
  useEffect(() => {
    const onNavChange = () => setHiddenNav(loadNavConfig())
    const onHubChange = (e) => setLaunchHubEnabled(e.detail)
    const onLogoChange = (e) => setBrandLogoVisible(e.detail)
    const onAskAiChange = (e) => setAskAiPage(e.detail)
    window.addEventListener('nav-config-changed', onNavChange)
    window.addEventListener('launch-hub-changed', onHubChange)
    window.addEventListener('brand-logo-visible-changed', onLogoChange)
    window.addEventListener('ask-ai-page-changed', onAskAiChange)
    return () => {
      window.removeEventListener('nav-config-changed', onNavChange)
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
    const primary = PRIMARY_PRESETS[seeds.primary] || PRIMARY_PRESETS[0]
    const neutral = NEUTRAL_PRESETS[seeds.neutral] || NEUTRAL_PRESETS[0]
    const el = document.documentElement
    el.style.setProperty('--color-primary-h',        primary.h)
    el.style.setProperty('--color-primary-s',        `${primary.s}%`)
    el.style.setProperty('--color-primary-contrast', primary.darkText ? '#000000' : '#ffffff')
    el.style.setProperty('--color-neutral-h', neutral.h)
    el.style.setProperty('--color-neutral-s', `${neutral.s}%`)
    if (neutral.pureDark) el.setAttribute('data-neutral', 'pure-dark')
    else el.removeAttribute('data-neutral')
    applyTheme('light')
  }, [])
  const { title } = PAGES[activePage]
  const component = activePage === 'feed'
    ? <Feed onLaunchHub={launchHubEnabled ? () => setShowHub(true) : null} />
    : PAGES[activePage].component

  function handlePageChange(page) {
    setActivePage(page)
  }

  const smileyIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={activePage === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" />
      <circle cx="9" cy="10" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth={2} />
      <circle cx="15" cy="10" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth={2} />
      <path d="M8.5 14.5c1 1.5 5.5 1.5 7 0" stroke={activePage === 'profile' ? 'white' : 'currentColor'} />
    </svg>
  )

  return (
    <div className="app app--mvp">
      <main className="content">
        <div className={`app-top ${activePage === 'home' ? 'app-top--home' : 'app-top--page'}`}>
          <StatusBar />
          <Header title={title} isHome={activePage === 'home'} avatar="RS" onNotifClick={() => setActivePage('notifications')} showLogo={brandLogoVisible} />
        </div>
        {component}
      </main>
      <FAB activePage={activePage} askAiPage={askAiPage} />
      <BottomNav active={activePage} onChange={handlePageChange} labels={{ profile: 'You' }} icons={{ profile: smileyIcon }} hidden={hiddenNav} />
      {showHub && <HubWebView onClose={() => setShowHub(false)} />}
    </div>
  )
}
