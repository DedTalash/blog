import {UserAction, SET_USER} from "./actions";
import User from "../models/User";

export default function userReducer(
    state: User = User.createEmpty(), { type, user }: UserAction
): User
{
    if (type === SET_USER) {
        state.unSubscribe();
        user.subscribe();
        return user;
    }
    return state;
}
