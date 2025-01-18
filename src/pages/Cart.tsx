import {
  // HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAxiosInstance, SERVER_URL } from "../common/axios-helper";
import { addToOrder } from "../common/add-to-order";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const navigate = useNavigate();
  const fetchOpenOrders = async () => {
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance
        .get("/orders/open/")
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
      console.log(response?.data);
      setProductsInCart(response?.data.id ? response?.data.order_products : []);
      setSubtotal(response?.data.total_price ?? 0);
    } catch (error) {
      console.error("Error fetching open orders:", error);
    }
  };

  useEffect(() => {
    fetchOpenOrders();
  }, []);

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
      <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl text-center">
          הזמנה לשבוע זה
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`${SERVER_URL}${product?.product?.img}`}
                      alt={product.name}
                      className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              to={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                        ₪{product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor="quantity mr-5">כמות ממוצר זה </label>
                        <input
                          type="number"
                          id="quantity"
                          className="w-16 h-7 indent-1 bg-white border"
                          value={product?.amount}
                          onChange={async (e) => {
                            console.log(e.target.value);
                            console.log("product", product);
                            await addToOrder(
                              Number(product.product?.id),
                              parseFloat(product?.price)
                            );
                            await fetchOpenOrders();
                          }}
                        />

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={async () => {
                              await getAxiosInstance()
                                .delete(
                                  `/orders/order-products/${product?.id}/`
                                )
                                .catch((error) => {
                                  if (
                                    error.response &&
                                    error.response.status === 401
                                  ) {
                                    navigate("/login");
                                  }
                                });
                              await fetchOpenOrders();
                              toast.error("Product removed from the cart");
                            }}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product?.stock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <XMarkIcon
                          className="h-5 w-5 flex-shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product?.stock ? "In stock" : `Out of stock`}
                      </span>
                    </p> */}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              סיכום הזמנה
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">סה"כ</dt>
                <dd className="text-sm font-medium text-gray-900">
                ₪{subtotal}
                </dd>
              </div>
            </dl>

            {productsInCart.length > 0 && (
              <div className="mt-6">
                <Link
                  to="/"
                  className="text-white bg-gray-500 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center max-md:text-base"
                >
                  המשך קניה
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};
export default Cart;
