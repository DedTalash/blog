import React from "react";
import {Grid} from "@material-ui/core";
import {PostView} from "../components/PostView";
import Post, {PostInterface} from "../../models/Post";
import {RouteComponentProps} from "@reach/router";
import {useTitle} from "../../utils/useTitle";
import config from "../../config/config";
import AppLoader from "../components/AppLoader";
import {useCollection} from "../../utils/useCollection";

export default function Main(props: RouteComponentProps)
{
    useTitle(config.companyName);

   const [posts, processing] = useCollection<Post>('posts', snapshot => {
       const posts: Post[] = [];
       snapshot.forEach((post) => {
           posts.push(Post.createFromData(post.data() as PostInterface, post.id));
       })
       return posts;
   });

    return  <AppLoader loading={processing}>
        <Grid container>
            {posts.map(post => <PostView post={post} key={post.alias}/>)}
        </Grid>
    </AppLoader>
}