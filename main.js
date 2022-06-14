const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1336,
    height: 768,
    resizable: false,
    show: false,
    frame: false,
    backgroundColor: '#0F0F0F',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //   win.loadFile('dist/index.html')
  win.once('ready-to-show', () => win.show())
  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('close-app', e => {
    const webContents = e.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.close()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
