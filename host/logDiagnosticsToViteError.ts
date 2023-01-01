
import ts from "typescript"
import { CustomCompilerHost } from "./";


export function logDiagnosticsToViteError(this: CustomCompilerHost, vitePluginContext: any, diagnostics: ts.Diagnostic[]) {
    for (const diagnostic of diagnostics) {
        const errorMessage = "TS" + diagnostic.code + ": " + ts.flattenDiagnosticMessageText(diagnostic.messageText, this.newLine)
        const code = diagnostic.file?.text
        const start = diagnostic.start
        let position: number | undefined
        if (code !== undefined && start !== undefined) {
            position = (code.length - 1) - start
        }

        switch (diagnostic.category) {
            case ts.DiagnosticCategory.Suggestion:
            case ts.DiagnosticCategory.Message:
            case ts.DiagnosticCategory.Warning:
                vitePluginContext.warn({
                    message: errorMessage,
                    code: code
                }, position)
                break
            case ts.DiagnosticCategory.Error:
                vitePluginContext.error({
                    message: errorMessage,
                    code: code
                }, position)
                break
        }

    }
};