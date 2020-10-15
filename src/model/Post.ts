export interface PostInterface {
    title: string;
    description: string;
    alias: string;
    photo: string;
    content: string;
    date: {toDate(): Date};
}

export default class Post
{
    constructor (
        public content: string,
        public description: string,
        public date: Date,
        public title: string,
        public alias: string,
        public photo: string,
        public id: string
    ) {}

    public static createEmpty(): Post
    {
        return new Post(
            '',
            '',
            new Date(),
            '',
            '',
            '',
            ''
        );
    }

    public isNew(): boolean
    {
        return !this.id;
    }

    public static createFromData(data: PostInterface, id: string): Post {
        return new Post(
            data.content,
            data.description,
            data.date.toDate(),
            data.title,
            data.alias,
            data.photo,
            id
        );
    }
}