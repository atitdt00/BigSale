import {  useEffect, useState } from "react";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL;

function PCard() {
  const { loggedIn, user } = useAuth();

  const { setPaymentData, addToCart, setOpenMethodForm, setOpenLogin } =
    useCartContext();

  let [products, setProducts] = useState([]);

  const getProducts = async() => {
    try {
      const product = await axios.get(`${API}/api/products/`);
      setProducts(product.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const BuyHandle = (item) => {
    if (!loggedIn) {
      setOpenLogin(true);
      return;
    }

    //AuthContext user validation

    setPaymentData({
      productName: item.Title,
      amount: item.Price,
      email: user.email,
    });
    setOpenMethodForm(true);
  };

  const addToCartHandle = (item) => {
    if (!loggedIn) {
      setOpenLogin(true);
      return;
    }
    addToCart(item);
  };

  useEffect(() => {
    getProducts();
  });
  return (
    <div className="W-full min-h-fit">
      <div>
        <h1 className="text-center font-medium text-3xl">Latest Products</h1>
      </div>
      <div className="w-full min-h-150 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 md:p-10 max-md:place-items-center justify-start">
        {products.map((item) => (
          <div
            key={item._id}
            className="w-full h-fit max-w-xs overflow-hidden rounded-lg border border-slate-500 bg-gray-600/70 shadow-lg shadow-slate-950/5"
          >
            <img
              className="m-1.5 h-max w-[calc(100%-12px)] rounded-[5px] object-cover"
              src={item.Image}
              alt={item.Title}
            />
            <div className="h-max w-full rounded px-3 py-2">
              <h6 className="font-sans text-base font-bold text-current antialiased md:text-lg lg:text-xl">
                {item.Title}
              </h6>
              <p className="my-1 w-full font-sans text-base text-gray-300 antialiased">
                {item.Price}
              </p>
            </div>
            <div className="w-full  rounded px-3 pb-3 pt-1.5 flex flex-wrap gap-2">
              <button
                onClick={() => addToCartHandle(item)}
                className="inline-flex rounded-md border border-slate-800 bg-slate-800 px-4 py-2 text-center font-sans text-sm font-medium text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                Add To Cart
              </button>
              <button
                onClick={() => {
                  BuyHandle(item);
                }}
                className="inline-flex rounded-md border border-slate-800 bg-slate-800 px-4 py-2 text-center font-sans text-sm font-medium text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PCard;
