import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import Button from "../components/Button";
import { addToOrder } from "../common/add-to-order";
import toast from "react-hot-toast";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
}) => {
  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    addToOrder(Number(id ?? 0), price ?? 0);
    console.log(`Product ${id} added to cart`);
    toast.success("Product added to the cart");
    // Here you can add the logic to add the product to the cart
    // For example, you might want to update the state or call a context method
  }

  return (
    <div className="w-[400px] flex flex-col gap-2 justify-center max-md:w-[300px]">
      <Link
        to={`/product/${id}`}
        className="w-full h-[300px] max-md:h-[200px] overflow-hidden"
      >
        <img src={image} alt={title} />
      </Link>
      <Link
        to={`/product/${id}`}
        className="text-black text-center text-3xl tracking-[1.02px] max-md:text-2xl"
      >
        <h2>{title}</h2>
      </Link>
      <p className="text-secondaryBrown text-lg tracking-wide text-center max-md:text-base">
        {formatCategoryName(category)}{" "}
      </p>
      <p className="text-black text-2xl text-center font-bold max-md:text-xl">
        ${price}
      </p>
      <div className="w-full flex flex-col gap-1">
        <Link
          to={`/product/${id}`}
          className="text-white bg-gray-400 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          View product
        </Link>
        {/* <Link
          to={`/product/${id}`}
          className="bg-white text-black text-center text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          Learn more
        </Link> */}
        {/* <Link
          to={`/product/update/${id}`}
          className="bg-white text-black text-center text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
        >
          Update Product
        </Link>         */}
      </div>
      <div className="flex flex-col gap-3">
        <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
        <p className="text-secondaryBrown text-sm text-right"></p>
      </div>
    </div>
  );
};
export default ProductItem;
