import React, {useEffect, Suspense} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/authAction";
//Components
import Select from './views/Form/Select'
import Layot from "./HOC/Layot/Layot";
import BurgerBuilder from "./views/BurgerBuilder/BurgerBuilder";
import AsynkSelect from './views/AsynkSelect/AsynkSelect'

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
const FetchData = React.lazy(() => {
  return import("./views/FetchData/FetchData");
});

const RelatedSelect = React.lazy(() => {
  return import("./views/RelatedSelect/RelatedSelect");
});
const InputDebounced = React.lazy(() => {
  return import("./views/InputDebouced/InputDebounced");
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
        <Route path="/select" render={props => <Select {...props} />} />
        <Route path="/asynkselect" render={props => <AsynkSelect {...props} />} />
        <Route path="/fetchData" render={props => <FetchData {...props} />} />
        <Route path="/relatedselect" render={props => <RelatedSelect {...props} />} />
        <Route path="/inputDebounced" render={props => <InputDebounced {...props} />} />
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


