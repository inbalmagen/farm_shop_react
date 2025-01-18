import React from "react";
import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";
import { SERVER_URL } from "../common/axios-helper";

const ProductGrid = ({ products }: { products?: Product[] }) => {
  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-12 px-5 max-[400px]:px-3"
    >
      {products &&
        products.map((product: Product) => (
          <ProductItem
            key={nanoid()}
            id={product.id}
            image={`${SERVER_URL}${product.img}`}
            title={product.name}
            category=" "
            price={product.price}
          />
        ))}
    </div>
  );
};
export default React.memo(ProductGrid);
