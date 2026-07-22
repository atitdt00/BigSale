import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let [cart, setCart] = useState([]);

  let [openMethodForm, setOpenMethodForm] = useState(false);
  let [openRegister, setOpenRegister] = useState(false);
  let [openLogin, setOpenLogin] = useState(false);
  let [forgotForm, setForgotForm]= useState(false)
  let [progress, setProgress]= useState(0);

  
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    email: "",
    ProductName: "",
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const descreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        openMethodForm,
        setOpenMethodForm,
        openLogin,
        setOpenLogin,
        openRegister,
        setOpenRegister,
        paymentData,
        setPaymentData,
        forgotForm,
        setForgotForm,
        setCart,
        cart,
        progress,
        setProgress,
        addToCart,
        removeFromCart, 
        increaseQuantity,
        descreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
