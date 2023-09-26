import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  if (!data && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data && (
        <div>
          <h1>Product Details</h1>
          <h2>{data.name}</h2>
          <p>Price: ${data.price}</p>
          <p>Description: {data.description}</p>
        </div>
      )}
    </div>
  );
}
