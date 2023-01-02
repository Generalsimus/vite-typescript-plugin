import { CustomCompilerHost } from ".";
import ts from "typescript"


export function getSourceFileByPath(this: CustomCompilerHost, fileName: string, path: ts.Path, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {

    return this.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
}