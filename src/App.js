import React, {useEffect, Suspense} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/authAction";
//Components
import Layot from "./HOC/Layot/Layot";
import BurgerBuilder from "./views/BurgerBuilder/BurgerBuilder";

const Orders = React.lazy(() => {
  return import("./views/Orders/Orders");
});
const Checkout = React.lazy(() => {
  return import("./views/Checkout/Checkout");
});
const Auth = React.lazy(() => {
  return import("./views/Auth/Auth");
});
const Logout = React.lazy(() => {
  return import("./views/Auth/Logout/Logout");
});


const App = (props) =>{
  
  useEffect(() => {
    props.authCheckState();
  }, [props.authCheckState])

  let routes = (
    <Switch>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.token) {
    routes = (
      <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/logout" render={props => <Logout {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Layot><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layot>
  )
}

const mapStateToProps = (state) => ({
  token: state.auth.token !== null,
});

export default connect(mapStateToProps, { authCheckState })(App);


