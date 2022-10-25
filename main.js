const { app, BrowserWindow, Menu } = require('electron')

// Set the environment
process.env.NODE_ENV = 'dev'

// Var for easily checking if in dev
const isDev = process.env.NODE_ENV !== 'prod' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Performance Monitor',
        width: 1080,
        height: 1920,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    // Open Dev Tools if Dev env
    if (isDev) mainWindow.webContents.openDevTools()

    // load index.html
    mainWindow.loadFile('./app/index.html')
}

app.on('ready', () => {
    createMainWindow()
})

app.on('window-all-closed', () => {
    if (!isMac) app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})

app.allowRendererProcessReuse = true