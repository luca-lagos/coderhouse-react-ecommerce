import { collection, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { database } from "../data/Firebase";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const getAllCategories = async () => {
    return await getDocs(collection(database, "/Category"));
  };

  const getAllItems = async () => {
    return await getDocs(collection(database, "/Item"));
  };

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((res) => {
      const categories = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setCategories(categories);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    getAllItems().then((res) => {
      const items = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setItems(items);
      setLoading(false);
    });
  }, []);
  return (
    <ItemContext.Provider value={{ categories, items, loading }}>
      {children}
    </ItemContext.Provider>
  );
};
