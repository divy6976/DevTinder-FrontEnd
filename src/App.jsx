import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import BodyContainer from "./BodyContainer";
import Login from "./login";
import Test from "./Test";


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<BodyContainer/>}>
          <Route path="login" element={<Login />} /> {/* ✅ No slash here */}
            <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
