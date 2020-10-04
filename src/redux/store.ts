import {combineReducers, createStore} from "redux";
import Post from "../model/Post";
import postsReducer from "./postsReducer";
import postsProcessingReducer from "./postsProcessingReducer";

export type BlogReducers = {
    posts: Post[],
    processing: boolean
}

const reducers = combineReducers<BlogReducers>({
    posts: postsReducer,
    processing: postsProcessingReducer
});

export default createStore(reducers);