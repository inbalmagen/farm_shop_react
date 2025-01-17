import { HiOutlineUser } from "react-icons/hi2";
import { HiMiniBookOpen } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

const   Header = () => {
  return (
    <>
    <header className="max-w-screen-2xl flex text-center justify-between items-center py-4 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3">
      <Link
        to="/"
        className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
      >
        FARM SHOP
      </Link>
      <div className="flex gap-4 items-center max-sm:gap-2">
        <Link to="/order-history">
          <HiMiniBookOpen className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/login">
          <HiOutlineUser className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/cart">
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
    </header>
    </>
  );
};
export default Header;
