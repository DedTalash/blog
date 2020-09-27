import React from "react";
import {LinearProgress} from "@material-ui/core";
import "./main.css";
import PostView from "./PostView";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import Post from "../model/Post";

const MainPage = (props: {posts: Post[], processing: boolean}) =>
{
    return <React.Fragment>
        <h1>Blog</h1>
        {props.posts.map(post => <PostView post={post} key={post.url}/>)}
        {props.processing && <div className="line">
            <LinearProgress color="secondary"/>
        </div>}
    </React.Fragment>;
}

export default connect(
    ({posts, processing}: BlogReducers) => ({posts: [...posts], processing}),
)(MainPage);