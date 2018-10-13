import IAdapter from "./IAdapter"
// TODO: Fix typings here
// @ts-ignore
import * as node_storage from 'node-persist' // TODO: Should work with an instance instead of global state
import * as os from 'os'

export default class NodeAdapter implements IAdapter {
  private readonly readyPromise: Promise<void>

  public constructor() {
    try {
      this.readyPromise = this.init()
    } catch (error) {
      // TODO: Something better than printing an error is needed here
      console.error('Error initiating node storage')
      console.error(error)
    }
  }
  private async init() {
    const options: object = {
      dir: `${os.homedir()}/subspace_data`,
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf-8',
      logging: false,
      ttl: false, // true for 24 hours or number in ms
      expiredInterval: 2 * 60 * 1000 // every two minutes
    }
    await node_storage.init(options)
  }
  public async put(key: string, value: object): Promise<void> {
    await this.readyPromise
    await node_storage.setItem(key, value)
  }
  public async get(key: string): Promise<object> {
    await this.readyPromise
    return await node_storage.getItem(key)
  }
  public async del(key:string): Promise<void> {
    await this.readyPromise
    await node_storage.removeItem(key)
  }
  public async getKeys(): Promise<string[]> {
    await this.readyPromise
    return await node_storage.keys()
  }
  public async getLength(): Promise<number> {
    await this.readyPromise
    return await node_storage.length()
  }
  public async clear(): Promise<void> {
    await this.readyPromise
    await node_storage.clear()
  }
}
