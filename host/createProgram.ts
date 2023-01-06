import { CustomCompilerHost } from "./";
import ts from "typescript"

export function createProgram(this: CustomCompilerHost, rootNames: string[]) {
    return this.oldProgram = ts.createProgram({
        rootNames: rootNames,
        options: this.configFileOptions.options,
        oldProgram: this.oldProgram,
        host: this,
        projectReferences: this.configFileOptions.projectReferences,
        configFileParsingDiagnostics: this.configFileOptions.errors
    });
}