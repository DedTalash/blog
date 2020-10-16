import {combineReducers, createStore} from "redux";
import userReducer, {UserState} from "./userReducer";

export type BlogReducers = {
    userState: UserState
}

const reducers = combineReducers<BlogReducers>({
    userState: userReducer
});

export default createStore(reducers);