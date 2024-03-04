import { contextBridge, ipcRenderer } from "electron";

const api = {
  openFile: () => ipcRenderer.invoke("command:openFile"),
  saveFile: () => ipcRenderer.invoke("command:saveFile"),
  readFile: (file: string) => ipcRenderer.invoke("command:readFile", file),
  writeFile: (file: string, content: string) =>
    ipcRenderer.send("command:writeFile", file, content),
  onOpenFile: (callback: (file: string) => Promise<void>) =>
    ipcRenderer.on("event:openFile", (e, v) => callback(v)),
  onSaveFile: (callback: (file: string) => Promise<void>) =>
    ipcRenderer.on("event:saveFile", (e, v) => callback(v)),
};

contextBridge.exposeInMainWorld("api", api);

export type ApiType = typeof api;
