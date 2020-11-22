import * as fs from "fs";
import scrapePlaylist from 'youtube-playlist-scraper';
import * as readline from "readline";
import ytdl from 'ytdl-core';

interface PlaylistElement {
    url:string,
    videoName:string
}

async function downloadPlaylistViaUrl(url:string, fileType:string, directoryPath:string) {
    const playlistId = url.split("www.youtube.com/playlist?list=")[1];
    getPlaylist(playlistId).then(async (data) => {
        console.log("\nPLAYLIST DOWNLOAD: STARTED")
        for(var i = 0; i < data.playlist.length; i++) {
            await downloadVideoByObj({url:data.playlist[i].id, videoName:data.playlist[i].name}, fileType, directoryPath)
        }
        console.log("\nPLAYLIST DOWNLOAD: COMPLETE")
    });
}
  
async function downloadVideo(url:string, videoName:string, fileType:string, directoryPath:string) {
    await downloadVideoByObj({"url": url, "videoName": videoName}, fileType, directoryPath);
}

async function removeForbiddenCharactersForFileName(videoName:string) {
    const forbiddenCharactersInFileNameArr = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*", "."];
    const originalVideoName = videoName;
    forbiddenCharactersInFileNameArr.forEach((letter) => {
        while(videoName.includes(letter)) {
            console.log(`\nVideo with name \"${originalVideoName}\" contains invalid character \"${letter}\", replacing with \"_\"`)
            videoName = videoName.replace(letter, "_");
        }
    });
    return videoName;
}

async function downloadVideoByObj(PlaylistElement:PlaylistElement, fileType:string, directoryPath:string) {
    PlaylistElement.videoName = await removeForbiddenCharactersForFileName(PlaylistElement.videoName);
    var stream;
    if(fileType === 'mp3') {
        var writeStream = fs.createWriteStream(`${directoryPath}/${PlaylistElement.videoName}.mp3`);
        console.log(`\nSTARTED DOWNLOAD: " ${PlaylistElement.videoName}`)
        stream = ytdl(PlaylistElement.url, { highWaterMark: 1 << 25, filter: 'audioonly' });
        stream.pipe(writeStream);
    } else {
        var writeStream = fs.createWriteStream(`${directoryPath}/${PlaylistElement.videoName}.mp4`);
        console.log(`\nSTARTED DOWNLOAD " ${PlaylistElement.videoName}`)
        stream = ytdl(PlaylistElement.url, { quality: 'highestvideo', filter: 'videoandaudio' });
        stream.pipe(writeStream);
    }
    stream.on('progress', (chunkLength, downloaded, total) => {
        let percent = ((downloaded / total) * 100).toFixed(0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Downloading: ${percent}%`);
    });

    stream.on('end', () => console.log(`\nSUCCESSFULLY DOWNLOADED: ${PlaylistElement.videoName}`));
    
    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}
   
async function getPlaylist(playlistId:string) {return await scrapePlaylist(playlistId);}

async function main() {
    var myArgs = process.argv.slice(2);
    if(myArgs.length != 4) {
        console.log("\nError: Invalid Number of arguments");
        console.log("\nOPTIONS:")
        console.log("node youtube-downloader.js -playlist playlistURL fileType directoryPath")
        console.log("node youtube-downloader.js -video    videoURL    fileType directoryPath\n")
    } else {
        const flag      = myArgs[0];
        const url       = myArgs[1];
        const fileType  = myArgs[2];
        const directory = `./youtube-downloads/${await removeForbiddenCharactersForFileName(myArgs[3])}`;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        switch(flag) {
            case '-playlist':
                downloadPlaylistViaUrl(url, fileType, directory);
                break;
            case '-video':
                const videoObj = await ytdl.getInfo(url);
                const videoTitle = videoObj.videoDetails.title;
                downloadVideo(url, videoTitle, fileType, directory);
                break;
            default:
                console.log("Error: Did not include valid flag.");
                console.log("node youtube-downloader.js -playlist playlistURL fileType directoryName");
                console.log("node youtube-downloader.js -video    videoURL fileType directoryName");
        }     
    }
}

main();