import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OutLet } from "./Outlet/OutLet";
import { Home } from "./Pages/Home";
import Signup from "./Pages/Auth";
import MobileHome from "./Pages/Mobile/MobileHome";
// import { MobileHome } from "./Pages/Mobile/MobileHome";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutLet />}>
            <Route index element={<Home />} />
 
            <Route path="Moblie" element={<MobileHome />} />
      

          </Route>
     
           <Route path="auth" element={<Signup />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
