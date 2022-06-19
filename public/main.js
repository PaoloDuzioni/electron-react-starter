const {
    app,
    BrowserWindow,
    desktopCapturer,
    ipcMain,
    screen,
    globalShortcut,
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');

// TODO: remove in before deploy
// Reload electron window when chancing main or renderer process
require('electron-reloader')(module);

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const mainWindow = new BrowserWindow({
        frame: false,
        width: 800,
        height: height,
        x: width - 800,
        y: 0,
        useContentSize: true,
        backgroundColor: '#212431',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    // TODO: remove in before deploy
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Event sent by preload.js
    ipcMain.on('set-size', (event, isFull) => {
        try {
            mainWindow.setFullScreen(isFull);
        } catch (error) {
            console.log(error);
        }
    });

    mainWindow.on('ready-to-show', () => {
        // Get native infos and pass it to preload
        desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
            for (const source of sources) {
                if (source.name === 'Screen 1') {
                    mainWindow.webContents.send('SET_SOURCE_ID', source.id);
                    return;
                }
            }
        });

        // GLOBAL KEYBOARD SHORTCUTS
        globalShortcut.register('CommandOrControl+H', () => {
            console.log('CommandOrControl+H is pressed');
            mainWindow.webContents.send('DISPLAY_HELP');
        });
    });
}

app.whenReady()
    .then(() => {
        // TODO: REACT DEVTOOLS - remove in before deploy
        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));

        // TEST API CALL with net
        // const { net } = require('electron');
        // const request = net.request(
        //     'https://jsonplaceholder.typicode.com/posts'
        // );
        // request.on('response', response => {
        //     // console.log(`STATUS: ${response.statusCode}`);
        //     response.on('data', chunk => {
        //         console.log(`BODY: ${chunk}`);
        //     });
        // });
        // request.end();
    })
    .then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
