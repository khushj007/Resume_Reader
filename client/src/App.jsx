import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/Landingpage/Landingpage";
import Homepage from "./pages/Homepage/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landingpage />}></Route>
        <Route path={"/homepage"} element={<Homepage />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
