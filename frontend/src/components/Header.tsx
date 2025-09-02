import { AdminNavigation } from "./nav/AdminNavigation"
import { HomeNavigation } from "./nav/HomeNavigation"
import { Logo } from "./Logo"

export const Header = () => {
  return (
    <header className="bg-white py-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <Logo />
        <nav className="md:w-1/3 md:flex md:justify-end">
          {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
        </nav>
      </div>
    </header>
  )
}
