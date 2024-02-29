import { ApiType } from "./preload";

declare global {
  interface Window {
    api: ApiType;
  }
}

export {};
