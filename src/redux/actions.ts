import Post from "../model/Post";
import {PostsService} from "../components/PostsService";

export const SET_POSTS = 'set-posts';
export const SET_POSTS_SERVICE = 'set-posts-service';
export const SET_POSTS_PROCESSING = 'set-posts-processing';

export type PostsAction ={
    type: string,
    posts: Post[]
}

export type PostsServiceAction ={
    type: string,
    service: PostsService
}

export type PostsProcessingAction ={
    type: string,
    processing: boolean
}

export const setPosts = (posts: Post[]): PostsAction =>
    ({type: SET_POSTS, posts});

export const setPostsService = (service: PostsService): PostsServiceAction =>
    ({type: SET_POSTS_SERVICE, service})

export const setPostsProcessing = (processing: boolean): PostsProcessingAction=>
    ({type: SET_POSTS_PROCESSING, processing})
