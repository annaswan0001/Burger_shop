import { combineReducers } from "redux";
import burgerBuilder from "./burgerBuilderReducer";
import order from "./orderReducer";

export default combineReducers({
  burgerBuilder,
  order,
});
