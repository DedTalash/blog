import { TitleAction, SET_TITLE} from "./actions";

export default function titleReducer(
    state: string = "Blog", { type, title }: TitleAction
): string
{
    if (type === SET_TITLE) {
        return title;
    }

    return state;
}
