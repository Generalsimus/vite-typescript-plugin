import { CustomCompilerHost } from "./";

export function emitFileCode(this: CustomCompilerHost, fileName: string) {
    let outputText: string = "";
    let sourceMapText;
    this.oldProgram.emit(this.oldProgram.getSourceFile(fileName), (name, text) => {
        if (name.endsWith(".map")) {
            sourceMapText = text;
        }
        else {
            outputText = text;
        }
    }, undefined, undefined, this.transforms);

    return {
        code: outputText,
        map: sourceMapText
    }
}