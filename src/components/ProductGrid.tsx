import React from "react";
import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";
import { SERVER_URL } from "../common/axios-helper";

const ProductGrid = ({ products }: { products?: Product[] }) => {
  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 max-xl:justify-start max-xl:gap-5 px-5 max-[400px]:px-3"
    >
      {products &&
        products.map((product: Product) => (
          <ProductItem
            key={nanoid()}
            id={product.id}
            image={`${SERVER_URL}/${product.img}`}
            title={product.name}
            category="luxury"
            price={product.price}
          />
        ))}
    </div>
  );
};
export default React.memo(ProductGrid);
