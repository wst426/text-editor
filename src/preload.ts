import { contextBridge, ipcRenderer } from "electron";

const api = {
  openFile: () => ipcRenderer.invoke("openFile"),
  saveFile: () => ipcRenderer.invoke("saveFile"),
  readFile: (file: string) => ipcRenderer.invoke("readFile", file),
  writeFile: (file: string, content: string) =>
    ipcRenderer.send("writeFile", file, content),
};

contextBridge.exposeInMainWorld("api", api);

export type ApiType = typeof api;
