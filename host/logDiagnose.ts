
import ts from "typescript"
import { CustomCompilerHost } from ".";
import { PluginContext, RollupError } from "rollup";

export function logDiagnose(this: CustomCompilerHost, vitePluginContext: PluginContext, diagnostics: readonly ts.Diagnostic[]) {
    if (diagnostics.length !== 0) {
        const error: RollupError = {
            message: this.newLine + ts.formatDiagnosticsWithColorAndContext(diagnostics, this),
            pluginCode: "KIX"
        };

        vitePluginContext.error(error);


    }
};