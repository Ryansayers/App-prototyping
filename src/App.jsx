import { useState } from 'react'
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

const PAGES = {
  home:      { title: 'Home',      component: <Home /> },
  search:    { title: 'Search',    component: <Search /> },
  feed:      { title: 'Feed',      component: <Feed /> },
  shop:      { title: 'Shop',      component: <Shop /> },
  profile:   { title: 'You',       component: <Profile /> },
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
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
