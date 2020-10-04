import React from 'react';
import MainPage from "./view/MainPage";
import postService from "./components/PostsService";

export default function App()
{
    postService.loadPosts();

    return (
        <MainPage />
    );
}