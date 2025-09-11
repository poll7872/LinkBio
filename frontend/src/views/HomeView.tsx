import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";

export const HomeView = () => {
  return (
    <>
      <div className="min-h-screen bg-[url(/bg.svg)] bg-cover bg-center text-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-black tracking-tight">
                Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-300">Presencia Digital</span> en un Solo Lugar
              </h1>

              <p className="text-slate-50 text-xl max-w-2xl mx-auto">
                Unifica todas tus redes sociales, proyectos y enlaces importantes en una única página personalizada. Fácil de compartir, imposible de olvidar.
              </p>

              <div className="max-w-md mx-auto pt-6">
                <SearchForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};