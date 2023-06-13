import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

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
