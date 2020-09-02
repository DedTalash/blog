import React from "react";
import Post from "../model/Post";

interface Props
{
    post: Post
}

export default function PostView (props: Props)
{
    return <div>
        <h2 >{props.post.title}</h2>
        <img src={props.post.urlToImage} alt={props.post.title} />
    </div>
}