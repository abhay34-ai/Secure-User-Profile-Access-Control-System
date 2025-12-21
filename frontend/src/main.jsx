import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Authcontext from "./context/Authcontext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Authcontext>
      <App />
    </Authcontext>
  </BrowserRouter>
);
