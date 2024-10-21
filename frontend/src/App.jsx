import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OutLet } from "./Outlet/OutLet";
import { Home } from "./Pages/Home";
import Signup from "./Pages/Auth";
import MobileHome from "./Pages/Mobile/MobileHome";
import CtypeUSB from "./Pages/Mobile/CtypeUSB";
import Headphone from "./Pages/Mobile/Headphone";
import Charge from "./Pages/Mobile/Charge";
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
      

          </Route>
     
           <Route path="auth" element={<Signup />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
