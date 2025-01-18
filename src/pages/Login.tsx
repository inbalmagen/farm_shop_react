import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import { getAxiosInstance } from "../common/axios-helper";
import toast from "react-hot-toast";
import { useEffect } from "react";
// import { setLoginStatus } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkLoginFormData(data)) return;

    try {
      // Login request
      const loginResponse = await getAxiosInstance().post(`/login/`, {
        username: data.email,
        password: data.password,
      });

      // Store access token and role in localStorage
      const token = loginResponse.data.access;
      const isStaff = loginResponse.data.is_staff;
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_role", isStaff ? "manager" : "customer");
      // store.dispatch(setLoginStatus(true));

      // Redirect based on role
      toast.success("You logged in successfully");
      if (isStaff) {
        navigate("/");
        // window.location.href = "admin_products.html";
      } else {
        navigate("/");
        // window.location.href = "customer_products.html";
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("בבקשה הכנס שם פרטי, שם משפחה ומספר תעודת זהות");
    }

  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in");
      navigate("/user-profile");
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
        ברוך הבא למשק אלוני יצחק 
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="name">שם פרטי ומשפחה </label> */}
            <input
              type="string"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="שם פרטי ושם משפחה"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="name">מספר תעודת זהות</label> */}
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder="מספר תעודת זהות"
              name="password"
            />
          </div>
        </div>
        <Button type="submit" text="כניסה למשק" mode="brown" />
        <Link
          to="/register"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          {/* Don’t have an account?{" "}
          <span className="text-secondaryBrown">Register now</span>. */}
        </Link>
      </form>
    </div>
  );
};
export default Login;
