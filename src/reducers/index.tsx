import { combineReducers } from "redux";
import showToastReducer from "./toast";

const allReducers = combineReducers({
  toast: showToastReducer,
});

export default allReducers;