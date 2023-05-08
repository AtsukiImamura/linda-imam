

import LspCommunicator from "../model/lspCommunicator";

export default class LspService {

    private communicators: Map<string,LspCommunicator> = new Map<string,LspCommunicator>()

    constructor() {
    }

    public addCommunicator(key: string, listeners: ((data: string) => void)[] | ((data: string) => void)) {
        if(this.communicators.has(key)) {
            return undefined
        }
        const com = new LspCommunicator(listeners)
        this.communicators.set(key, com);
        return com;
    }

    public putMessage(key: string, mesasge: string): boolean {
        console.log("putMessage key="+key)
        console.log(this.communicators.keys())
        if(!this.communicators.has(key)){
            return false;
        }
        this.communicators.get(key)!.putMessage(mesasge);
        return true;
    }
}