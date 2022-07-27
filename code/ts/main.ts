const {downloadPlaylistViaUrl, downloadVideoViaUrl} = require('./youtube-downloader.js');
const {createDirectory, removeForbiddenCharactersForFileName} = require('./fileHelper.js');


function getErrorMessageOnValidFlag() {
    return "Error: Did not include valid flag.\n" +
           "node main.js -playlist playlistURL fileType directoryName\n" +
           "node main.js -video    videoURL    fileType directoryName\n";

}

function getErrorMessageOnArgumentNum() {
    return "Error: Invalid Number of arguments\n" +
           "OPTIONS:\n" +
           "node main.js -playlist playlistURL fileType directoryPath\n" +
           "node main.js -video    videoURL    fileType directoryPath\n"
}

async function downloadVideos(myArgs: string[]) {
    const flag      = myArgs[0];
    const url       = myArgs[1];
    const fileType  = myArgs[2];
    const directoryPath = `./youtube-downloads/${await removeForbiddenCharactersForFileName(myArgs[3])}`;

    createDirectory(directoryPath);
    downloadVideosViaFlag(flag, url, fileType, directoryPath);
}

function downloadVideosViaFlag(flag: string, url: string, fileType: string, directory: string) {
    switch(flag) {
        case '-playlist':
            downloadPlaylistViaUrl(url, fileType, directory);
            break;
        case '-video':
            downloadVideoViaUrl(url, fileType, directory);
            break;
        default:
            console.log(getErrorMessageOnValidFlag());
    }     
}

async function main() {
    const myArgs = process.argv.slice(2);
    if(myArgs.length != 4) {
        console.log(getErrorMessageOnArgumentNum());
    } else {
        await downloadVideos(myArgs);
    }
}

main();