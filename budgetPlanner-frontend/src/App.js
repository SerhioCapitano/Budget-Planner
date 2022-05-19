
import {Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect} from 'react';
import Home from "./pages/Home";
import Table_incomes from "./pages/Table_incomes";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import 'antd/dist/antd.min.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Table_expenses from "./pages/Table_expenses";
import { Header } from "antd/lib/layout/layout";
import UsersTable from "./pages/UsersTable";
import CategoriesTable from "./pages/CategoriesTable";

function readUser() {
  return JSON.parse(localStorage.getItem('user'));
}


const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.accessToken) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};


const AuthAdminRoute = ({children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user.username !== "admin") {
    return <Navigate to="/" replace/>
  }
  return children;
} 






function App() {
  return (  
    <div className="App">
    <Routes>
<Route  path="/" element={<AuthRoute><Main>Pradinis puslapis</Main></AuthRoute>} />
    <Route  path="/santrauka" element={<AuthRoute><Main><Rtl/></Main></AuthRoute>} />
    <Route  path="/pajamos" element={<AuthRoute><Main><Table_incomes/></Main></AuthRoute>} />
    <Route  path="/islaidos" element={<AuthRoute><Main><Table_expenses/></Main></AuthRoute>} />
    <Route  path="/billing" element={<AuthRoute><Billing/></AuthRoute>} />
    <Route   path="/rtl" element={<AuthRoute><Rtl/></AuthRoute>} />
    <Route   path="/profile" element={<AuthRoute><Main><Profile/></Main></AuthRoute>} />
    <Route  path="/vartotojai" element={<AuthRoute><AuthAdminRoute><Main><UsersTable/></Main></AuthAdminRoute></AuthRoute>} />
    <Route path="/kategorijas" element={<AuthRoute><AuthAdminRoute><Main><CategoriesTable/></Main></AuthAdminRoute></AuthRoute>} />
    <Route  exact path="/sign-up" element={<SignUp/>} />
  <Route  path="/sign-in" element={<SignIn/>} />

  <Route  path="*" element={<Navigate to="/" replace/>} />
    {/* <Navigate from="/*" to="/suvestinė" /> */}
 
</Routes>
    </div>
  );
}

export default App;
