import { useQuery } from "@tanstack/react-query";

export function Pets() {
  const result = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await fetch(
        `https://petstore.swagger.io/v2/pet/findByStatus?status=happy`
      );
      return await response.json();
    },
  });
  console.log("result", result);
  const { isPending, isSuccess, isError, data, error } = result;
  console.log("data", data);

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong...</p>;

  return (
    <div>
      <h1>Available pets!</h1>
      {data.slice(0, 20).map(({ id, name }: any) => {
        return (
          <div key={id}>
            <h3>{name}</h3>
          </div>
        );
      })}
    </div>
  );
}
