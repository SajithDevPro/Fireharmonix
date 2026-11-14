'use client'

import { useState } from 'react'
import { useUser, useClerk, SignInButton } from '@clerk/nextjs'
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

function UserProfileWidget() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="profile">
        <div className="avatar"><div className="initials">...</div></div>
        <div className="uname">Loading...</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="profile">
        <div className="avatar"><div className="initials">?</div></div>
        <div className="uname">Guest</div>
        <SignInButton mode="modal">
          <button className="auth-btn-signin" type="button">Sign In</button>
        </SignInButton>
      </div>
    )
  }

  const name = user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'User'
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'U'

  return (
    <div className="profile">
      <div className="avatar">
        {user.imageUrl ? <img src={user.imageUrl} alt={name} /> : <div className="initials">{initials}</div>}
      </div>
      <div className="uname" title={name}>{name}</div>
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const [active, setActive] = useState('overview')
  const { isSignedIn } = useUser()
  const { signOut, openUserProfile } = useClerk()

  const go = (id) => {
    setActive(id)
    onClose()
  }

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="brand">
        <a href="#home">FIRE<b>HARMONIX</b></a>
        <small>IGNITE THE HARMONY</small>
      </div>

      <UserProfileWidget />

      <nav className="side-nav">
        {NAV.map(({ id, label, Icon }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => go(id)}>
            <Icon />
            {label}
          </a>
        ))}
      </nav>

      <nav className="side-nav foot">
        {isSignedIn ? (
          <>
            <a
              href="#profile-settings"
              className={active === 'profile-settings' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                go('profile-settings')
                openUserProfile?.()
              }}
            >
              <UserIcon />
              Profile &amp; Settings
            </a>
            <a
              href="#sign-out"
              data-signout
              onClick={(e) => {
                e.preventDefault()
                onClose()
                signOut?.({ redirectUrl: '/' })
              }}
            >
              <SignOut />
              Sign out
            </a>
          </>
        ) : (
          <SignInButton mode="modal">
            <a href="#sign-in" onClick={(e) => { e.preventDefault(); onClose(); }}>
              <UserIcon />
              Sign In / Register
            </a>
          </SignInButton>
        )}
      </nav>
    </aside>
  )
}
