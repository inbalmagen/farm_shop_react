// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import {
  LoaderFunctionArgs,
  useLoaderData,
  // useNavigate,
} from "react-router-dom";
import { getAxiosInstance } from "../common/axios-helper";
import { nanoid } from "nanoid";
import { formatDate } from "../utils/formatDate";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const response = await getAxiosInstance()(`orders/${id}`);
  console.log(response.data || []);
  return response.data;
};

const SingleOrderHistory = () => {
  // const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  // const navigate = useNavigate();
  const singleOrder = useLoaderData() as OrderSingle;

  // useEffect(() => {
  //   if (!user?.id) {
  //     toast.error("Please login to view this page");
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>
      <div className="bg-white border border-gray-200 p-5 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Order ID: {singleOrder.id}
        </h2>
        <p className="mb-2">Create Date: {formatDate(singleOrder.create_date)}</p>
        <p className="mb-2">Close Date: {singleOrder.close_date ? formatDate(singleOrder.close_date ?? "") : "N/A"}</p>
        <p className="mb-2">Subtotal: ${singleOrder.total_price}</p>
       
        <p className="mb-2">
          Total: $
          {singleOrder.total_price}
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-4">Items</h3>
        <table className="singleOrder-table min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Product Name</th>          
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {singleOrder.order_products.map((product) => (
              <tr key={nanoid()}>
                <td className="py-3 px-4 border-b">{product?.product.name}</td>
                <td className="py-3 px-4 border-b text-center">
                  {product?.amount}
                </td>
                <td className="py-3 px-4 border-b text-right">
                  ${product?.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleOrderHistory;
