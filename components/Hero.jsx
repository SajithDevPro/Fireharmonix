'use client'

import ExploreBar from './ExploreBar'
import { HomeIcon, MenuIcon } from './Icons'

export default function Hero({ onToggleMenu }) {
  return (
    <header className="hero" id="home">
      <div className="topbar">
        <a className="home" href="#home" aria-label="Home"><HomeIcon /></a>
        <button className="toggle" onClick={onToggleMenu} aria-label="Open menu"><MenuIcon /></button>
      </div>

      <div className="title">
        <h1>FIREHARMONIX</h1>
        <p>IGNITE THE HARMONY</p>
      </div>

      <svg className="wave" viewBox="0 0 1600 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 62 C 200 40, 380 70, 640 50 S 1000 4, 1200 20 S 1500 50, 1600 46" />
      </svg>

      <ExploreBar />
    </header>
  )
}
