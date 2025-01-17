import { ShopBanner, ShopPageContent } from "../components";

const Shop = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pt-10">
      <ShopBanner category="Active   products" />
      <ShopPageContent category="all" page={parseInt("1")} />
    </div>
  );
};
export default Shop;
