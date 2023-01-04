
import path from "path"

export const normalizePath = (fileName: string) => {
    return fileName.split(path.win32.sep).join(path.posix.sep);
}