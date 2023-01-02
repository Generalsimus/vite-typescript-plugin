import ts from "typescript"
import { CustomCompilerHost } from "./";
import path from "path"

export function getCompilerOptions(this: CustomCompilerHost): ts.ParsedCommandLine {
    let configFileName = ts.findConfigFile(
        this.getCurrentDirectory(),
        (fileName: string) => this.fileExists(fileName)
    );
    const configFile = ts.readConfigFile(configFileName || "", ts.sys.readFile);

    const compilerOptions = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        "./"
    );

    const errors: ts.Diagnostic[] = [...compilerOptions.errors]
    if (configFile.error) {
        errors.push(configFile.error)
    }
    return {
        ...compilerOptions,
        options: { ...compilerOptions.options, ...(this.defaultCompilerOptions || {}) },
        errors: errors
    }
}