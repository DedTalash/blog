import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {PostView} from "../components/PostView";
import Post, {PostInterface} from "../../models/Post";
import {db} from "../../config/firebase";
import {RouteComponentProps} from "@reach/router";
import {connect} from "react-redux";
import {useTitle} from "../../utils/useTitle";
import config from "../../config/config";
import AppLoader from "../components/AppLoader";

interface Props {

}

const Main = (props: Props & RouteComponentProps) =>
{
    useTitle(config.companyName);

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

    return  <AppLoader loading={processing}>
        <Grid container>
            {posts.map(post => <PostView post={post} key={post.alias}/>)}
        </Grid>
    </AppLoader>
}

export default connect(
    null
)(Main);

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