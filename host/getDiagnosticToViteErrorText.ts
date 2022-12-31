import ts from "typescript"
import { CustomCompilerHost } from "."

export function getDiagnosticToViteErrorText(this: CustomCompilerHost, diagnostic: ts.Diagnostic | ts.DiagnosticMessageChain, errorMessages: string[] = []) {
    if (typeof diagnostic.messageText === "string") {
        errorMessages.push(diagnostic.messageText)
    } else if (diagnostic.messageText.next) {
        diagnostic.messageText.next?.map((item) => this.getDiagnosticToViteErrorText(item, errorMessages))
    }
    return errorMessages.join("\n")
}