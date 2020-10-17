import {Modal, ModalAction, ModalType} from "../actions";

export type ModalState = ModalType | null | undefined;

export const modalReducer = (state: ModalState = null, {type, modal}: ModalAction): ModalState => {
	switch (type) {
		case Modal.HIDE:
			return null;
		case Modal.SHOW:
			return modal;
		default:
			return state;
	}
}