const { BrowserWindow, app } = require('electron')
const { join } = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1336,
    height: 768,
    resizable: false,
    show: false,
    frame: false,
    backgroundColor: '#0F0F0F',
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  //   win.loadFile('dist/index.html')
  win.once('ready-to-show', () => win.show())
  win.loadURL('http://localhost:3000')
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
