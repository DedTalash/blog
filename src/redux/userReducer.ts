import {UserAction, SET_USER} from "./actions";

export type User = {
    name?: string,
    photo?: string,
    id?: string,
    email?: string,
} | null;

export default function userReducer(state: User = null, { type, user }: UserAction): User
{
    if (type === SET_USER) {
        return user;
    }

    return state;
}
