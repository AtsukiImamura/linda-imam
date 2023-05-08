import type { ICopyBook, ICopyPrimitive, IStatement } from "@/model/interface/ICopy";
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

    public get dispByteValue(): string {
        if(this.isGroup){
            return ""
        }
        const strValue = Array.from(new Uint8Array(this._value!)).map(a => (a).toString(16))
        return strValue.reduce((v,c) => v+c, "")
        // return Array.from([0,1])
        //             .map(n => strValue.map(d => d.slice(n, n + 1))
        //                                 .reduce((acc, cur) => acc + cur, "")
        //                 )
    }

    public set dispByteValue(value: string){
        // if(value.length !== 2) {
        //     throw new Error("length of value must be 2.")
        // }
        // if(value[0].length !== value[1].length) {
        //     throw new Error("length of both value must be same.")
        // }
        // const hexCheck = value.map(v => {
        //                     const mt = v.match(/^[0-9a-fA-F]+$/)
        //                     return mt && mt.length > 0;
        //                 }).reduce((v,c)=> v && c,true)
        // if(!hexCheck) {
        //     throw new Error("illegal expression of hex type..")
        // }
        // const numbers: number[] = []
        // for(var i = 0; i < value[0].length; i++){
        //     numbers[i] = parseInt(value[0][i] + value[1][i], 16)
        // }
        const ajust = value + "0".repeat(this._value!.byteLength - value.length)
        const numbers: number[] = []
        for(var i=0; i<this._value!.byteLength; i++){
            numbers[i] = parseInt(ajust.slice(i,i+2), 16)
        }
        this.set_value(numbers)
        // this._value = new Uint8Array(bytes)
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


    public set dispValue(txt: string) {
        this.set_value(encoding.stringToCode(txt))
    }

    constructor(copy: IStatement) {
        this.id = copy.id
        this.name = copy.name;
        this.level = copy.level
        this.redefinedStatements = copy.details.map(d => new CopyStatement(d));
        if((copy as any).value !== undefined){
            this.isPrimitive = true;
            this.set_value((copy as ICopyPrimitive).value)
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


    private set_value(val: number[]) {
        const xValue = new Uint8Array(new ArrayBuffer(val.length))
        for(var i=0; i<val.length;i++){
            xValue![i] = val[i]
        }
        this._value = xValue.buffer
    }
}