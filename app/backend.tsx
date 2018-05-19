import { dispatchActionFromTopic } from "./actions/helpers";
import conf from "./config.js";
//import { toast } from "react-toastify";

export type Collection = {
    id: String;
    annotations: Annotation[];
}

export type Annotation = {
    id: String;
    type: String;
    resource: String;
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

                console.log(resp);

        })
    };

    getCollection = (uuid: String) => {
        return this.fetchJson(`/collections/$uuid`)
    };


    myfetch = (uri: String, options = {}) => fetch(conf.backend_address + uri, options);

    fetchJson = (uri: String) =>
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
