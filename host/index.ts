import ts from "typescript"
import { createProgram } from "./createProgram";
import { EmitFileValueType, emitFileCode } from "./emitFileCode";
import { getCompilerOptions } from "./getCompilerOptions";
import { readFile } from "./readFile";
import { getCacheFileDetails } from "./getCacheFileDetails";
import { getSourceFile } from "./getSourceFile";
import { getCanonicalFileName } from "./getCanonicalFileName";
import { getDefaultLibLocation } from "./getDefaultLibLocation";
import { getDefaultLibFileName } from "./getDefaultLibFileName";
import { getCurrentDirectory } from "./getCurrentDirectory";
import { getSourceFileByPath } from "./getSourceFileByPath";
import { resolveModuleNames } from "./resolveModuleNames";
import { getTsConfigFilePath } from "./getConfigFilePath";
import { emitFileIfChanged } from "./emitFileIfChanged";


export interface HostOptions {
    options?: ts.CompilerOptions
    tsConfigPath?: string
    transformers?: ts.CustomTransformers
}

export class CustomCompilerHost {
    fileCache = new Map<string, {
        sourceFile: ts.SourceFile | undefined,
        code: string | undefined
        modules: (ts.ResolvedModule | undefined)[] | undefined,
        emitFileValue: EmitFileValueType | undefined
    }>()
    defaultCompilerOptions?: ts.CompilerOptions
    defaultTsConfigPath?: string
    tsConfigPath: string
    transformers?: ts.CustomTransformers
    configFileOptions: ts.ParsedCommandLine
    oldProgram: ts.Program
    newLine = ts.sys.newLine
    rootNames: string[] = []
    constructor(hostOptions: HostOptions, rootNames: string[] = []) {
        this.rootNames = rootNames
        this.defaultTsConfigPath = hostOptions.tsConfigPath
        this.defaultCompilerOptions = hostOptions.options
        this.transformers = hostOptions.transformers
        this.tsConfigPath = this.getTsConfigFilePath()
        this.configFileOptions = this.getCompilerOptions()
        this.oldProgram = this.createProgram()
    }
    getSourceFile = getSourceFile
    getSourceFileByPath = getSourceFileByPath
    getCacheFileDetails = getCacheFileDetails
    readFile = readFile
    emitFileIfChanged = emitFileIfChanged
    writeFile(fileName: string) {
        // console.log("🚀 --> file:EEEEEEEEE --> fileName", fileName);

    }
    readDirectory = ts.sys.readDirectory.bind(ts.sys)
    getCanonicalFileName = getCanonicalFileName
    getDefaultLibLocation = getDefaultLibLocation
    getDefaultLibFileName = getDefaultLibFileName
    useCaseSensitiveFileNames() {
        return ts.sys.useCaseSensitiveFileNames;
    }
    getNewLine() {
        return this.newLine
    }
    getCurrentDirectory = getCurrentDirectory
    fileExists(fileName: string) {
        return this.fileCache.has(fileName) || ts.sys.fileExists(fileName);
    }
    getTsConfigFilePath = getTsConfigFilePath
    resolveModuleNames = resolveModuleNames
    getCompilerOptions = getCompilerOptions
    emitFileCode = emitFileCode
    createProgram = createProgram
}