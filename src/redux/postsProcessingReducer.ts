import {PostsProcessingAction, SET_POSTS_PROCESSING} from "./actions";

export default function postsProcessingReducer(
    state: boolean = false, { type, processing }: PostsProcessingAction
): boolean
{
    if (type === SET_POSTS_PROCESSING) {
        return processing;
    }

    return state;
}
