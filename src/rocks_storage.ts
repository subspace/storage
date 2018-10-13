const level = require('level-rocksdb')
import os from 'os'


const db = level(`${os.homedir()}/spacerocks`, { valueEncoding: 'binary' })

export const rocksAdapter = {
  put(key: Buffer, value: Buffer): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        await db.put(key, value)
        resolve()
      }
      catch(error) {
        reject(error)
      }
    })
  },
  get(key: Buffer): Promise<Buffer> {
    // returns null if not found
    return new Promise<Buffer> (async (resolve, reject) => {
      try {
        const value: Buffer = await db.get(key)
        resolve(value)
      }
      catch(error) {
        if (error.notFound) resolve(null)
        reject(error)
      }
    })
  },
  del(key: Buffer): Promise<boolean> {
    // returns true if deleted, and false if not found
    return new Promise<boolean> (async (resolve, reject) => {
      try {
        await db.del(key)
        resolve(true)
      }
      catch(error) {
        if (error.notFound) resolve(false)
        reject(error)
      }
    })
  },
  getKeys(): Promise<string[]> {
    return new Promise<string[]> (async (resolve, reject) => {
      try {
        const keys: string[] = []
        db.createKeyStrem()
          .on('data', (key: Buffer) => {
            keys.push(key.toString('hex'))
          })
          .on('end', () => {
            resolve(keys)
          })
      }
      catch(error) {
        reject(error)
      }
    })
  },
  getLength(): Promise<number> {
    return new Promise<number> (async (resolve, reject) => {
      try {
        const keys = await this.getKeys()
        const length = keys.length
        resolve(length)
      }
      catch(error) {
        reject(error)
      }
    })
  },
  clear(): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        db.createKeyStrem()
          .on('data', async (key: Buffer) => {
            await db.del(key)
          })
          .on('end', () => {
            resolve()
          })
      }
      catch(error) {
        reject(error)
      }
    })
  }
}
