import IAdapter from './IAdapter'
// TODO: Fix typings here
// @ts-ignore
import level from 'level-rocksdb'

export default class RocksAdapter implements IAdapter {
  db: any
  public constructor(root: string) {
    this.db = level(`${root}/spacerocks`, { valueEncoding: 'binary' })
  }
  async put(key: string, value: string): Promise<void> {
    await this.db.put(key, value)
  }
  async get(key: string): Promise<string|null> {
    try {
      return this.db.get(key)
    } catch (error) {
      if (error.notFound) {
        return null
      }
      throw error
    }
  }
  async del(key: string): Promise<void> {
    try {
      await this.db.del(key)
    } catch(error) {
      // Ignore if value already deleted
      if (error.notFound) {
        return
      }
      throw error
    }
  }
  async getKeys(): Promise<string[]> {
    return new Promise<string[]> (async resolve => {
      const keys: string[] = []
      this.db.createKeyStrem()
        .on('data', (key: string) => {
          keys.push(key)
        })
        .on('end', () => {
          resolve(keys)
        })
    })
  }
  async getLength(): Promise<number> {
    const keys = await this.getKeys()
    return keys.length
  }
  async clear(): Promise<void> {
    const keys = await this.getKeys()
    for (const key of keys) {
      await this.del(key);
    }
  }
}
