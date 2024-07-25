import { Album } from "./Albums";

export function AlbumCard({ id, title }: Album) {
  return (
    <div key={id} className="p-4 bg-slate-200 flex">
      <img src="" alt="" />
      <h3>{title}</h3>
    </div>
  );
}
