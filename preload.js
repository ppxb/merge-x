const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  closeApp: () => ipcRenderer.send('close-app')
})
