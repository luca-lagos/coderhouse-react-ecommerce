import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);
  const [snackError, setSnackError] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackDeleteItemCart, setDeleteItemCart] = useState(false);
  const AddToCart = (item, quantity, actualLink) => {
    const itemAdded = { ...item, quantity, actualLink };
    const newCart = [...cart];
    const itemInCart = newCart.find((prod) => prod.id == itemAdded.id);

    if (itemInCart) {
      if (itemInCart.quantity + quantity <= itemInCart.stock) {
        itemInCart.quantity += quantity;
        setSnackError(false);
        setSnackSuccess(true);
      } else {
        setSnackSuccess(false);
        setSnackError(true);
      }
    } else {
      newCart.push(itemAdded);
      setSnackError(false);
      setSnackSuccess(true);
    }
    setCart(newCart);
  };

  const QuantityCart = () => {
    return cart.length;
  };

  const CloseAllSnackbar = () => {
    setSnackError(false);
    setSnackSuccess(false);
    setDeleteItemCart(false);
  };

  const GetTotalPrice = () => {
    return Math.round(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  const DeleteItemCart = (item) => {
    const index = cart.findIndex((res) => {
      return res === item;
    });
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setDeleteItemCart(true);
    console.log(cart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        AddToCart,
        QuantityCart,
        GetTotalPrice,
        DeleteItemCart,
        CloseAllSnackbar,
        snackError,
        snackSuccess,
        snackDeleteItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
