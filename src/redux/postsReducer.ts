import Post from "../model/Post";
import {PostsAction, SET_POSTS} from "./actions";

export default function postsReducer(
    state: Post[] = [], { type, posts }: PostsAction
): Post[]
{
    if (type === SET_POSTS) {
        return posts;
    }

    return state;
}
