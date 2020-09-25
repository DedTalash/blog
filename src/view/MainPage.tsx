import React from "react";
import {LinearProgress} from "@material-ui/core";
import "./main.css";
import {PostsService} from "../components/PostsService";
import Post from "../model/Post";
import PostView from "./PostView";

interface State {
    posts: Array<Post>,
    processing: boolean
}

export class MainPage extends React.Component<any, State>
{
    private collection: PostsService

    constructor(props: any)
    {
        super(props);
        this.state = {
            posts: [],
            processing: false
        }
        this.collection = new PostsService();
    }

    componentDidMount() {
        this.setState({processing:true});
        this.collection.loadPosts((data: Post[]) => {
            this.setState({processing: false, posts: data})
        });
    }

    render()
    {
        return <React.Fragment>
            <h1>Blog</h1>
            {this.state.posts.map(post => <PostView post={post} key={post.url} />)}
            {this.state.processing && <div className="line">
                <LinearProgress color="secondary"/>
            </div>}
        </React.Fragment>;
    }
}