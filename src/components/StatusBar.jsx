import { useState, useEffect } from 'react'
import './StatusBar.css'

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 8.5a17 17 0 0121 0M5 12.5a11 11 0 0114 0M8.5 16.5a6 6 0 017 0M12 20.5h.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
  </svg>
)

const SignalIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="2"  y="16" width="3" height="5" rx="1" />
    <rect x="7"  y="12" width="3" height="9" rx="1" />
    <rect x="12" y="8"  width="3" height="13" rx="1" />
    <rect x="17" y="4"  width="3" height="17" rx="1" />
  </svg>
)

const BatteryIcon = ({ level }) => {
  const color = level <= 20 ? '#f44' : 'currentColor'
  return (
    <svg viewBox="0 0 24 10" fill="none">
      <rect x="0.5" y="0.5" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="2" width={(level / 100) * 17} height="6" rx="1" fill={color} />
      <path d="M21.5 3.5v3a1.5 1.5 0 000-3z" fill="currentColor" />
    </svg>
  )
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function StatusBar() {
  const [time, setTime] = useState(getTime)

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon level={72} />
      </div>
    </div>
  )
}
