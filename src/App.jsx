import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/home/ItemListContainer";
import "./App.css";
import ItemDetailContainer from "./components/details/ItemDetailContainer";
import CartView from "./components/cart/CartView";
import LoginView from "./components/auth/LoginView";
import RegisterView from "./components/auth/RegisterView";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/:category" element={<ItemListContainer />} />
              <Route
                path="/:category/:link"
                element={<ItemDetailContainer />}
              />
              <Route path="/cart" element={<CartView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;
