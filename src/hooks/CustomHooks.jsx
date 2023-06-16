import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ItemContext } from "../context/ItemContext";
import { OrderContext } from "../context/OrderContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth Provider available");
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("There is no Cart Provider available");
  return context;
};

export const useItem = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("There is no Item Provider available");
  return context;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("There is no Order Provider available");
  return context;
}
