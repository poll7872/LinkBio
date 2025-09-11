import { AdminNavigation } from "./nav/AdminNavigation"
import { HomeNavigation } from "./nav/HomeNavigation"
import { Logo } from "./Logo"

export const Header = () => {
  const isHome = location.pathname === '/'

  return (
    <header className={`${isHome ? 'bg-transparent' : 'bg-white'} py-5`}>
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <Logo isHome={isHome} />
        <nav className="md:w-1/3 md:flex md:justify-end">
          {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
        </nav>
      </div>
    </header>
  )
}
