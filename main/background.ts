import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { createMenu } from './menu'
import fs from 'fs'

// Set application name for all platforms immediately
app.setName('Cookie Clicker')

// Override the internal Electron app name
// @ts-ignore - this is an internal property but necessary for macOS
app.name = 'Cookie Clicker'
// @ts-ignore - this is an internal property but necessary for macOS
app.setPath('userData', path.join(app.getPath('userData').replace('Electron', 'Cookie Clicker'), 'development'))

const isProd = process.env.NODE_ENV === 'production'

// Get the correct resource path based on environment
const getResourcePath = () => {
  return isProd ? process.resourcesPath : path.join(process.cwd(), 'resources')
}

// Helper to check if file exists
const fileExists = (filePath: string) => {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    console.error(`Error checking file existence: ${err}`)
    return false
  }
}

// Get icon path based on platform
const getIconPath = () => {
  const resourcePath = getResourcePath()
  const iconPath = path.join(resourcePath, process.platform === 'darwin' ? 'icon.icns' : process.platform === 'win32' ? 'icon.ico' : 'cookie.png')
  
  if (!fileExists(iconPath)) {
    console.warn(`Icon not found at path: ${iconPath}`)
    return undefined
  }
  return iconPath
}

// Force set the dock icon for macOS before app is ready
if (process.platform === 'darwin') {
  const iconPath = getIconPath()
  if (iconPath) {
    try {
      app.dock?.setIcon(iconPath)
    } catch (err) {
      console.error(`Failed to set dock icon: ${err}`)
    }
  }
}

if (isProd) {
  serve({ directory: 'app' })
} else {
  // Don't set userData path here anymore as we do it at the top
}

;(async () => {
  await app.whenReady()

  // Create custom menu
  createMenu()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    title: 'Cookie Clicker',
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
