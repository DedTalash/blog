import React, {useEffect, useState} from "react";
import {LinearProgress} from "@material-ui/core";
import "./main.css";
import {PostView} from "../components/PostView";
import Post, {PostInterface} from "../../model/Post";
import {db} from "../../config/firebase";
import {RouteComponentProps} from "@reach/router";

export const Main = (props: RouteComponentProps) =>
{
    const [processing, setProcessing] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setProcessing(true);
        return db.collection('posts').onSnapshot(snapshot => {
            const posts: Post[] = [];
            setProcessing(false);
            snapshot.forEach((post) => {
                posts.push(Post.createFromData(post.data() as PostInterface, post.id));
            })
            setPosts(posts);
        });
    }, []);

    return <>
        {posts.map(post => <PostView post={post} key={post.url}/>)}
        {processing && <div className="line">
            <LinearProgress color="secondary"/>
        </div>}
    </>;
}

// private readonly KEY = '8c98e299f73540a694ea5dfba8bf3a1b';

// loadPosts()
// {
// axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + this.KEY)
//     .then((data) => {
//         dispatch(setPostsProcessing(false));
//         const posts = data.data.articles.map((post: PostInterface, index: number) => {
//             db.collection('posts').doc(index.toString()).set(post);
//             return Post.createFromData(post);
//         });
//         dispatch(setPosts(posts))
//     })
// }