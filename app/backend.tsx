import conf from "./config";
//import { toast } from "react-toastify";

export type Collection = {
    id: string;
    title: string;
    annotations: Annotation[];
}

export type Annotation = {
    id: string;
    type: string;
    resource: string;
    location: {
        start: string;
        end: string;
    }
};

class Backend {

    getAllCollections = () => {
        return this.fetchJson("/collections");
    };

    getCollection = (uuid: string) => {
        return this.fetchJson(`/collections/${uuid}`)
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

export default new Backend();