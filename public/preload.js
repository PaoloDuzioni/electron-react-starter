const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // show / hide custom menu on meni icon click
    showMenu: () => ipcRenderer.send('show-menu'),
    // send event to main
    setFullScreen: isFull => ipcRenderer.send('set-size', isFull),
    // detect global keyword shortcut
    detectHelpShortcut: callback => ipcRenderer.on('DISPLAY_HELP', callback),
});
