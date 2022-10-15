import counterReducer from "./counterReducer";
import { combineReducers } from "redux";
import loadDataReducer from "./loadDataIntoDb";


const allReducers = combineReducers({
  counter: counterReducer,
  loadData: loadDataReducer,
});

export default allReducers;
