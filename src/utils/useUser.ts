import store, {BlogReducers} from "../redux/store";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function useUser()
{
	const state = store.getState().userState;

	const [user, setUser] = useState(state.user);
	const hash = useSelector(({userState}: BlogReducers) => userState.hash);

	useEffect(() => setUser(state.user), [hash]);

	return user;
}