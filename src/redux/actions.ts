import {User} from "firebase";

export const SET_USER = 'SET_USER';
export const SET_TITLE = 'SET_TITLE';

export type UserAction ={
    type: string,
    user: User
}

export type TitleAction ={
    type: string,
    title: string
}
export const setUser = (user: User): UserAction =>
    ({type: SET_USER, user});

export const setTitle = (title: string): TitleAction =>
    ({type: SET_TITLE, title});

