import Product from "../components/product";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

async function updateProduct(url, { arg }) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await response.json();
  } else {
    console.error(`Error: ${response.status}`);
  }
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );

  function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedProduct = Object.fromEntries(formData);

    trigger(updatedProduct);

    push("/");
  }

  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  return (
    <>
      <Product onSubmit={handleEditProduct} />
    </>
  );
}
