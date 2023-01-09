import ts from "typescript"
import { CustomCompilerHost } from "./";



export function getCompilerOptions(this: CustomCompilerHost): ts.ParsedCommandLine {
    const configFile = ts.readConfigFile(this.tsConfigPath, ts.sys.readFile);
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
        options: { ...compilerOptions.options, ...(this.defaultCompilerOptions || {}) },
        errors: errors
    }
}
