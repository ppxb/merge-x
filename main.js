const { BrowserWindow, app, ipcMain } = require('electron')
const { release } = require('os')
const { join } = require('path')

// disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// Judgement application have got thread lock for single instance
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win

const createWindow = async () => {
  win = new BrowserWindow({
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

  ipcMain.on('close-app', () => win.close())

  ipcMain.on('min-app', () => win.minimize())
}

app.whenReady().then(createWindow)

app.on('activate', () => {
  const wins = BrowserWindow.getAllWindows()
  if (wins.length) wins[0].focus()
  else createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
