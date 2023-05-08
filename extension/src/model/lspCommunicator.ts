
import * as cp from "child_process"

type LSP_STATUS = "INITIALIZING" | "PROCESSING" | "WAITING"

export default class LspCommunicator {
    private  lsp

    private messageQueue: string[] = []

    private lspStatus: LSP_STATUS = "INITIALIZING"

    constructor(listeners:((data: string) => void)[] | ((data: string) => void)) {
        this.lsp = cp.spawn( 'java', ['-jar', "C:\\Users\\ohmoo\\projects\\linda-imam\\server\\target\\scala-2.12\\linda-imam-assembly-1.0.jar"],{stdio:[ 'pipe',null,null, 'pipe' ]});
        //受信するたびに、内容を処理する
        this.lsp.stdout.on('data',  (data: any) => {
            const dataStr = data.toString()
            const token = dataStr.trim().split(" ");
            if(token.length < 3) {
                return;
            }
            if(token[0] == "2") { // waiting input
                if(this.messageQueue.length == 0) {
                    this.lspStatus = "WAITING"
                }else {
                    this.lspStatus = "PROCESSING"
                    this.commitMessage(this.messageQueue.shift()!)
                }
                return
            }

            if(typeof listeners == "function") {
                (listeners as ((data: string) => void))(dataStr)
            }else {
                for(const lt of listeners.values()) {
                    lt(dataStr)
                }
            }
        });
    }

    public putMessage(message: string): void {
        if(this.lspStatus == "WAITING"){
            this.commitMessage(message)
        }else {
            this.messageQueue.push(message);
        }
    }

    
    private commitMessage(mesasge: string): void {
        if(!mesasge.match(/.*\n$/)){
            mesasge += "\n"
        }
        this.lsp.stdin.write(mesasge);
    }

}