'use client'

import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className={`backdrop${menuOpen ? ' show' : ''}`} onClick={() => setMenuOpen(false)} />
      <main>
        <Hero onToggleMenu={() => setMenuOpen(true)} />
      </main>
    </>
  )
}
