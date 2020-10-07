import {combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import {User} from "firebase";
import titleReducer from "./titleReducer";

export type BlogReducers = {
    user: User|null,
    title: string
}

const reducers = combineReducers<BlogReducers>({
    user: userReducer,
    title: titleReducer
});

export default createStore(reducers);