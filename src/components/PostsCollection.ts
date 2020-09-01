import axios from 'axios'

export class PostsCollection
{
    private readonly KEY = '8c98e299f73540a694ea5dfba8bf3a1b'

    private posts = []

    getPosts()
    {
        return this.posts;
    }

    loadPosts(callback: Function)
    {
        axios.get('http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + this.KEY)
            .then((data) => {
                this.posts = data.data.articles
                callback(data)
            })
    }

}