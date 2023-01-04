
import ts from "typescript"
import { CustomCompilerHost } from "./host/"
import { PluginContext, Plugin } from "rollup"
import path from "path"
import { FSWatcher, PluginOption } from "vite"
import fs from "fs"
import { fileURLToPath } from 'url'
import resolve from "resolve/sync"
import { normalizePath } from "./utils/normalizePath"
// import { relative, resolve, sep } from 'path';

// import type { Plugin } from 'rollup';
// import { createFilter } from '@rollup/pluginutils';
// import { ESLint } from 'eslint';

// import type { RollupEslintOptions } from '../types';

// function normalizePath(id: string) {
//   return relative(process.cwd(), id).split(sep).join('/');
// }
// function normalizePath(fileName) {
//     return fileName.split(path.win32.sep).join(path.posix.sep);
// }
export interface Options {
    options?: ts.CompilerOptions
    name?: string | "typescript"
    test?: RegExp
    transformers?: ts.CustomTransformers
}
// const createPlugin = (options: Options = {}): Plugin => {
const createPlugin = (options: Options = {}): PluginOption => {
    let workerHost = new CustomCompilerHost(options.transformers, options.options)

    const name = options.name || "typescript"
    const testFileName = options.test || /\.(((t|j)sx?)|json)$/i
    return {
        name: name,
        enforce: 'pre',
        async load(id: string) {
            const fileName = normalizePath(id)

            if (testFileName.test(fileName)) {
                const rootNames = [fileName]

                workerHost.fileCache.delete(fileName);
                workerHost.createProgram(rootNames);

                const output = workerHost.emitFileCode(fileName);

                workerHost.logDiagnostics(this, workerHost.getDiagnostics());

                return output
            }

            return null
        },
    }
}
export { createPlugin, createPlugin as default }