
import ts from "typescript"
import { CustomCompilerHost } from "./host/"
import { PluginContext, } from "rollup"
export interface Options {
    options?: ts.CompilerOptions
    name?: string | "typescript"
    test?: RegExp
    transforms?: ts.CustomTransformers
}
const createPlugin = (options: Options = {}) => {
    let workerHost: CustomCompilerHost | undefined
    // const logger = createLogger();
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
        transform(this: PluginContext, code: string, fileName: string) {
            if (testFileName.test(fileName)) {
                const rootNames: string[] = [fileName];
                const host = getWorkingHost(rootNames);

                if (host.readFile(fileName) != code) {
                    host.fileCache.delete(fileName);
                    host.createProgram(rootNames);
                }
                host.logDiagnostics(this, host.getDiagnostics());
                host.getCacheFileDetails(fileName).code = code;
                const output = host.emitFileCode(fileName);
                // console.log("🚀 --> file: index.ts:39 --> transform --> output", { output });

                return output
            }
        }
    }
}
export { createPlugin, createPlugin as default }