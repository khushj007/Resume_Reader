import "./App.css";
import Homepage from "./pages/Homepage/Homepage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Homepage />
      <ToastContainer />
    </>
  );
}

export default App;
