import { useQueryClient } from "@tanstack/react-query"

export const AdminNavigation = () => {
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <button
      onClick={logout}
      className="cursor-pointer justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-base text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 ease-in-out"
    >
      Cerrar Sesión
    </button>
  )
}
