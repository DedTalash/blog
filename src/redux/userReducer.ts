import {UserAction, SET_USER} from "./actions";
import User from "../models/User";

const initialUser = User.createEmpty();

const initialState = {
    user: initialUser,
    hash: initialUser.hash
};

export interface UserState {
    user: User,
    hash: string
}

export default function userReducer(
    state: UserState = initialState, { type, user }: UserAction
): UserState
{
    if (type === SET_USER) {
        if (user !== state.user) {
            state.user.unSubscribe();
            user.subscribe();
        }

        return { user, hash: user.hash };
    }

    return state;
}
