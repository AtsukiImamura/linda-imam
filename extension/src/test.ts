// const s = "こんにちは"

// var ar = new Uint8Array(s.length);
// for (var i=0; i<s.length; i++){
//     ar[i] = s.charCodeAt(i);/* w ww. ja  v  a 2s . co  m*/
// }


// const buf = Buffer.from(ar)
// console.log(buf)
// console.log(ar)

// console.log(Array.from(ar).map(a => (a).toString(16)))




import * as fs from "fs"
import { ICopyAstGroup } from "../front/declaration/interface/ICopy"
import CopyStatement from "../front/model/CopyStatement"
import DataParser from "../front/model/DataParser"

const data = "abc4567890123456789012345678901234567890123456789012345678901234"
// statement__e72aab677489e1e9783a3741cd4e77ab51351e44b319952bdc8ae84fb6ee4c92.json
const copy = JSON.parse(fs.readFileSync("C:\\Users\\ohmoo\\projects\\linda-imam\\target\\statement__e72aab677489e1e9783a3741cd4e77ab51351e44b319952bdc8ae84fb6ee4c92.json").toString()) as ICopyAstGroup[]
const parser = new DataParser(Uint8Array.from(data.split("").map((d) => d.charCodeAt(0))), copy[0])
const parsed = parser.parse()
const stmt = new CopyStatement(parsed)
console.log(parsed)
// console.log(JSON.stringify(res))