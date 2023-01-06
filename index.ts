
import ts from "typescript"
import { CustomCompilerHost, HostOptions } from "./host/"
import path from "path"
import { PluginOption } from "vite"
import fs from "fs"
import { normalizePath } from "./utils/normalizePath"

export interface Options extends HostOptions {
    name?: string | "typescript"
    test?: RegExp
}
const createPlugin = (options: Options = {}): PluginOption => {
    let workerHost = new CustomCompilerHost(options)

    const name = options.name || "typescript"
    const testFileName = options.test || /\.(((t|j)sx?)|json)$/i
    const emitOuterFiles: ReturnType<CustomCompilerHost["emitFileCode"]>["emitFiles"] = {}
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
        load(id: string) {
            const fileName = normalizePath(id);

            if (testFileName.test(fileName)) {
                workerHost.fileCache.delete(fileName);
                workerHost.createProgram([fileName]);
                const output = workerHost.emitFileCode(fileName);
                if (output.diagnostics.length !== 0) {
                    workerHost.logDiagnose(this, output.diagnostics);
                }
                if (!this.meta.watchMode) {
                    Object.assign(emitOuterFiles, output.emitFiles);
                }
                return output
            }

            return null
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
export { createPlugin, createPlugin as default }