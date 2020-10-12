import {combineReducers, createStore} from "redux";
import userReducer, {User} from "./userReducer";

export type BlogReducers = {
    user: User
}

const reducers = combineReducers<BlogReducers>({
    user: userReducer
});

export default createStore(reducers);