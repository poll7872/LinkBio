import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
  data: UserHandle
}

export const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

  return (
    <div className="text-white flex flex-col items-center space-y-6">
      {data.url_image && (
        <img
          src={data.url_image}
          alt="imagen de perfil"
          className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
        />
      )}
      <h1 className="text-4xl font-bold text-center">@{data.handle}</h1>
      <p className="text-center text-lg">{data.description}</p>

      <div className="mt-5 w-full flex flex-col gap-4">
        {links.length ?
          links.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-white/90 text-slate-800 w-full py-3 px-5 rounded-lg flex items-center gap-4 hover:scale-105 transition-transform duration-200 shadow-md"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt={`icono de ${link.name}`}
                className="w-8 h-8"
              />
              Visita mi:
              <span className="font-semibold text-lg capitalize">{link.name}</span>
            </a>
          ))
          : <p className="text-center text-white/80"><i>No hay enlaces disponibles</i></p>}
      </div>
    </div>
  )
}
