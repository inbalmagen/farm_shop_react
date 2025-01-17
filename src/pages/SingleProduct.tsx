import { Button } from "../components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAxiosInstance } from "../common/axios-helper";
import { SERVER_URL } from "../common/axios-helper";
import { addToOrder } from "../common/add-to-order";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await getAxiosInstance()(`/products/${params.id}`).catch((error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }
      });
      const data = await response?.data;
      console.log(data);

      setSingleProduct(data);
    };

    fetchSingleProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    addToOrder(Number(singleProduct?.id ?? 0), singleProduct?.price ?? 0);
    toast.success("Product added to the cart");

  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={`${SERVER_URL}/${singleProduct?.img}`}
            alt={singleProduct?.name}
            className="full-size-image"
          />
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">{singleProduct?.name}</h1>

            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">
              </p>
              <p className="text-base font-bold">₪{singleProduct?.price}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
          </div>
          <div className="flex flex-col gap-3">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
            <p className="text-secondaryBrown text-sm text-right">
              Delivery estimated one day after closing the order.
            </p>
          </div>
          <div>
            <section>
              <h2>Description</h2>
              <p>{singleProduct?.description}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
