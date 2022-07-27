import * as fs from "fs";
const ytpl = require('ytpl');
import * as readline from "readline";
const ytdl = require('ytdl-core');
const {removeForbiddenCharactersForFileName} = require('./fileHelper.js');

interface PlaylistElement {
    url:string,
    videoName:string
}

interface Streams {
    streamRead: any,
    streamWrite: fs.WriteStream
}
  
async function downloadVideo(PlaylistElement:PlaylistElement, fileType:string, directoryPath:string) {
    PlaylistElement.videoName = await removeForbiddenCharactersForFileName(PlaylistElement.videoName);
    const streams = generateDownloadStreams(directoryPath, PlaylistElement, fileType);
    setupReadStream(streams.streamRead, PlaylistElement);

    return createStreamDownloadPromise(streams.streamWrite);
}

function createStreamDownloadPromise(streamWrite: fs.WriteStream) {
    return new Promise((resolve, reject) => {
        streamWrite.on('finish', resolve);
        streamWrite.on('error', reject);
    });
}

function setupReadStream(stream: any, PlaylistElement: PlaylistElement): void {
    stream.on('start', () => console.log(`\nSTARTED DOWNLOAD " ${PlaylistElement.videoName}`));

    stream.on('progress', (_chunkLength: any, downloaded: number, total: number) => {
        const percent = ((downloaded / total) * 100).toFixed(0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Downloading: ${percent}%`);
    });

    stream.on('end', () => console.log(`\nSUCCESSFULLY DOWNLOADED: ${PlaylistElement.videoName}`));
}

function generateDownloadStreams(directoryPath: string, playlistElement: PlaylistElement, fileType: string): Streams {
    const writeStream = fs.createWriteStream(`${directoryPath}/${playlistElement.videoName}.${fileType}`);
    const configurations = fileType === 'mp3' ? { quality: 'highestvideo', filter: 'videoandaudio' } : { quality: 'highestvideo', filter: 'videoandaudio' };
    const stream = ytdl(playlistElement.url, configurations);
    stream.pipe(writeStream);

    return {streamRead: stream, streamWrite: writeStream};
}

async function getPlaylist(playlistId:string) {return await ytpl(playlistId);}

export async function downloadPlaylistViaUrl(url:string, fileType:string, directoryPath:string) {
    const playlistId = url.split("www.youtube.com/playlist?list=")[1];
    getPlaylist(playlistId).then(async (data) => {
        console.log("\nPLAYLIST DOWNLOAD: STARTED");
        for(let i = 0; i < data.items.length; i++) {
            await downloadVideo({url:data.items[i].id, videoName:data.items[i].title}, fileType, directoryPath)
        }
        console.log("\nPLAYLIST DOWNLOAD: COMPLETE");
    });
}

export async function downloadVideoViaUrl(videoUrl:string, fileType:string, directoryPath:string) {
    const videoObj = await ytdl.getInfo(videoUrl);
    const videoName = videoObj.videoDetails.title;

    downloadVideo({url:videoUrl, videoName:videoName}, fileType, directoryPath);
}