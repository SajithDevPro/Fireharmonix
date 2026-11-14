const S = ({ children }) => <svg viewBox="0 0 24 24">{children}</svg>

export const HomeIcon = () => (
  <S><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" /></S>
)
export const MenuIcon = () => (
  <S><path d="M4 7h16M4 12h16M4 17h16" /></S>
)
export const Overview = () => (
  <S>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </S>
)
export const MyAreas = () => (
  <S>
    <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </S>
)
export const MapIcon = () => (
  <S><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" /></S>
)
export const CalendarIcon = () => (
  <S>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </S>
)
export const History = () => (
  <S><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8M3 3v5h5M12 7v5l3 2" /></S>
)
export const Alerts = () => (
  <S><path d="M6 9a6 6 0 0112 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 004 0" /></S>
)
export const Trust = () => (
  <S><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5" /></S>
)
export const UserIcon = () => (
  <S>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </S>
)
export const SignOut = () => (
  <S><path d="M9 4H5a2 2 0 00-2 2v12a2 2 0 002 2h4M16 8l4 4-4 4M20 12H9" /></S>
)

export const PrevIcon = () => (
  <svg viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" /></svg>
)
export const NextIcon = () => (
  <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" /></svg>
)
