import Post from "../model/Post";

export const SET_POSTS = 'set-posts';
export const SET_POSTS_PROCESSING = 'set-posts-processing';
export const  SET_WINDOW_WIDTH = 'set-window-width';

export type PostsAction ={
    type: string,
    posts: Post[]
}

export type PostsProcessingAction ={
    type: string,
    processing: boolean
}

export const setPosts = (posts: Post[]): PostsAction =>
    ({type: SET_POSTS, posts});

export const setPostsProcessing = (processing: boolean): PostsProcessingAction=>
    ({type: SET_POSTS_PROCESSING, processing})