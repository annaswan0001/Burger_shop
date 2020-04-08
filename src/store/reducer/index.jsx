import { combineReducers } from "redux";
import burgerBuilder from "./burgerBuilderReducer";
import order from "./orderReducer";
import auth from './authReducer'

export default combineReducers({
  burgerBuilder,
  order,
  auth
});
