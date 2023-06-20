import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { database } from "../data/Firebase";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const getAllCategories = async () => {
    return await getDocs(collection(database, "/Category"));
  };

  const getAllItems = async () => {
    const q = query(collection(database, "/Item"), where("stock", ">", 0));
    return await getDocs(q);
  };

  const getItemByKey = async (key) => {
    const q = query(
      collection(database, "/Item"),
      where("key", "==", key)
    );
    return await getDocs(q);
  };

  useEffect(() => {
    getAllCategories().then((res) => {
      const categories = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getAllItems().then((res) => {
      const items = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setItems(items);
    });
  }, []);
  return (
    <ItemContext.Provider value={{ categories, items, getItemByKey }}>
      {children}
    </ItemContext.Provider>
  );
};
