const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require ('../server')
require ('../Filereader')

let window;

const createWindow = () => {
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 960,
    minHeight: 500,
    resizable: true,
    maximizable: true,
    title: 'MyFlix'
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, '../', '/build/index.html'),
      protocol: 'file',
      slashes: true
    })
  );

  // Disables windows menubar
  window.setMenu(null);

  // Opens dev tools on start
  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
};

// Calls the createWindow function when the app is ready to create a window
app.on('ready', createWindow);

// macOS specific

// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
