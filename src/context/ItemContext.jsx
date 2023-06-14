import { createContext } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  return <ItemContext.Provider>{children}</ItemContext.Provider>;
};
