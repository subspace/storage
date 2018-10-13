const browser_storage = require('localforage')

export const browserAdapter = {
  put(key: Buffer, value: Buffer): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        await browser_storage.setItem(key, value)
        resolve()
      }
      catch(error) {
        reject(error)
      }
    })
  },
  get(key: Buffer): Promise<Buffer> {
    return new Promise<Buffer> (async (resolve, reject) => {
      try {
        const value: Buffer = await browser_storage.getItem(key)
        resolve(value)
      }
      catch(error) {
        reject(error)
      }
    })
  },
  del(key: Buffer): Promise<boolean> {
    return new Promise<boolean> (async (resolve, reject) => {
      try {
        await browser_storage.removeItem(key)
        resolve(true)
      }
      catch(error) {
        reject(error)
      }
    })
  },
  getKeys(): Promise<string[]> {
    return new Promise<string[]> (async (resolve, reject) => {
      try {
        const keys: string[] = await browser_storage.keys()
        resolve(keys)
      }
      catch(error) {
        reject(error)
      }
    })
  },
  getLength(): Promise<number> {
    return new Promise<number> (async (resolve, reject) => {
      try {
        const length: number = await browser_storage.length()
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
        await browser_storage.clear()
        resolve()
      }
      catch(error) {
        reject(error)
      }
    })
  }
}

