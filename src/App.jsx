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
import { ItemProvider } from "./context/ItemContext";
import OrderContainer from "./components/user/order/OrderContainer";
import Order from "./components/user/order/Order";
import OrderFinished from "./components/user/order/OrderFinished";
import ProfileView from "./components/user/profile/ProfileView";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ItemProvider>
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
                <Route path="/my-orders" element={<OrderContainer />} />
                <Route path="/my-orders/:id" element={<Order />} />
                <Route path="/order-finished" element={<OrderFinished />} />
                <Route path="/my-profile" element={<ProfileView />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ItemProvider>
      </AuthProvider>
    </>
  );
};

export default App;
