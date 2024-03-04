import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createMenu = () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "Open",
            accelerator: "CommandOrControl+O",
            click: async (item, window) => {
              window.webContents.send("event:openFile");
            },
          },
          {
            label: "Save",
            accelerator: "CommandOrControl+S",
            click: async (item, window) => {
              window.webContents.send("event:saveFile");
            },
          },
          {
            role: "quit",
          },
        ],
      },
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { type: "separator" },
          { role: "selectAll" },
        ],
      },
      {
        label: "View",
        submenu: [
          { role: "reload" },
          { role: "toggleDevTools" },
          { type: "separator" },
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" },
        ],
      },
      {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "close" }],
      },
    ]),
  );
};

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

app.whenReady().then(createMenu).then(createWindow);
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
ipcMain.handle("command:openFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
  return null;
});
ipcMain.handle("command:saveFile", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({});
  if (!canceled) {
    return filePath;
  }
  return null;
});
ipcMain.handle("command:readFile", async (e, file: string) => {
  return readFile(file).then((v) => v.toString());
});
ipcMain.on("command:writeFile", async (e, file: string, content: string) => {
  writeFile(file, content);
});
