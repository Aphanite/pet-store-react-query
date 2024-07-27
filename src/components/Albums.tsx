import { useQuery } from "@tanstack/react-query";
import { AlbumCard } from "./AlbumCard";

export type Album = {
  id: number;
  title: string;
  userId: number;
};

export function Albums() {
  const result = useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/albums");
      return await response.json();
    },
  });
  const { isPending, isError, data, error } = result;
  console.log("data", data);

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p>Oh, no! {error.message}</p>;

  return (
    <div>
      <h1>Albums</h1>
      <div className="flex flex-wrap gap-2 my-4 justify-evenly">
        {data
          .filter((album: Album) => {
            return album.title.includes("omnis");
          })
          .map((album: Album) => {
            return <AlbumCard key={album.id} {...album} />;
          })}
      </div>
    </div>
  );
}
