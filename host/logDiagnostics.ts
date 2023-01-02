
import ts from "typescript"
import { CustomCompilerHost } from ".";
import { PluginContext, RollupError } from "rollup";

export function logDiagnostics(this: CustomCompilerHost, vitePluginContext: PluginContext, diagnostics: ts.Diagnostic[]) {
    if (diagnostics.length !== 0) {
        const error: RollupError = {
            message: this.newLine + ts.formatDiagnosticsWithColorAndContext(diagnostics, this),
            pluginCode: "pluginCode"
        }
        vitePluginContext.error(error);

    }
};