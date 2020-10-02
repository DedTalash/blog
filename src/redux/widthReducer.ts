import {SET_WINDOW_WIDTH} from "./actions";
export const widthReducer =
    (width: number = window.innerWidth, action: {type: string, payload: any}): number => {
        return action.type === SET_WINDOW_WIDTH ? action.payload : width;
    }