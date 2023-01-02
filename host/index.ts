import ts from "typescript"
import { getDiagnostics } from "./getDiagnostics";
import { createProgram } from "./createProgram";
import { logDiagnostics } from "./logDiagnostics";
import { emitFileCode } from "./emitFileCode";
import { getCompilerOptions } from "./getCompilerOptions";
import { readFile } from "./readFile";
import { getCacheFileDetails } from "./getCacheFileDetails";
import { getSourceFile } from "./getSourceFile";
import { getCanonicalFileName } from "./getCanonicalFileName";
import { getDefaultLibLocation } from "./getDefaultLibLocation";
import { getDefaultLibFileName } from "./getDefaultLibFileName";
import { getCurrentDirectory } from "./getCurrentDirectory";
import { getSourceFileByPath } from "./getSourceFileByPath";



export class CustomCompilerHost {
    fileCache = new Map<string, {
        sourceFile: ts.SourceFile | undefined,
        code: string | undefined
    }>()
    defaultCompilerOptions?: ts.CompilerOptions = {}
    transforms?: ts.CustomTransformers
    configFileOptions: ts.ParsedCommandLine
    oldProgram: ts.Program
    newLine = ts.sys.newLine
    constructor(transforms?: ts.CustomTransformers, defaultCompilerOptions?: ts.CompilerOptions, rootNames: string[] = []) {
        this.transforms = transforms
        this.defaultCompilerOptions = defaultCompilerOptions
        this.configFileOptions = this.getCompilerOptions()
        this.oldProgram = this.createProgram(rootNames)
    }
    getSourceFile = getSourceFile
    getSourceFileByPath = getSourceFileByPath
    getCacheFileDetails = getCacheFileDetails
    readFile = readFile
    writeFile() {
        // fileName: string
    }
    readDirectory = ts.sys.readDirectory.bind(ts.sys)
    getCanonicalFileName = getCanonicalFileName
    getDefaultLibLocation = getDefaultLibLocation
    getDefaultLibFileName = getDefaultLibFileName
    useCaseSensitiveFileNames() { return ts.sys.useCaseSensitiveFileNames; }
    getNewLine() { return this.newLine }
    getCurrentDirectory = getCurrentDirectory
    fileExists(fileName: string) { return this.fileCache.has(fileName) || ts.sys.fileExists(fileName); }
    getCompilerOptions = getCompilerOptions
    emitFileCode = emitFileCode
    createProgram = createProgram
    getDiagnostics = getDiagnostics
    logDiagnostics = logDiagnostics
}