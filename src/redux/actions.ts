import Post from "../model/Post";
import {PostsService} from "../components/PostsService";

export const SET_POSTS = 'set-posts';
export const SET_POSTS_SERVICE = 'set-posts-service';

export type PostsAction ={
    type: string,
    posts: Post[]
}

export type PostsServiceAction ={
    type: string,
    service: PostsService
}

export const setPosts = (posts: Post[]): PostsAction =>
    ({type: SET_POSTS, posts: posts});

export const setPostsService = (service: PostsService): PostsServiceAction =>
    ({type: SET_POSTS_SERVICE, service: service})
