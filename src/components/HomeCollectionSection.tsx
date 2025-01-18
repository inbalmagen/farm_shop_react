import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <div>
      <div className="max-w-screen-2xl flex items-center justify-center mx-auto mt-24 px-5 max-[400px]:px-3">
      <h2 className="text-black text-6xl font-bold tracking-wide max-sm:text-5xl">
          מוצרי השבוע
        </h2>
      </div>
      <ProductGridWrapper limit={20}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
