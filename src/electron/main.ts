import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("openFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
  return null;
});
ipcMain.handle("saveFile", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({});
  if (!canceled) {
    return filePath;
  }
  return null;
});
ipcMain.handle("readFile", async (e, file: string) => {
  return readFile(file).then((v) => v.toString());
});
ipcMain.on("writeFile", async (e, file: string, content: string) => {
  writeFile(file, content);
});
