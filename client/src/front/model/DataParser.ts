import { ICopyAstGroup, ICopyAstPrimitive, ICopyBook, ICopyPrimitive } from "../declaration/interface/ICopy";

export default class DataParser {

    private readonly data: ArrayBuffer;

    private readonly copy: ICopyAstGroup;

    private readonly redefines: (ICopyAstGroup | ICopyAstPrimitive)[];

    constructor(data: ArrayBuffer, copy: ICopyAstGroup) {
        this.data = data;
        this.copy = copy;
        const redefines = this.searchRedefined(copy)
        // console.log(JSON.stringify(redefines))
        this.redefines = redefines ? redefines : [];

        // translate char code here if nessesary.
    }

    public parse() {
        const parsed = this.exec(new Uint8Array(this.data), this.copy, "__ROOT__")
        if(!parsed) {
            throw new Error("parse failed.")
        }
        return parsed;
    }

    private exec(data: Uint8Array, copy: ICopyAstGroup | ICopyAstPrimitive, parentName: string): ICopyBook | ICopyPrimitive | undefined {

        if((copy as any).statements == undefined) {
            //* Primitive
            const info = copy as ICopyAstPrimitive
            const prop = info.binaryProperties;
            const value = new Uint8Array(new ArrayBuffer(prop.dataSize))
            for(var i = 0; i< prop.dataSize; i++){
                value[i] = data[prop.offset + i]
            }
            return {
                id: parentName + "." + info.name,
                ... info,
                value: Array.from(value),
                details: this.redefines
                            .filter(r => r.redefines == info.name)
                            .map(r => this.exec(data, r, info.name))
                            .filter(r => !!r )
                            .sort((a, b) => a!.lineNumber - b!.lineNumber) as (ICopyBook | ICopyPrimitive)[]
                            
            }
        }
        const statements:(ICopyBook | ICopyPrimitive)[] = []

        for(const stmt of (copy as ICopyAstGroup).statements.filter(r => r.redefines == "")){
            const parsed = this.exec(data, stmt, copy.name)
            if(!parsed) {
                continue;
            }
            statements.push(parsed)
        }
        return  {
            id: parentName + "." + copy.name,
            ...copy,
            details: [],
            statements: statements.sort((a, b) => a!.lineNumber - b!.lineNumber)
        } as ICopyBook
    }

    private searchRedefined(copy: ICopyAstGroup | ICopyAstPrimitive) {
        const res: (ICopyAstGroup | ICopyAstPrimitive)[] = [];
        if((copy as any).statements !== undefined) {
            for(const stmt of (copy as ICopyAstGroup).statements) {
                const stmtReds = this.searchRedefined(stmt)
                // continue if result is undefined
                if(!stmtReds) {
                    continue;
                }
                // remove undefined
                res.push(...stmtReds.filter(r => !!r))
            }
        }
        if(copy.redefines !== "") {
            res.push(copy);
        }
        return res;
    }

}