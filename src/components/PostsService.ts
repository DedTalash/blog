import axios from 'axios'
import Post, {PostInterface} from "../model/Post";
import {useDispatch} from "react-redux";
import {setPosts, setPostsProcessing} from "../redux/actions";
import {db} from "../config/firebase";

class PostsServiceRest
{
    private readonly KEY = '8c98e299f73540a694ea5dfba8bf3a1b';

    loadPosts()
    {
        const dispatch = useDispatch();
        dispatch(setPostsProcessing(true));

        // db.collection('posts').onSnapshot(snapshot => {
        //     const posts: Post[] = [];
        //     dispatch(setPostsProcessing(false));
        //     snapshot.forEach((post) => {
        //        posts.push(Post.createFromData(post.data() as PostInterface));
        //    })
        //     dispatch(setPosts(posts))
        // })


        axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + this.KEY)
            .then((data) => {
                dispatch(setPostsProcessing(false));
                const posts = data.data.articles.map((post: PostInterface, index: number) => {
                    // db.collection('posts').doc(index.toString()).set(post);
                    return Post.createFromData(post);
                });
                dispatch(setPosts(posts))
            })
    }
}

const postService = new PostsServiceRest();
export default postService;