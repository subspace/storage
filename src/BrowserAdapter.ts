import * as browser_storage from 'localforage'
import IAdapter from "./IAdapter";

export default class BrowserAdapter implements IAdapter {
  public async put(key: string, value: object) {
    await browser_storage.setItem(key, value)
  }

  public get(key: string): Promise<object|null> {
    return browser_storage.getItem(key)
  }

  public del(key: string): Promise<void> {
    return browser_storage.removeItem(key)
  }

  public getKeys(): Promise<string[]> {
    return browser_storage.keys()
  }

  public getLength(): Promise<number> {
    return browser_storage.length()
  }

  public clear(): Promise<void> {
    return browser_storage.clear()
  }
}
