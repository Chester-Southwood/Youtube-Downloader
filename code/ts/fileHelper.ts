import * as fs from "fs";

export function createDirectory(directoryPath: string) {
    const doesDirectoryPathExist = fs.existsSync(directoryPath);

    if (!doesDirectoryPathExist) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log("Created directory for path " + directoryPath);
    } else {
        console.log("Directory path already exists for " + directoryPath);
    }
}

export async function removeForbiddenCharactersForFileName(videoName:string) {
    const forbiddenCharactersInFileNameArr = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*", "."];
    forbiddenCharactersInFileNameArr.forEach((letter) => {
        while(videoName.includes(letter)) {
            videoName = videoName.replace(letter, "_");
        }
    });
    return videoName;
}