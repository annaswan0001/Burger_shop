import { combineReducers } from "redux";
import burgerBuilder from "./burgerBuilderReducer.ts";
import order from "./orderReducer.ts";
import auth from './authReducer'
import child from './childrenReducer'

export default combineReducers({
  burgerBuilder,
  order,
  auth,
  child
});
