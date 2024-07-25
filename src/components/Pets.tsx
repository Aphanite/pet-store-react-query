import { useQuery } from "@tanstack/react-query";

export function Pets() {
  const result = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await fetch(
        `https://petstore.swagger.io/v2/pet/findByStatus?status=sad`
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
      <h1>Available pets!</h1>
      <div className="flex wrap gap-2">
        {data.slice(0, 20).map(({ id, name }: any, index: number) => {
          return (
            <div key={`${id}-${index}`}>
              <h3>{name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
