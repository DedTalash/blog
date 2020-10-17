import {combineReducers} from "redux";
import {modalReducer, ModalState} from "./modalReducer";
import {userReducer, UserState} from "./userReducer";

export interface BlogReducers {
	modal: ModalState,
	userState: UserState,
}

export default combineReducers<BlogReducers>({
	modal: modalReducer,
	userState: userReducer
});