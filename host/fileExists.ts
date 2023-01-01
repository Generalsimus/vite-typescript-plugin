import ts from "typescript"
import { CustomCompilerHost } from "./";

export function fileExists(this: CustomCompilerHost, fileName: string) { return this.fileCache.has(fileName) || ts.sys.fileExists(fileName); }