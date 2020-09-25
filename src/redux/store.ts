import {combineReducers, createStore} from "redux";
import {PostsService} from "../components/PostsService";
import Post from "../model/Post";
import postsReducer from "./postsReducer";
import postsServiceReducer from "./postsServiceReducer";

type BlogReducers = {
    posts: Post[],
    postsService: PostsService|null
}

const reducers = combineReducers<BlogReducers>({
    posts: postsReducer,
    postsService: postsServiceReducer
});

export default createStore(reducers);