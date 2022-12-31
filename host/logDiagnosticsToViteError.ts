
import ts from "typescript"
import { CustomCompilerHost } from "."


export function logDiagnosticsToViteError(this: CustomCompilerHost, vitePluginContext: any, diagnostics: ts.Diagnostic[]) {

    for (const diagnostic of diagnostics) {
        const errorMessage = this.getDiagnosticToViteErrorText(diagnostic)
        const code = diagnostic.code + ""
        const start = diagnostic.start
        switch (diagnostic.category) {
            case ts.DiagnosticCategory.Suggestion:
            case ts.DiagnosticCategory.Message:
            case ts.DiagnosticCategory.Warning:
                vitePluginContext.warn({
                    message: errorMessage,
                    code: code
                }, start)
                break
            case ts.DiagnosticCategory.Error:
                vitePluginContext.error({
                    message: errorMessage,
                    code: code
                }, start)
                break
        }

    }

};