import { useState, useEffect } from 'react'
import { applySchemeAttr, applyImageFilter, loadImageFilter, applyTheme, loadTheme, applySeeds, loadSeeds, PRIMARY_PRESETS, SECONDARY_PRESETS, NEUTRAL_PRESETS, applyFont, loadFont } from './seeds.js'
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
import './desktop.css'

const PAGES = {
  home:      { title: 'Home',      component: <Home /> },
  search:    { title: 'Search',    component: <Search /> },
  feed:      { title: 'Feed',      component: <Feed /> },
  shop:      { title: 'Shop',      component: <Shop /> },
  profile:   { title: 'You',       component: <Profile /> },
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
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
  const { title, component } = PAGES[activePage]

  function handlePageChange(page) {
    setActivePage(page)
  }

  return (
    <div className="app">
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
