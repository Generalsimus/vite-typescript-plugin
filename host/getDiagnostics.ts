import { CustomCompilerHost } from "./";

export function getDiagnostics(this: CustomCompilerHost) {
    return [
        // ...this.configFileParsingDiagnostics,
        // ...this.oldProgram.getOptionsDiagnostics(),
        ...this.oldProgram.getGlobalDiagnostics(),
        ...this.oldProgram.getSyntacticDiagnostics(),
        ...this.oldProgram.getSemanticDiagnostics(),
        ...this.oldProgram.getDeclarationDiagnostics(),
        ...this.configFileOptions.errors
        // ...this.oldProgram.getConfigFileParsingDiagnostics(),
    ]
}