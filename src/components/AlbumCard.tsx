import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Album } from "./Albums";

export function AlbumCard(album: Album) {
  const { id, title } = album;
  const queryClient = useQueryClient();

  const { isPending, isError, isSuccess, data } = useQuery({
    queryKey: [`album-photo-${id}`],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`
      );
      return await response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (albumId: number) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          method: "DELETE",
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (album: Album) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...album,
            title: "New title",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  console.log("data", deleteMutation?.data);
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
      <button
        aria-label="delete-album"
        onClick={() => {
          deleteMutation.mutate(id);
        }}
      >
        Delete
      </button>
      <button
        aria-label="update-album"
        onClick={() => {
          updateMutation.mutate(album);
        }}
      >
        Update
      </button>
    </div>
  );
}
