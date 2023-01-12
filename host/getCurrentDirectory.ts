import { normalizePath } from "./utils/normalizePath";

const processDirectory = normalizePath(process.cwd());

export function getCurrentDirectory() { return processDirectory }