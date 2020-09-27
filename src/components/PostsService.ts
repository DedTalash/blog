import axios from 'axios'
import Post, {PostInterface} from "../model/Post";
import {useDispatch} from "react-redux";
import {setPosts, setPostsProcessing} from "../redux/actions";

export class PostsService
{
    private readonly KEY = '8c98e299f73540a694ea5dfba8bf3a1b';

    constructor() {
        this.loadPosts();
    }

    loadPosts()
    {
        const dispatch = useDispatch();
        dispatch(setPostsProcessing(true));

        axios.get('http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + this.KEY)
            .then((data) => {
                dispatch(setPostsProcessing(false));
                const posts = data.data.articles.map((post: PostInterface) => {
                    return Post.createFromData(post);
                });
                dispatch(setPosts(posts))
            })
    }
}