import { Link } from "react-router-dom"

export const HomeNavigation = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/auth/login"
        className="px-2 py-2 text-base font-medium text-violet-600 border-2 border-violet-500 rounded-md hover:bg-violet-500 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/auth/register"
        className="px-2 py-2 text-base text-white bg-gradient-to-r from-violet-500 to-pink-500 rounded-md hover:from-violet-600 hover:to-pink-600 transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
      >
        Registrarse
      </Link>
    </div>
  )
}
