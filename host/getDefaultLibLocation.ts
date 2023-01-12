import ts from "typescript"
import path from "path"
import { CustomCompilerHost } from "./";
import { normalizePath } from "./utils/normalizePath";


const executingFilePath = normalizePath(path.dirname(ts.sys.getExecutingFilePath()));

export function getDefaultLibLocation(this: CustomCompilerHost) {
    return executingFilePath
}