import {combineReducers, createStore} from "redux";
import {PostsService} from "../components/PostsService";
import Post from "../model/Post";
import postsReducer from "./postsReducer";
import postsServiceReducer from "./postsServiceReducer";
import postsProcessingReducer from "./postsProcessingReducer";

export type BlogReducers = {
    posts: Post[],
    postsService: PostsService|null,
    processing: boolean
}

const reducers = combineReducers<BlogReducers>({
    posts: postsReducer,
    postsService: postsServiceReducer,
    processing: postsProcessingReducer
});

export default createStore(reducers);