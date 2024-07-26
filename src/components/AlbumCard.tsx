import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Album } from "./Albums";

export function AlbumCard(album: Album) {
  const { id, title } = album;
  const queryClient = useQueryClient();

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

  return (
    <div key={id} className="p-4 bg-slate-200 gap-2 justify-center">
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
