import ts from "typescript"
import path from "path"
import { CustomCompilerHost } from ".";

export function getDefaultLibLocation(this: CustomCompilerHost) {
    return path.dirname(ts.sys.getExecutingFilePath());
}