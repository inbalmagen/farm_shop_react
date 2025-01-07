import {
  LoaderFunctionArgs,
  // useLoaderData,
  // useSearchParams,
} from "react-router-dom";
import { ShopBanner, ShopPageContent } from "../components";

export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const category = "all";

  return category;
};

const Shop = () => {
  // const category = useLoaderData() as string;
  // const [searchParams] = useSearchParams();
  return (
    <div className="max-w-screen-2xl mx-auto pt-10">
      <ShopBanner category="Active   products" />
      <ShopPageContent category="all" page={parseInt("1")} />
    </div>
  );
};
export default Shop;
