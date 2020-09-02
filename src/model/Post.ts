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
    author: string;
    content: string;
    description: string;
    publishedAt: Date;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;

    constructor (
        author: string,
        content: string,
        description: string,
        publishedAt: Date,
        source: Source,
        title: string,
        url: string,
        urlToImage: string
    ) {
        this.author = author;
        this.content = content;
        this.description = description;
        this.publishedAt = publishedAt;
        this.source = source;
        this.title = title;
        this.url = url;
        this.urlToImage = urlToImage;
    }

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