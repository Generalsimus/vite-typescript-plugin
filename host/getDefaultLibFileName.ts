import ts from "typescript"
import path from "path"
import { CustomCompilerHost } from "."


export function getDefaultLibFileName(this: CustomCompilerHost, options: ts.CompilerOptions) {
    return path.join(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options))
}