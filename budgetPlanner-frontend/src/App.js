
import {Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Table_incomes from "./pages/Table_incomes";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Table_expenses from "./pages/Table_expenses";
import { Header } from "antd/lib/layout/layout";
import Sidenav from "./components/layout/Sidenav";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route  path="/" element={<Main/>} />
          <Route  path="/santrauka" element={<Main/>} />
          <Route  path="/pajamos" element={<Table_incomes/>} />
          <Route  path="/islaidos" element={<Table_expenses/>} />
          <Route  path="/billing" element={<Billing/>} />
          <Route   path="/rtl" element={<Rtl/>} />
          <Route   path="/profile" element={<Profile/>} />
          <Route  exact path="/sign-up" element={<SignUp/>} />
        <Route  path="/sign-in" element={<SignIn/>} />
          <Route path="/" element={<Navigate replace to="/santrauka" />} />
          {/* <Navigate from="/*" to="/suvestinė" /> */}
      </Routes>
    </div>
  );
}

export default App;
