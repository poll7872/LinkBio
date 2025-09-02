import { Link } from "react-router-dom";

export const NotFoundView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-pink-500 text-white p-4">
      <div className="text-center bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-8xl font-black tracking-tighter">404</h1>
        <p className="mt-2 text-3xl font-semibold">Página No Encontrada</p>
        <p className="mt-4 text-lg text-white/80">
          Lo sentimos, el perfil que buscas no existe o fue movido.
        </p>
        <div className="mt-8">
          <Link
            to={'/auth/login'}
            className="bg-white text-violet-600 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-lg"
          >
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  )
}