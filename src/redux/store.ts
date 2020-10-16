import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import User from "../models/User";

export type BlogReducers = {
    user: User
}

const reducers = combineReducers<BlogReducers>({
    user: userReducer
});

export default createStore(reducers);