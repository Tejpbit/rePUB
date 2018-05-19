//import { actionCreatorVoid } from './helpers';
import {Collection} from "../backend";
import {actionCreator} from "./helpers";


export const UPDATE_COLLECTIONS = 'UPDATE_COLLECTIONS';
export const setCollections = actionCreator('INCREMENT_COUNTER');

export function updateCollections(collections: Collection[]) {
    return (dispatch: Function) => {
        dispatch(setCollections(collections));
    };
}
