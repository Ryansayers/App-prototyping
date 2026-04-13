import { useState, useEffect } from 'react'
import { applySchemeAttr, applyImageFilter, loadImageFilter, applyTheme, loadTheme, loadSeeds, PRIMARY_PRESETS, NEUTRAL_PRESETS, applyFont, loadFont } from './seeds.js'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import FAB from './components/FAB'
import Home from './pages/Home'
import Search from './pages/Search'
import Feed from './pages/Feed'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import './App.css'
import './mvp.css'

const PAGES = {
  home:      { title: 'Home',      component: <Home /> },
  search:    { title: 'Search',    component: <Search /> },
  feed:      { title: 'Feed',      component: <Feed /> },
  shop:      { title: 'Shop',      component: <Shop /> },
  profile:   { title: 'You',       component: <Profile /> },
}

export default function MvpApp() {
  const [activePage, setActivePage] = useState('home')
  useEffect(() => {
    applySchemeAttr()
    applyImageFilter(loadImageFilter())
    applyFont(loadFont())
    const seeds = loadSeeds()
    const primary = PRIMARY_PRESETS[seeds.primary] || PRIMARY_PRESETS[0]
    const neutral = NEUTRAL_PRESETS[seeds.neutral] || NEUTRAL_PRESETS[0]
    const el = document.documentElement
    el.style.setProperty('--color-primary-h', primary.h)
    el.style.setProperty('--color-primary-s', `${primary.s}%`)
    el.style.setProperty('--color-neutral-h', neutral.h)
    el.style.setProperty('--color-neutral-s', `${neutral.s}%`)
    if (neutral.pureDark) el.setAttribute('data-neutral', 'pure-dark')
    else el.removeAttribute('data-neutral')
    applyTheme(loadTheme())
  }, [])
  const { title, component } = PAGES[activePage]

  function handlePageChange(page) {
    setActivePage(page)
  }

  return (
    <div className="app app--mvp">
      <main className="content">
        <div className={`app-top ${activePage === 'home' ? 'app-top--home' : 'app-top--page'}`}>
          <StatusBar />
          <Header title={title} isHome={activePage === 'home'} />
        </div>
        {component}
      </main>
      <FAB activePage={activePage} />
      <BottomNav active={activePage} onChange={handlePageChange} />
    </div>
  )
}
