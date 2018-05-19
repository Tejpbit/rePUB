import {IActionWithPayload} from '../actions/helpers';
import {UPDATE_COLLECTIONS} from "../actions/collections";
import {Collection} from "../backend";

export type TState = Collection[];

export default function collectionsReducer(state: number = 0, action: IActionWithPayload<Collection[]>) {
    switch (action.type) {
        case UPDATE_COLLECTIONS:
            return {
                collections: action.payload
            }
    }

    return state;
}
