import Frontend from "../Layouts/Frontend";
import { useCartContext } from "../context/CartContext";

function CartContainer() {
  const { cart, setPaymentData, setOpenMethodForm, removeFromCart, descreaseQuantity, increaseQuantity } = useCartContext();

  const buyNowHandler = (item) => {
    const email = sessionStorage.getItem("email");
    setPaymentData({
      productName: item.Title,
      amount: item.Price * item.quantity,
      email,
    });

    setOpenMethodForm(true);
  };

  return (
    <Frontend>
      <div className="text-white max-w-full min-h-120 mt-5">
        <h1 className="text-2xl font-bold mb-5">CART</h1>

        <main className="w-full h-auto">
          {cart.length === 0 ? (
            <div className="w-full min-h-120 flex justify-center items-center ">
              <p className="font-bold tracking-widest text-2xl ">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="w-full h-auto grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 mb-4 shadow"
                >
                  <h2 className="font-bold text-lg">{item.Title}</h2>

                  <p>Price: Rs. {item.Price}</p>

                  <p>Description: {item.Description}</p>

                  <div className="flex items-center gap-3 my-3">
                    <button className="px-3 py-1 bg-red-500 rounded" onClick={()=>descreaseQuantity(item._id)}>-</button>
                    <span>Quantity: {item.quantity}</span>
                    <button className="px-3 py-1 bg-green-500 rounded" onClick={()=>increaseQuantity(item._id)}>+</button>
                    </div>

                  <p>Total: Rs. {item.Price * item.quantity}</p>
                  <button
                    onClick={() => buyNowHandler(item)}
                    className="bg-slate-800 px-3 py-2 rounded transition-all duration-200 ease-in-out hover:outline-2 outline-offset-2"
                  >
                    Buy Now
                  </button>
                  <button onClick={()=>removeFromCart(item._id)} className="bg-red-600 px-3 py-2 rounded ml-2">Remove</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Frontend>
  );
}

export default CartContainer;
