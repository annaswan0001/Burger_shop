import React from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom'
import Orders from './views/Orders/Orders'



//Components
import Layot from "./HOC/Layot/Layot";
import BurgerBuilder from "./views/BurgerBuilder/BurgerBuilder";
import Checkout from './views/Checkout/Checkout'
import Logout from "./views/Auth/Logout/Logout";

// const Orders = React.lazy(() => {
//   return import("./views/Orders/Orders");
// });
// const Checkout = React.lazy(() => {
//   return import("./views/Checkout/Checkout");
// });
// const Auth = React.lazy(() => {
//   return import("./views/Auth/Auth");
// });

function App() {
  return (
    <div>
      <Layot>
        <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout}/>
      
        </Switch>
      </Layot>
    </div>
  );
}

export default App;
