import ts from "typescript";
import { CustomCompilerHost } from "./";
import { normalizePath } from "../utils/normalizePath";

const mapFileRegExp = /(\.map)$/i
const jsFileRegExp = /(\.(([cm]?jsx?)|json))$/i
export function emitFileCode(this: CustomCompilerHost, fileName: string) {
    let outputText: string = "";
    let sourceMapText;
    type Path = string
    type Code = string
    const emitFiles: Record<Path, Code> = {}
    const sourceFile = this.oldProgram.getSourceFile(fileName)


    this.oldProgram.emit(sourceFile, (name, text) => {
        if (mapFileRegExp.test(name)) {
            sourceMapText = text;
        } else if (jsFileRegExp.test(name)) {
            outputText = text;
        } else {
            emitFiles[normalizePath(name)] = text
        }
    }, undefined, undefined, this.transformers);

    return {
        code: outputText,
        map: sourceMapText,
        diagnostics: ts.getPreEmitDiagnostics(this.oldProgram, sourceFile),
        emitFiles
    }
}