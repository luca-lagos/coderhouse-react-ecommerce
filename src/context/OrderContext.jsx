import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { createContext } from "react";
import { database } from "../data/Firebase";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const getOrdersByUserId = async (uid) => {
    const q = query(collection(database, "/Order"), where("userId", "==", uid));
    return await getDocs(q);
  };

  const getOrderById = async (id) => {
    return await getDoc(doc(database, "/Order", id));
  };
  return (
    <OrderContext.Provider value={{ getOrdersByUserId, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};
