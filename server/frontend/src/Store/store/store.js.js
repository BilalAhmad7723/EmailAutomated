import { createStore,combineReducers } from "redux";
import {SetUser} from "../reducers/reducer.js";

const reducers = combineReducers({ SetUser })

const store = createStore(reducers);
export default store;
