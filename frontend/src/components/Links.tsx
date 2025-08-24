import type { SocialNetwork } from "../types";

type LinksProps = {
  link: SocialNetwork;
};

export const Links = ({ link }: LinksProps) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group block w-full p-4 bg-white rounded-lg border border-slate-200 hover:border-transparent hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      <div className="relative flex items-center gap-3">
        <div
          className="w-8 h-8 bg-contain bg-no-repeat bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
        ></div>
        <p className="text-center text-lg text-slate-800 group-hover:text-white transition-colors duration-300">
          Sígueme en: <span className="font-bold">{link.name}</span>
        </p>
        <div className="w-8 h-8" /> {/* Spacer to center the text */}
      </div>
    </a>
  );
};
