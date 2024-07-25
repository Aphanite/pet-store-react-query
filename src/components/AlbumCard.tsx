import { useQuery } from "@tanstack/react-query";
import { Album } from "./Albums";

export function AlbumCard({ id, title }: Album) {
  const { isPending, isError, isSuccess, data } = useQuery({
    queryKey: [`album-photo-${id}`],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`
      );
      return await response.json();
    },
  });

  console.log("data", data);
  const firstImage = data?.[0];

  return (
    <div key={id} className="p-4 bg-slate-200 gap-2 justify-center">
      {isPending && <p>Loading image...</p>}
      {isError && <p>Couldn't load image</p>}
      {isSuccess && (
        <img
          src={firstImage.url}
          alt="album"
          width="50"
          height="50"
          className="mx-auto"
        />
      )}
      <h3 className="uppercase font-bold">{title}</h3>
    </div>
  );
}
