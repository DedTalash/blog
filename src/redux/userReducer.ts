import {UserAction, SET_USER} from "./actions";
import {User} from "firebase";

export default function userReducer(
    state: User|null = null, { type, user }: UserAction
): User|null
{
    if (type === SET_USER) {
        return user;
    }

    return state;
}
