import {PostsServiceAction, SET_POSTS_SERVICE} from "./actions";
import {PostsService} from "../components/PostsService";

export default function postsServiceReducer(
    state: PostsService|null = null, {type, service}: PostsServiceAction
): PostsService|null
{
    if (type === SET_POSTS_SERVICE) {
        return service;
    }

    return state;
}