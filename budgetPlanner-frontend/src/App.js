
import {Switch, Route} from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Switch>
        <Route  path="/sign-up" exact component={SignUp} />
        <Route  path="/sign-in" exact component={SignIn} />
        <Main>
        <Route  path="/santrauka" exact component={Home} />
        <Route  path="/pajamos" exact component={Table_incomes} />
        <Route  path="/išlaidos" exact component={Table_expenses} />
        <Route  path="/billing" exact component={Billing} />
        <Route  path="/rtl" exact component={Rtl} />
        <Route  path="/profile" exact component={Profile} />
          {/* <Navigate from="/*" to="/santrauka" /> */}
          </Main>
      </Switch>
    </div>
  );
}

export default App;
