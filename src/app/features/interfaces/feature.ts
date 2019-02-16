export interface Feature {
    id?: string;
    title: string;
    userId: string;
    likesCount: number;
    likes_users: Array<string>;
}