# Simple Youtube Video Downloader

Terminal based program run using node.js written in typescript, bulk of effort is used using npm packages to gather youtube urls and download. 

This program is essentially a simple interface for using these libraries.

Application function is to **download mp3 or mp4** of given **public url of playlist or video** to local machine.

-----
### **How To**:

* **Compile**:
  * Download package dependencies locally using the following command.
  ```
  npm install
  ```
  * If the js folder is empty, from the parent folder run using the following command to compile ts into js.
  ```
  tsc -p ./tsconfig.json
  // tsc -w // Auto compiles after each change
  ```
* **Use**:
  * Run program by using following command from home directory. 
  ```
  //for playlists
  node ./code/js/youtube-downloader.js -playlist "playlistURL" fileType directoryPath

  //for single video
  node ./code/js/youtube-downloader.js -video    "videoURL"    fileType directoryPath 
  
  //Example -> node main.js -playlist "https://www.youtube.com/playlist?list=PLLgjzmK8avG9IDl2v1gJ2nT_teRuskqH9" mp4 playlist
  ```
  * **Folder structure** starts in pre-made "youtube-downloads" folder. Given directory path such as "./dir1/dir2" will create recursively the folder structure if it does not already exist and download files into "./youtube-downloads/dir1/dir".

  * Be aware that **files that already exist** in the given url **will be overwritten** if contain the same file name as generated video(s).
-----
### **Bugs**:
  * Error was found using a dependent library when attempting to retreive urls from a playlist, playlists that are over 100 videos throw a exception. A possible workaround is creating helper functions to use instead of library, using cheerio to retrieve the urls instead. The owner of the library has been notified of the found issue.

### **TODOs**:
  * Create Webpage for convience to download as ZIP once finished with Udemy Angular course.