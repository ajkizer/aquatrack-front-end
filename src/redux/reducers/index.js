import { combineReducers } from "redux";
import auth from "./auth";
import aquariums from "./aquariums";

export default combineReducers({ auth, aquariums });
