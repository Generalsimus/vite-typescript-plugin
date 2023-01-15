
import ts from "typescript"
import { CustomCompilerHost, HostOptions } from "./host"
import path from "path"
import { PluginOption } from "vite"
import fs from "fs"
import { normalizePath } from "./host/utils/normalizePath"
import { PluginContext, RollupError } from "rollup"

export interface Options extends HostOptions {
    name?: string | "typescript"
    test?: RegExp
}
const createPlugin = (options: Options = {}): PluginOption => {
    const name = options.name || "typescript";
    const testFileName = options.test || /\.(((t|j)sx?)|json)$/i;
    const emitOuterFiles: ReturnType<CustomCompilerHost["emitFileCode"]>["emitFiles"] = {};
    let workerHost = new CustomCompilerHost(options);
    const logDiagnose = (vitePluginContext: PluginContext, diagnostics: readonly ts.Diagnostic[]) => {
        if (diagnostics.length !== 0) {
            const error: RollupError = {
                message: workerHost.newLine + ts.formatDiagnosticsWithColorAndContext(diagnostics, workerHost),
                pluginCode: "KIX"
            };

            vitePluginContext.error(error);

        }
    };

    return {
        name: name,
        configureServer(server) {
            if (fs.existsSync(workerHost.tsConfigPath)) {
                fs.watch(workerHost.tsConfigPath, () => {
                    workerHost.fileCache.clear();
                    workerHost.tsConfigPath = workerHost.getTsConfigFilePath();
                    workerHost.configFileOptions = workerHost.getCompilerOptions();
                });
            }
            server.watcher.on('unlink', (path) => {
                workerHost.fileCache.delete(normalizePath(path))
            });
        },
        transform(code, id, options) {
            const fileName = normalizePath(id);
            if (testFileName.test(fileName)) {
                const output = workerHost.emitFileIfChanged(fileName, code);
                if (output.diagnostics.length !== 0) {
                    logDiagnose(this, output.diagnostics);
                }
                if (!this.meta.watchMode) {
                    Object.assign(emitOuterFiles, output.emitFiles);
                }
                return output
            }

            return {
                code: code
            }
        },
        generateBundle(outputOptions) {
            if (outputOptions.dir) {
                for (const emitFilePath in emitOuterFiles) {
                    this.emitFile({
                        fileName: path.relative(outputOptions.dir, emitFilePath),
                        source: emitOuterFiles[emitFilePath],
                        type: 'asset'
                    })
                }
            }
        }
    }
}
export * from "./host"
export { createPlugin, createPlugin as default }