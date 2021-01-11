import { combineReducers } from "redux";
import auth from "./auth";
import aquariums from "./aquariums";
import alert from "./alert";

export default combineReducers({ auth, aquariums, alert });
