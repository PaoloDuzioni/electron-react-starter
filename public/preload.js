const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // get screen data from main
    getScreenId: callback => ipcRenderer.on('SET_SOURCE_ID', callback),
    // send event to main
    setFullScreen: isFull => ipcRenderer.send('set-size', isFull),
    // detect global keyword shortcut
    detectHelpShortcut: callback => ipcRenderer.on('DISPLAY_HELP', callback),
});
