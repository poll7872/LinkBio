import { Toaster } from "sonner";
import { NavigationTabs } from "../components/NavigationTabs";
import { Link, Outlet } from "react-router-dom";
import type { User } from "../types";

type LinkBioProps = {
  data: User
}

export const LinkBio = ({ data }: LinkBioProps) => {
  return (
    <>
      <header className="bg-white py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className="bg-transparent border-2 border-violet-500 text-violet-600 uppercase font-bold text-xs rounded-full px-4 py-2 hover:bg-violet-500 hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={() => { }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-violet-600 text-2xl hover:text-violet-700 transition-colors duration-200"
              to={''}
              target="_blank"
              rel="noreferrer noopener"
            >Visitar Mi Perfil: /{data.handle}</Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-gradient-to-br from-violet-500 to-pink-500 px-5 py-10 space-y-6 rounded-lg shadow-xl">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.url_image && <img src={data.url_image} alt="imagen de perfil" className="mx-auto max-w-[250px] rounded-full shadow-lg border-4 border-white" />}
              <p className="text-center text-lg font-black text-white">{data.description}</p>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  )
}
