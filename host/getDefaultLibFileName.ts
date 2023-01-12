import ts from "typescript"
import path from "path"
import { CustomCompilerHost } from "./";
import { normalizePath } from "./utils/normalizePath";


export function getDefaultLibFileName(this: CustomCompilerHost, options: ts.CompilerOptions) {
    return normalizePath(path.join(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options)));
}