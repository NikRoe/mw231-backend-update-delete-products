import ProductList from "../components/ProductList";
import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import useSWRMutation from "swr/mutation";

const Heading = styled.h1`
  text-align: center;
  color: var(--color-nemo);
`;

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
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

export default function HomePage() {
  const { trigger } = useSWRMutation("/api/products", sendRequest);

  async function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    trigger(productData);
  }
  return (
    <>
      <Heading>
        <span role="img" aria-label="A fish">
          🐠
        </span>
        Fish Shop
      </Heading>
      <ProductForm onSubmit={handleAddProduct} />
      <hr />
      <ProductList />
    </>
  );
}
