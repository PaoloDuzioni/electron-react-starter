const {
    app,
    BrowserWindow,
    ipcMain,
    screen,
    globalShortcut,
    Menu,
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

const isMac = process.platform === 'darwin';

// App Windows
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

    /***  Events sent by preload.js ***/

    // Fullscreen toggle
    ipcMain.on('set-size', (event, isFull) => {
        try {
            mainWindow.setFullScreen(isFull);
        } catch (error) {
            console.log(error);
        }
    });

    // Show main menu
    ipcMain.on('show-menu', event => {
        const template = [
            {
                label: 'Hide Menu',
            },
            { type: 'separator' },
            {
                label: 'Settings',
                accelerator: 'CommandOrControl+S',
                click: () => {
                    console.log('Show settings');
                },
            },
            { type: 'separator' },
            {
                label: 'Help',
                accelerator: 'CommandOrControl+H',
                click: () => {
                    mainWindow.webContents.send('DISPLAY_HELP');
                },
            },
            { type: 'separator' },
            {
                label: 'Quit',
                role: isMac ? 'close' : 'quit',
            },
        ];
        const menu = Menu.buildFromTemplate(template);

        menu.popup({
            x: 0,
            y: 0,
        });
    });

    // GLOBAL KEYBOARD SHORTCUTS
    globalShortcut.register('CommandOrControl+H', () => {
        console.log('CommandOrControl+H is pressed');
        mainWindow.webContents.send('DISPLAY_HELP');
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
    .then(() => {
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });

        createWindow();
    });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (isMac) app.quit();
});
