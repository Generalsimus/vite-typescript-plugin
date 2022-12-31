
import ts from "typescript"
import { CustomCompilerHost } from "./host"

export interface Options {
    options: ts.CompilerOptions
    name: string | "typescript"
    test: RegExp
    transforms: ts.CustomTransformers
    assignPluginOptions: object
}
export const createPlugin = (options: Options) => {
    let workerHost: CustomCompilerHost | undefined
    const getWorkingHost = (rootFiles: string[]) => {
        if (workerHost === undefined) {
            workerHost = new CustomCompilerHost(options.transforms, options.options, rootFiles)
        }
        return workerHost
    }
    const testFileName = options.test || /.(([tj]sx?)|json)$/i
    return {
        name: options.name,
        transform(code: string, fileName: string) {
            if (!(testFileName.test(fileName))) {
                return
            }
            const rootNames: string[] = [fileName]
            const host = getWorkingHost(rootNames)

            if (!host.fileCache.has(fileName)) {
                host.createProgram(rootNames)
            }
            host.fileCache.delete(fileName);

            host.getCacheFileDetails(fileName).code = code

            host.logDiagnosticsToViteError(this, host.getDiagnostics())
            return host.emitFileCode(fileName)
        },
        ...options.assignPluginOptions
    }
}

// "main": "./web/index.js",

// "repository": {
//   "type": "git",
//   "url": "git+https://github.com/Generalsimus/KIX.git"
// },
// "homepage": "https://kixjs.ml/",