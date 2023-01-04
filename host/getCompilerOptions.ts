import ts from "typescript"
import { CustomCompilerHost } from "./";
import path from "path"
import { normalizePath } from "../utils/normalizePath";

export function getCompilerOptions(this: CustomCompilerHost): ts.ParsedCommandLine {
    let configFileName = this.defaultTsConfigPath || ts.findConfigFile(
        this.getCurrentDirectory(),
        (fileName: string) => this.fileExists(fileName)
    );

    const configFile = ts.readConfigFile(normalizePath(configFileName || ""), ts.sys.readFile);


    const compilerOptions = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        this.getCurrentDirectory()
    )


    const errors: ts.Diagnostic[] = [...compilerOptions.errors]
    if (configFile.error) {
        errors.push(configFile.error)
    }
    return {
        ...compilerOptions,
        options: { ...compilerOptions.options, ...this.defaultCompilerOptions },
        errors: errors
    }
}