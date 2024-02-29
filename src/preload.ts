import { contextBridge, ipcRenderer } from "electron";

const api = {
  nodeVersion: () => ipcRenderer.invoke("nodeVersion"),
};

contextBridge.exposeInMainWorld("api", api);

export type ApiType = typeof api;
