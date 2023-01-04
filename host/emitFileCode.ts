import { CustomCompilerHost } from "./";

export function emitFileCode(this: CustomCompilerHost, fileName: string) {
    let outputText: string = "";
    let sourceMapText;
    // console.log("🚀 --> file: emitFileCode.ts:7 --> this.oldProgram.emit --> this.oldProgram.getSourceFile(fileName)", this.oldProgram.getSourceFile(fileName));

    this.oldProgram.emit(this.oldProgram.getSourceFile(fileName), (name, text) => {
        // console.log("🚀 --> file: emitFileCode.ts:7 --> this.oldProgram.emit --> text", { name, text });
        if (name.endsWith(".map")) {
            sourceMapText = text;
        }
        else {
            outputText = text;
        }
    }, undefined, undefined, this.transformers);

    return {
        code: outputText,
        map: sourceMapText
    }
}