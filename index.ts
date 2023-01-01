
import ts from "typescript"
import { CustomCompilerHost } from "./host/"

export interface Options {
    options?: ts.CompilerOptions
    name?: string | "typescript"
    test?: RegExp
    transforms?: ts.CustomTransformers
}
const createPlugin = (options: Options = {}) => {
    let workerHost: CustomCompilerHost | undefined
    const getWorkingHost = (rootFiles: string[]) => {
        if (workerHost === undefined) {
            workerHost = new CustomCompilerHost(options.transforms, options.options, rootFiles)
        }
        return workerHost
    }
    const name = options.name || "typescript"
    const testFileName = options.test || /\.(((t|j)sx?)|json)$/i
    return {
        name: name,
        transform(code: string, fileName: string) {
            if (testFileName.test(fileName)) {
                const rootNames: string[] = [fileName];
                const host = getWorkingHost(rootNames);

                if (!host.fileCache.has(fileName)) {
                    host.createProgram([fileName]);
                }
                host.fileCache.delete(fileName);

                host.logDiagnosticsToViteError(this, host.getDiagnostics());
                host.getCacheFileDetails(fileName).code = code;

                return host.emitFileCode(fileName);
            }
        }
    }
}
export { createPlugin, createPlugin as default }