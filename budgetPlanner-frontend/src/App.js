
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


function doSome() {
  var data  = null;
  if(readUser() == null  ) {
    data  =  
    <Routes>
    <Route  exact path="/sign-up" element={<SignUp/>} />
    <Route  path="*" element={<Navigate to="/sign-up" replace/>} />
    <Route  path="/sign-in" element={<SignIn/>} />
    </Routes> 
  } else if(readUser().username == "admin") {
    data  = 
    <Routes>
<Route  path="/" element={<Main>Pradinis puslapis</Main>} />
    <Route  path="/santrauka" element={<Main>Komponentas santrauka</Main>} />
    <Route  path="/pajamos" element={<Main><Table_incomes/></Main>} />
    <Route  path="/islaidos" element={<Main><Table_expenses/></Main>} />
    <Route  path="/billing" element={<Billing/>} />
    <Route   path="/rtl" element={<Rtl/>} />
    <Route   path="/profile" element={<Main><Profile/></Main>} />
    <Route  path="/vartotojai" element={<Main><UsersTable/></Main>} />
    <Route path="/kategorijas" element={<Main><CategoriesTable/></Main>} />
    <Route  exact path="/sign-up" element={<SignUp/>} />
  <Route  path="/sign-in" element={<SignIn/>} />

  <Route  path="*" element={<Navigate to="/" replace/>} />
    {/* <Navigate from="/*" to="/suvestinė" /> */}
 
</Routes>
  } else {
    data  = 
    <Routes>
<Route  path="/" element={<Main>Pradinis puslapis</Main>} />
    <Route  path="/santrauka" element={<Main>Komponentas santrauka</Main>} />
    <Route  path="/pajamos" element={<Main><Table_incomes/></Main>} />
    <Route  path="/islaidos" element={<Main><Table_expenses/></Main>} />
    <Route  path="/billing" element={<Billing/>} />
    <Route   path="/rtl" element={<Rtl/>} />
    <Route   path="/profile" element={<Main><Profile/></Main>} />
    <Route  exact path="/sign-up" element={<SignUp/>} />
  <Route  path="/sign-in" element={<SignIn/>} />

  <Route  path="*" element={<Navigate to="/" replace/>} />
    {/* <Navigate from="/*" to="/suvestinė" /> */}
 
</Routes> 
  }
  return data ;
}






// let pathForUsers = readUser() === null ?
// <Routes>
// <Route  exact path="/sign-up" element={<SignUp/>} />
// <Route  path="*" element={<Navigate to="/sign-up" replace/>} />
// <Route  path="/sign-in" element={<SignIn/>} />
// </Routes>

// : readUser().username == "admin" ?
// <Routes>
// <Route  path="/" element={<Main>Pradinis puslapis</Main>} />
//     <Route  path="/santrauka" element={<Main>Komponentas santrauka</Main>} />
//     <Route  path="/pajamos" element={<Main><Table_incomes/></Main>} />
//     <Route  path="/islaidos" element={<Main><Table_expenses/></Main>} />
//     <Route  path="/billing" element={<Billing/>} />
//     <Route   path="/rtl" element={<Rtl/>} />
//     <Route   path="/profile" element={<Main><Profile/></Main>} />
//     <Route  path="/vartotojai" element={<Main><UsersTable/></Main>} />
//     <Route path="/kategorijas" element={<Main><CategoriesTable/></Main>} />
//     <Route  exact path="/sign-up" element={<SignUp/>} />
//   <Route  path="/sign-in" element={<SignIn/>} />

//   <Route  path="*" element={<Navigate to="/" replace/>} />
//     {/* <Navigate from="/*" to="/suvestinė" /> */}
 
// </Routes>
// : 
// <Routes>
// <Route  path="/" element={<Main>Pradinis puslapis</Main>} />
//     <Route  path="/santrauka" element={<Main>Komponentas santrauka</Main>} />
//     <Route  path="/pajamos" element={<Main><Table_incomes/></Main>} />
//     <Route  path="/islaidos" element={<Main><Table_expenses/></Main>} />
//     <Route  path="/billing" element={<Billing/>} />
//     <Route   path="/rtl" element={<Rtl/>} />
//     <Route   path="/profile" element={<Main><Profile/></Main>} />
//     <Route  exact path="/sign-up" element={<SignUp/>} />
//   <Route  path="/sign-in" element={<SignIn/>} />

//   <Route  path="*" element={<Navigate to="/" replace/>} />
//     {/* <Navigate from="/*" to="/suvestinė" /> */}
 
// </Routes> 


function App() {
  useEffect(()=> { readUser() });
  useEffect(()=> { doSome() });

  return (  
    <div className="App">
      {doSome()}
    </div>
  );
}

export default App;
