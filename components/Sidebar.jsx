'use client'

import { useEffect, useState } from 'react'
import { USER } from '../lib/user'
import {
  Overview, MyAreas, MapIcon, CalendarIcon, History, Alerts, Trust, UserIcon, SignOut,
} from './Icons'

const NAV = [
  { id: 'overview', label: 'Overview', Icon: Overview },
  { id: 'my-areas', label: 'My Areas', Icon: MyAreas },
  { id: 'map', label: 'Map', Icon: MapIcon },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { id: 'history', label: 'History', Icon: History },
  { id: 'alerts', label: 'Alerts', Icon: Alerts },
  { id: 'method-and-trust', label: 'Method and Trust', Icon: Trust },
]

function Avatar() {
  const [photoOk, setPhotoOk] = useState(false)
  const initials =
    USER.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'U'

  useEffect(() => {
    const img = new Image()
    img.onload = () => setPhotoOk(true)
    img.src = USER.avatar
  }, [])

  return (
    <div className="avatar">
      {photoOk ? <img src={USER.avatar} alt={USER.name} /> : <div className="initials">{initials}</div>}
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const [active, setActive] = useState('overview')

  const go = (id) => {
    setActive(id)
    onClose()
  }

  const signOut = (e) => {
    e.preventDefault()
    onClose()
    // Hook your real sign-out here
    console.log('Sign out')
    window.location.hash = 'sign-out'
  }

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="brand">
        <a href="#home">FIRE<b>HARMONIX</b></a>
        <small>IGNITE THE HARMONY</small>
      </div>

      <div className="profile">
        <Avatar />
        <div className="uname">{USER.name}</div>
      </div>

      <nav className="side-nav">
        {NAV.map(({ id, label, Icon }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => go(id)}>
            <Icon />
            {label}
          </a>
        ))}
      </nav>

      <nav className="side-nav foot">
        <a
          href="#profile-settings"
          className={active === 'profile-settings' ? 'active' : ''}
          onClick={() => go('profile-settings')}
        >
          <UserIcon />
          Profile &amp; Settings
        </a>
        <a href="#sign-out" data-signout onClick={signOut}>
          <SignOut />
          Sign out
        </a>
      </nav>
    </aside>
  )
}
