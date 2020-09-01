import React from "react";
import {LinearProgress} from "@material-ui/core";
import "./main.css";
import {PostsCollection} from "../components/PostsCollection";

interface State {
    posts: Array<any>,
    processing: boolean
}

export class MainPage extends React.Component<any, State>
{
    private collection: PostsCollection

    constructor(props: any)
    {
        super(props);
        this.state = {
            posts: [],
            processing: false
        }
        this.collection = new PostsCollection();
    }

    componentDidMount() {
        this.setState({processing:true});
        this.collection.loadPosts((data: any) => {
            this.setState({processing: false, posts: data})
        });
    }


    render()
    {
        console.log('1', this.state.posts)

        return <React.Fragment>
            <h1>Blog</h1>
            {this.state.processing && <div className="line">
                <LinearProgress color="secondary"/>
            </div>}

        </React.Fragment>;
    }
}