import { getAxiosInstance } from "./axios-helper";
import { useNavigate } from "react-router-dom";



async function addToOrder(productId: number, productPrice: number) {
  const axiosInstance = getAxiosInstance();

  try {
    const response = await axiosInstance.get(`/orders/open/`).catch((error) => {
      const navigate = useNavigate();
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    });
    let orderId;
    console.log("open order response: ", response?.data);
    console.log("length: ", response?.data.length);
    if (response?.data.id) {
      orderId = response.data.id;
    } else {
      const createResponse = await axiosInstance.post(`/orders/create/`, {
        status: "o",
      });
      orderId = createResponse.data.id;
    }

    console.log("product id: ", productId);
    await axiosInstance.post(`/orders/order-products/`, {
      order: orderId,
      product: productId,
      price: productPrice,
      amount: 1,
      total_price: productPrice,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export { addToOrder };
