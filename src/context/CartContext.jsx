import {
  Timestamp,
  doc,
  addDoc,
  getDoc,
  writeBatch,
  collection,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { database } from "../data/Firebase";

export const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);
  const [snackError, setSnackError] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackDeleteItemCart, setDeleteItemCart] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderId, setOrderId] = useState("");

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
    setOrderError(false);
    setOrderSuccess(false);
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
  };

  const ClearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const CreateOrder = async (uid, totalPrice) => {
    const batch = writeBatch(database);
    const order = {
      userId: uid,
      items: cart,
      totalPrice: totalPrice,
      state: 'generated',
      date: Timestamp.fromDate(new Date()),
    };
    setOrderLoading(true);
    for (let item of order.items) {
      const docSnap = await getDoc(doc(database, "/Item", item.id));
      const { stock } = docSnap.data();
      const stockToUpdate = stock - item.quantity;
      if (stockToUpdate < 0) {
        setOrderLoading(false);
        setOrderError(true);
        setOrderMessage(`No hay stock suficiente del producto: ${item.name}`);
      } else {
        setOrderLoading(false);
        setOrderError(false);
        batch.update(doc(database, "/Item", item.id), { stock: stockToUpdate });
        batch.commit();
        await addDoc(collection(database, "/Order"), order)
          .then((res) => {
            setOrderLoading(false);
            setOrderSuccess(true);
            setOrderError(false);
            setOrderId(res.id);
            ClearCart();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
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
        CreateOrder,
        CloseAllSnackbar,
        orderLoading,
        orderError,
        orderSuccess,
        orderMessage,
        orderId,
        snackError,
        snackSuccess,
        snackDeleteItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
