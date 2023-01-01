import ts from "typescript"
import { CustomCompilerHost } from "./";


export function readFile(this: CustomCompilerHost, fileName: string) {
    let fileDetails = this.getCacheFileDetails(fileName);


    return (fileDetails.sourceFile?.text || fileDetails.code) || (fileDetails.code = ts.sys.readFile(fileName, this.configFileOptions.options.charset))
}