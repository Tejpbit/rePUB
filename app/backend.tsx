import { updateCollections } from "./actions/collections";
import conf from "./config.js";
//import { toast } from "react-toastify";

export type Collection = {
    id: string;
    annotations: Annotation[];
}

export type Annotation = {
    id: string;
    type: string;
    resource: string;
    location: {
        start: EpubCFI;
        end: EpubCFI;
    }
};

export type EpubCFI = {

}

export default class Backend {

    getAllCollections = () => {
        return this.fetchJson("/collections")
            .then((resp: Collection[]) => {
                updateCollections(resp);

        })
    };

    getCollection = (uuid: string) => {
        return this.fetchJson(`/collections/$uuid`)
    };


    myfetch = (uri: string, options = {}) => fetch(conf.backend_address + uri, options);

    fetchJson = (uri: string) =>
        this.myfetch(uri).then(this.checkStatus).then(resp => resp.json());

    checkStatus = (response: any) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.json().then((obj: any) => {
                throw obj;
            });
        }
    };
}
