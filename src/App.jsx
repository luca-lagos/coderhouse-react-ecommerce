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
import { OrderProvider } from "./context/OrderContext";
import OrderContainer from "./components/user/order/OrderContainer";
import OrderDetail from "./components/user/order/OrderDetail";
import OrderFinished from "./components/user/order/OrderFinished";
import ProfileView from "./components/user/profile/ProfileView";
import ResetPasswordView from "./components/auth/ResetPasswordView";
import UpdateProfile from "./components/user/profile/UpdateProfile";
import UpdatePassword from "./components/user/profile/UpdatePassword";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ItemProvider>
          <CartProvider>
            <OrderProvider>
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
                  <Route
                    path="/forgot-password"
                    element={<ResetPasswordView />}
                  />
                  <Route path="/my-orders" element={<OrderContainer />} />
                  <Route path="/my-orders/:id" element={<OrderDetail />} />
                  <Route path="/order-finished" element={<OrderFinished />} />
                  <Route path="/my-profile" element={<ProfileView />} />
                  <Route path="/update-profile" element={<UpdateProfile />} />
                  <Route path="/update-password" element={<UpdatePassword />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ItemProvider>
      </AuthProvider>
    </>
  );
};

export default App;
