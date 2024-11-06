import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OutLet } from "./Outlet/OutLet";
import { Home } from "./Pages/Home";
import Signup from "./Pages/Auth";
import MobileHome from "./Pages/Mobile/MobileHome";
import CtypeUSB from "./Pages/Mobile/CtypeUSB";
import Headphone from "./Pages/Mobile/Headphone";
import Charge from "./Pages/Mobile/Charge";
import CardView from "./Pages/CardView";
import Cart from "./Pages/Cart";
import { PlaceOrder } from "./Pages/PlaceOrder";
import { WishView } from "./Pages/WishView";
import { SuccessPayment } from "./Pages/SuccessPayment";
import { CancelPayment } from "./Pages/CancelPayment";
import { OrderDetails } from "./Pages/OrderDetails";
import { SearchProduct } from "./Components/SearchProduct";
// import { MobileHome } from "./Pages/Mobile/MobileHome";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutLet />}>
            <Route index element={<Home />} />
 
            <Route path="Moblie" element={<MobileHome />} />
            <Route path="cable" element={<CtypeUSB />} />
            <Route path="Headphone" element={<Headphone />} />
            <Route path="charge" element={<Charge />} />
      
            <Route path="view" element={<CardView />} />
            <Route path="cart" element={<Cart />} />
            <Route path="WishView" element={<WishView />} />

            <Route path="PlaceOrder" element={<PlaceOrder />} />
            <Route path="OrderDetails" element={<OrderDetails />} />
            <Route path="SuccessPayment" element={<SuccessPayment />} />
            <Route path="CancelPayment" element={<CancelPayment />} />

            <Route path="/search/:term" element={<SearchProduct />} />
            
          </Route>
     
           <Route path="auth" element={<Signup />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
