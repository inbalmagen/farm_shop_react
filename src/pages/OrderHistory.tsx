import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAxiosInstance } from "../common/axios-helper";
import { formatDate } from "../utils/formatDate";

export const loader = async () => {
  try {
    const response = await getAxiosInstance()
      .get("/orders/closed/")
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          const navigate = useNavigate();
          navigate("/login");
        }
      });

    console.log(response?.data || []);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

const OrderHistory = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const orders = useLoaderData() as Order[];

  const navigate = useNavigate();

  useEffect(() => {}, [user, navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8 text-right">היסטורית הזמנות</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">מספר הזמנה</th>
              <th className="py-3 px-4 border-b">תאריך ההזמנה</th>
              {/* <th className="py-3 px-4 border-b">תאריך סגירת הזמנה</th> */}
              <th className="py-3 px-4 border-b">סה"כ</th>
              <th className="py-3 px-4 border-b">סטטוס</th>
              <th className="py-3 px-4 border-b">פרטי ההזמנה</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-3 px-4 border-b text-center">{order.id}</td>
                <td className="py-3 px-4 border-b text-center">
                  {formatDate(order.create_date)}
                </td>
                {/* <td className="py-3 px-4 border-b text-center">
                  {order.close_date
                    ? formatDate(order.close_date ?? "")
                    : "N/A"}
                </td> */}
                <td className="py-3 px-4 border-b text-center">
                ₪{order.total_price}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  {order.status}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <Link
                    to={`/order-history/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    לפרטי ההזמנה
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
