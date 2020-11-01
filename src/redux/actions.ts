import User from "../models/User";

export const SET_USER = 'SET_USER';

export type UserAction ={
    type: string,
    user: User
}

export const setUser = (user: User): UserAction =>
    ({type: SET_USER, user});





export enum Modal {
    SHOW = 'SHOW-MODAL', HIDE = 'HIDE-MODAL'
}

export enum ModalType {
    SignUP, SignIN, ForgotPassword
}

export type ModalAction = {
    type: Modal,
    modal?: ModalType
}

export const closeModal = (): ModalAction => {
    return { type: Modal.HIDE };
}

export const showModal = (modal: ModalType): ModalAction => {
    return { type: Modal.SHOW, modal };
}
