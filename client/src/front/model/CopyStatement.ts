import { ICopyBook, ICopyPrimitive, IStatement } from "../declaration/interface/ICopy";
import * as encoding from "encoding-japanese"

export default class CopyStatement {

    public readonly id: string;

    public readonly name: string;

    public readonly level: number;

    public readonly redefinedStatements: CopyStatement[]

    public readonly childStatements: CopyStatement[] | undefined;

    public readonly isPrimitive: boolean;

    public get isGroup(): boolean {
        return !this.isPrimitive
    }

    private _value?: ArrayBuffer;

    public get dispByteValue(): string[] {
        if(this.isGroup){
            return["",""]
        }
        const strValue = Array.from(new Uint8Array(this._value!)).map(a => (a).toString(16))
        return Array.from([0,1])
                    .map(n => strValue.map(d => d.slice(n, n + 1))
                                        .reduce((acc, cur) => acc + cur, "")
                        )
    }

    public set dispByteValue(value: string[]){
        if(value.length !== 2) {
            throw new Error("length of value must be 2.")
        }
        if(value[0].length !== value[1].length) {
            throw new Error("length of both value must be same.")
        }
        const hexCheck = value.map(v => {
                            const mt = v.match(/^[0-9a-fA-F]+$/)
                            return mt && mt.length > 0;
                        }).reduce((v,c)=> v && c,true)
        if(!hexCheck) {
            throw new Error("illegal expression of hex type..")
        }
        const bytes = []
        for(var i = 0; i < value[0].length; i++){
            bytes[i] = parseInt(value[0][i] + value[1][i], 16)
        }
        this._value = new Uint8Array(bytes)
    }

    public get dispValue(): string {
        if(this.isGroup){
            return ""
        }
        // return Array.from(this._value).map(d => d.toString(16)).reduce((v,c) => v+c, "")
        // console.log("dispValue")
        // console.log(this._value)
        // console.log(new Uint8Array(this._value!))
        return encoding.codeToString(Array.from(new Uint8Array(this._value!)))
    }

    constructor(copy: IStatement) {
        this.id = copy.id
        this.name = copy.name;
        this.level = copy.level
        this.redefinedStatements = copy.details.map(d => new CopyStatement(d));
        if((copy as any).value !== undefined){
            this.isPrimitive = true;
            const value = (copy as ICopyPrimitive).value
            const xValue = new Uint8Array(new ArrayBuffer(value.length))
            for(var i=0; i<value.length;i++){
                xValue![i] = value[i]
            }
            this._value = xValue.buffer
            // this._value = (copy as ICopyPrimitive).value
            // console.log((copy as ICopyPrimitive).value)
            // console.log(new Uint8Array((copy as ICopyPrimitive).value, 0, (copy as ICopyPrimitive).value.byteLength))
            // console.log(Array.from(new Uint8Array((copy as ICopyPrimitive).value)))
            // console.log("** "+  encoding.codeToString(Array.from(new Uint8Array())))
            // console.log("+++++")
            // console.log((copy as any).value)
            // console.log(Array.from((copy as any).value))
            // this._value.
        }else  {
            this.isPrimitive = false;
            this.childStatements = (copy as ICopyBook).statements.map(s => new CopyStatement(s))
        }
        // console.log(this._value)
    }
}