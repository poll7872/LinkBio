import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SocialNetwork } from "../types";

type LinksProps = {
  link: SocialNetwork;
};

export const Links = ({ link }: LinksProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.name
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      style={style}
      className="relative cursor-pointer group block w-full p-4 bg-white rounded-lg border border-slate-200 hover:border-transparent hover:shadow-lg transition-colors duration-300 ease-in-out"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
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
    </li>
  );
};
