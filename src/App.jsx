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
  profile:   { title: 'You',      component: <Profile /> },
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const { title, component } = PAGES[activePage]

  return (
    <div className="app">
      <StatusBar />
      <Header title={title} />
      <main className="content">{component}</main>
      <FAB activePage={activePage} />
      <BottomNav active={activePage} onChange={setActivePage} />
    </div>
  )
}
