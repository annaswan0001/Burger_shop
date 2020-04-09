import React from "react";
import "./App.css";
import {Route, Switch,Redirect} from 'react-router-dom'
import Orders from './views/Orders/Orders'
import {connect} from 'react-redux'
import {authCheckState} from './store/actions/authAction'


//Components
import Layot from "./HOC/Layot/Layot";
import BurgerBuilder from "./views/BurgerBuilder/BurgerBuilder";
import Checkout from './views/Checkout/Checkout'
import Logout from "./views/Auth/Logout/Logout"
import Auth from './views/Auth/Auth';

// const Orders = React.lazy(() => {
//   return import("./views/Orders/Orders");
// });
// const Checkout = React.lazy(() => {
//   return import("./views/Checkout/Checkout");
// });
// const Auth = React.lazy(() => {
//   return import("./views/Auth/Auth");
// });

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
    console.log("app")

  }
  

  render() {
    let routes = (
      <Switch><Route exact path="/" component={BurgerBuilder} />
    <Route path="/auth" component={Auth}/>

    <Redirect to="/"/>
    </Switch>
    )

    if(this.props.token){
      routes =(   <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/"/>
        </Switch>)
    }
    return (
      <div>
        <Layot>
         {routes}
        </Layot>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token:state.auth.token !== null
})



export default connect(mapStateToProps,{authCheckState})(App);
