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
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      return await response.json();
    },
  });
  console.log("result", result);
  const { isPending, isError, data, error } = result;
  console.log("data", data);

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p>Oh, no! {error.message}</p>;

  return (
    <div>
      <h1>Albums</h1>
      <div className="flex flex-wrap gap-2 my-4 justify-evenly">
        {data.map((album: Album) => {
          return <AlbumCard {...album} />;
        })}
      </div>
    </div>
  );
}
