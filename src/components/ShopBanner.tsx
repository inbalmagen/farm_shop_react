import { formatCategoryName } from "../utils/formatCategoryName";

const ShopBanner = ({ category }: { category: string }) => {
  return (
    <div className="bg-gray-500 text-white py-10 flex justify-center items-center mx-5 my-10">
      <h2 className="text-3xl max-sm:text-2xl">
        {category ? formatCategoryName(category) : "Product List"}
      </h2>
    </div>
  );
};
export default ShopBanner;
