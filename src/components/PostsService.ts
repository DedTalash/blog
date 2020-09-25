import axios from 'axios'
import Post, {PostInterface} from "../model/Post";

export class PostsService
{
    private readonly KEY = '8c98e299f73540a694ea5dfba8bf3a1b'

    private posts: Post[] = []

    loadPosts(callback: Function)
    {
        axios.get('http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + this.KEY)
            .then((data) => {
                this.posts = data.data.articles.map((post: PostInterface) => {
                    return Post.createFromData(post);
                });
                callback(this.posts)
            })
    }
}