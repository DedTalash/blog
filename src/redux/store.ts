import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import {User} from "firebase";

export type BlogReducers = {
    user: User|null
}

const reducers = combineReducers<BlogReducers>({
    user: userReducer
});

export default createStore(reducers);