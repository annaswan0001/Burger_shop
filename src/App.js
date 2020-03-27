import React from 'react';
import './App.css';


//Components
import Layot from './components/Layot/Layot'
import BurgerBuilder from './views/BurgerBuilder/BurgerBuilder'
import Logout from './views/Auth/Logout/Logout'

const Orders = React.lazy(()=>{
  return import ('./views/Orders/Orders')
})
const Checkout = React.lazy(()=>{
  return import('./views/Checkout/Checkout')
})
const Auth = React.lazy(()=>{
  return import('./views/Auth/Auth')
})



function App() {
  return (
    <div >
      <Layot>Test</Layot>
    </div>
  );
}

export default App;
