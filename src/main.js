const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        show: false, // Don't show immediately to avoid visual glitches
        webPreferences: {
            // Enable these for F11 fullscreen to work properly
            enablePreferredSizeMode: true,
            fullscreenable: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadFile("src/index.html");
    mainWindow.maximize();
    mainWindow.show();
    
    // Enable F11 fullscreen toggle
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F11') {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
            event.preventDefault();
        }
    });
};

app.whenReady().then(createWindow);