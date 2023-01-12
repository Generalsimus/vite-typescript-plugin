import ts from "typescript";
import { CustomCompilerHost } from "./";
import { normalizePath } from "./utils/normalizePath";


type Path = string
type Code = string
export interface EmitFileValueType {
    code: string,
    map?: string,
    diagnostics: readonly ts.Diagnostic[],
    emitFiles: Record<Path, Code>
}
const mapFileRegExp = /(\.map)$/i
const jsFileRegExp = /(\.(([cm]?jsx?)|json))$/i
export function emitFileCode(this: CustomCompilerHost, fileName: string): EmitFileValueType {
    let outputText: string = "";
    let sourceMapText;
    const sourceFile = this.oldProgram.getSourceFile(fileName)
    const emitFiles: EmitFileValueType["emitFiles"] = {}


    this.oldProgram.emit(sourceFile, (name, text) => {
        if (mapFileRegExp.test(name)) {
            sourceMapText = text;
        } else if (jsFileRegExp.test(name)) {
            outputText = text;
        } else {
            emitFiles[normalizePath(name)] = text
        }
    }, undefined, undefined, this.transformers);

    return this.getCacheFileDetails(fileName).emitFileValue = {
        code: outputText,
        map: sourceMapText,
        diagnostics: ts.getPreEmitDiagnostics(this.oldProgram, sourceFile),
        emitFiles
    }
}