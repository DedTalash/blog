import User from "../models/User";

export const SET_USER = 'SET_USER';

export type UserAction ={
    type: string,
    user: User
}

export const setUser = (user: User): UserAction =>
    ({type: SET_USER, user});
