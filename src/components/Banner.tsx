import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner w-full flex flex-col justify-end items-center max-sm:h-[550px] max-sm:gap-2">
      <h2 className="text-white text-center text-7xl font-bold tracking-[1.86px] leading-[60px] max-sm:text-5xl max-[400px]:text-4xl">
        <Link
                    to="/"
                    className="text-5xl font-bold tracking-wide max-sm:text-4xl max-[400px]:text-3xl"
                  >
        משק חקלאי - מוסד חינוכי באלוני יצחק <br />
        </Link>
      </h2>
      <h3 className="text-white text-3xl font-normal leading-[72px] tracking-[0.9px] max-sm:text-xl max-[400px]:text-lg">
        <br/>
      </h3>
    </div>
  );
};
export default Banner;
