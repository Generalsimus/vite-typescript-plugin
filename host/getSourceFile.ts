import ts from "typescript"
import { CustomCompilerHost } from "./";

export function getSourceFile(this: CustomCompilerHost, fileName: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
    let sourceFileDetails = this.getCacheFileDetails(fileName);
    if (sourceFileDetails.sourceFile === undefined || shouldCreateNewSourceFile) {
        let text;
        try {
            text = this.readFile(fileName)
        } catch (e: any) {
            if (onError) {
                onError(e.message);
            }
        }
        sourceFileDetails.sourceFile = ts.createSourceFile(fileName, text || "", languageVersionOrOptions, true)
    }
    return sourceFileDetails.sourceFile
}