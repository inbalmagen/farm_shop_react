import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAxiosInstance } from "../common/axios-helper";
import { nanoid } from "nanoid";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const response = await getAxiosInstance()(`orders/${id}`).catch((error) => {
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
  });
  console.log(response?.data || []);
  return response?.data;
};

const SingleOrderHistory = () => {
  const singleOrder = useLoaderData() as OrderSingle;

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8 text-right">פרטי ההזמנה</h1>
      <div className="bg-white border border-gray-200 p-5 overflow-x-auto text-right">
        <h2 className="text-2xl font-semibold mb-4 text-right">
          מספר הזמנה {singleOrder.id}
        </h2>
        <p className="mb-2 text-right">
          תאריך ההזמנה {formatDate(singleOrder.create_date)}
        </p>
        <p className="mb-2 text-right">סה"כ ₪{singleOrder.total_price}</p>
        {/* <h3 className="text-xl font-semibold mt-6 mb-4">Items</h3> */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-center">מחיר</th>
              <th className="py-3 px-4 border-b text-center">כמות</th>
              <th className="py-3 px-4 border-b text-center"> מוצר</th>
            </tr>
          </thead>
          <tbody>
            {singleOrder.order_products.map((product) => (
              <tr key={nanoid()}>
                <td className="py-3 px-4 border-b text-center">
                  ₪{product?.price}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  {product?.amount}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  {product?.product.name}
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
