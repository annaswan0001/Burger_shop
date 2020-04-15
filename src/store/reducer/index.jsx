import { combineReducers } from "redux";
import burgerBuilder from "./burgerBuilderReducer.ts";
import order from "./orderReducer.ts";
import auth from './authReducer'

export default combineReducers({
  burgerBuilder,
  order,
  auth
});
