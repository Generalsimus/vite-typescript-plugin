import { CustomCompilerHost } from ".";

export function emitFileIfChanged(this: CustomCompilerHost, fileName: string, code?: string) {
    const currentValue = this.fileCache.get(fileName);


    if (currentValue?.emitFileValue !== undefined) {
        const preCode = currentValue.code;
        currentValue.sourceFile = (currentValue.code = undefined);
        const newCode = code || (code = this.readFile(fileName));
        if (preCode == newCode) {
            return currentValue.emitFileValue
        }
    }

    this.fileCache.delete(fileName);
    const cacheFileDetails = this.getCacheFileDetails(fileName);
    cacheFileDetails.code = code;
    if (currentValue === undefined) {
        this.rootNames = [...new Set([...this.rootNames, fileName])];
    }
    this.createProgram();



    return cacheFileDetails.emitFileValue = this.emitFileCode(fileName);
}