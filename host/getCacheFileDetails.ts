import { CustomCompilerHost } from "./";

export function getCacheFileDetails(this: CustomCompilerHost, fileName: string) {
    let fileDetail = this.fileCache.get(fileName)
    if (fileDetail === undefined) {
        this.fileCache.set(fileName, fileDetail = {
            sourceFile: undefined,
            code: undefined,
            modules: undefined
        })
    }
    return fileDetail
}