import ts from "typescript"
import { CustomCompilerHost } from "./";

export function getSourceFile(this: CustomCompilerHost, fileName: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
    let sourceFileDetails = this.getCacheFileDetails(fileName);
    if (sourceFileDetails.sourceFile === undefined || shouldCreateNewSourceFile) {
        let text: string | undefined;
        try {
            text = this.readFile(fileName)
            if (text) {
                return (sourceFileDetails.sourceFile = ts.createSourceFile(fileName, text, languageVersionOrOptions, true))
            }
        } catch (e: any) {
            if (onError) {
                onError(e.message);
            }
        }
        return ts.createSourceFile(fileName, "", languageVersionOrOptions, true)
    }
    return sourceFileDetails.sourceFile
}  