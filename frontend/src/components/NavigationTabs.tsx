import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
  { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const NavigationTabs = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value)
  }

  return (
    <div className='mb-5'>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-violet-500 focus:ring-violet-500"
          onChange={handleChange}
        >
          {tabs.map((tab) => (
            <option
              value={tab.href}
              key={tab.name}
            >{tab.name}</option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-500 hover:border-violet-300 hover:text-violet-500',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href ? 'text-violet-600' : 'text-gray-400 group-hover:text-violet-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
