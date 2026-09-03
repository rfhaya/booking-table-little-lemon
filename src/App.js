import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AboutUs from "./pages/AboutUs/AboutUs";
import Menus from "./pages/Menu/Menu";
import { CartProvider } from "./context/CartContext";
import Reservations from "./pages/Reservations/Reservations";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/menu" element={<Menus />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/track-order" element={<TrackOrder />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
