"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var youtube_playlist_scraper_1 = __importDefault(require("youtube-playlist-scraper"));
var readline = __importStar(require("readline"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
function downloadPlaylistViaUrl(url, fileType, directoryPath) {
    return __awaiter(this, void 0, void 0, function () {
        var playlistId;
        var _this = this;
        return __generator(this, function (_a) {
            playlistId = url.split("www.youtube.com/playlist?list=")[1];
            getPlaylist(playlistId).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("\nPLAYLIST DOWNLOAD: STARTED");
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < data.playlist.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, downloadVideoByObj({ url: data.playlist[i].id, videoName: data.playlist[i].name }, fileType, directoryPath)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            console.log("\nPLAYLIST DOWNLOAD: COMPLETE");
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function downloadVideo(url, videoName, fileType, directoryPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, downloadVideoByObj({ "url": url, "videoName": videoName }, fileType, directoryPath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeForbiddenCharactersForFileName(videoName) {
    return __awaiter(this, void 0, void 0, function () {
        var forbiddenCharactersInFileNameArr, originalVideoName;
        return __generator(this, function (_a) {
            forbiddenCharactersInFileNameArr = ["<", ">", ":", "\"", "/", "\\", "|", "?", "*", "."];
            originalVideoName = videoName;
            forbiddenCharactersInFileNameArr.forEach(function (letter) {
                while (videoName.includes(letter)) {
                    console.log("\nVideo with name \"" + originalVideoName + "\" contains invalid character \"" + letter + "\", replacing with \"_\"");
                    videoName = videoName.replace(letter, "_");
                }
            });
            return [2 /*return*/, videoName];
        });
    });
}
function downloadVideoByObj(PlaylistElement, fileType, directoryPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, stream, writeStream, writeStream;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = PlaylistElement;
                    return [4 /*yield*/, removeForbiddenCharactersForFileName(PlaylistElement.videoName)];
                case 1:
                    _a.videoName = _b.sent();
                    if (fileType === 'mp3') {
                        writeStream = fs.createWriteStream(directoryPath + "/" + PlaylistElement.videoName + ".mp3");
                        console.log("\nSTARTED DOWNLOAD: \" " + PlaylistElement.videoName);
                        stream = ytdl_core_1.default(PlaylistElement.url, { highWaterMark: 1 << 25, filter: 'audioonly' });
                        stream.pipe(writeStream);
                    }
                    else {
                        writeStream = fs.createWriteStream(directoryPath + "/" + PlaylistElement.videoName + ".mp4");
                        console.log("\nSTARTED DOWNLOAD \" " + PlaylistElement.videoName);
                        stream = ytdl_core_1.default(PlaylistElement.url, { quality: 'highestvideo', filter: 'videoandaudio' });
                        stream.pipe(writeStream);
                    }
                    stream.on('progress', function (chunkLength, downloaded, total) {
                        var percent = ((downloaded / total) * 100).toFixed(0);
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write("Downloading: " + percent + "%");
                    });
                    stream.on('end', function () { return console.log("\nSUCCESSFULLY DOWNLOADED: " + PlaylistElement.videoName); });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            writeStream.on('finish', resolve);
                            writeStream.on('error', reject);
                        })];
            }
        });
    });
}
function getPlaylist(playlistId) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, youtube_playlist_scraper_1.default(playlistId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var myArgs, flag, url, fileType, directory, _a, _b, videoObj, videoTitle;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    myArgs = process.argv.slice(2);
                    if (!(myArgs.length != 4)) return [3 /*break*/, 1];
                    console.log("\nError: Invalid Number of arguments");
                    console.log("\nOPTIONS:");
                    console.log("node youtube-downloader.js -playlist playlistURL fileType directoryPath");
                    console.log("node youtube-downloader.js -video    videoURL    fileType directoryPath\n");
                    return [3 /*break*/, 7];
                case 1:
                    flag = myArgs[0];
                    url = myArgs[1];
                    fileType = myArgs[2];
                    _a = "./youtube-downloads/";
                    return [4 /*yield*/, removeForbiddenCharactersForFileName(myArgs[3])];
                case 2:
                    directory = _a + (_c.sent());
                    if (!fs.existsSync(directory)) {
                        fs.mkdirSync(directory, { recursive: true });
                    }
                    _b = flag;
                    switch (_b) {
                        case '-playlist': return [3 /*break*/, 3];
                        case '-video': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 3:
                    downloadPlaylistViaUrl(url, fileType, directory);
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, ytdl_core_1.default.getInfo(url)];
                case 5:
                    videoObj = _c.sent();
                    videoTitle = videoObj.videoDetails.title;
                    downloadVideo(url, videoTitle, fileType, directory);
                    return [3 /*break*/, 7];
                case 6:
                    console.log("Error: Did not include valid flag.");
                    console.log("node youtube-downloader.js -playlist playlistURL fileType directoryName");
                    console.log("node youtube-downloader.js -video    videoURL fileType directoryName");
                    _c.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
main();
