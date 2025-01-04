import { redirect } from "react-router-dom";
import { getAxiosInstance } from "../common/axios-helper";

interface SearchActionRequest {
  request: {
    formData: () => Promise<FormData>;
  };
}

interface CheckoutFormAction {
  request: {
    formData: () => Promise<FormData>;
  };
}

export const searchAction = async ({ request }: SearchActionRequest) => {
  // getting form data
  const formData = await request.formData();
  // converting form data to object for easy access
  const data = Object.fromEntries(formData);

  return redirect(`/search?query=${data?.searchInput || ""}`);
};

export const checkoutAction = async ({ request }: CheckoutFormAction) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await getAxiosInstance().post("/orders", data);
  return redirect("/");
};
