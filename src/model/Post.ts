export interface PostInterface {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
}

interface Source {
    id: string;
    name: string;
}

export default class Post
{
    constructor (
        public author: string,
        public content: string,
        public description: string,
        public publishedAt: Date,
        public source: Source,
        public title: string,
        public url: string,
        public urlToImage: string
    ) {}

    public static createFromData(data: PostInterface): Post {
        return new Post(
            data.author,
            data.content,
            data.description,
            new Date(data.publishedAt),
            data.source,
            data.title,
            data.url,
            data.urlToImage
        );
    }
}