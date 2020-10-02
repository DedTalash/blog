import {combineReducers, createStore} from "redux";
import {PostsService} from "../components/PostsService";
import Post from "../model/Post";
import postsReducer from "./postsReducer";
import postsServiceReducer from "./postsServiceReducer";
import postsProcessingReducer from "./postsProcessingReducer";
import {widthReducer} from "./widthReducer";

export type BlogReducers = {
    posts: Post[],
    postsService: PostsService|null,
    processing: boolean,
    width: number
}

const reducers = combineReducers<BlogReducers>({
    posts: postsReducer,
    postsService: postsServiceReducer,
    processing: postsProcessingReducer,
    width: widthReducer
});

export default createStore(reducers);