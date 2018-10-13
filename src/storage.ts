import { rocksAdapter } from './rocks_storage'
import { browserAdapter } from './browser_storage'
// import { nodeAdapter } from './node_storage'
import EventEmitter from 'events'


// ToDo
  // handle storage of farming plot / proof of space
  // handle cache or ephemeral storage
  // handle self-hosted records (without a node)

export default class Storage extends EventEmitter {
  adapter: any
  constructor(adapter: string) {
    super()
    if (adapter === 'browser') {
      this.adapter = browserAdapter
    } else {
      this.adapter = 'rocks'
    }
  }

  put(key: string, value: string): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        await this.adapter.put(
          Buffer.from(key),
          Buffer.from(value)
        )
        resolve()
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }

  get(key: string): Promise<string> {
    return new Promise<string> (async (resolve, reject) => {
      try {
        const value: Buffer = await this.adapter.get(Buffer.from(key))
        resolve(value.toString())
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }


  del(key: string): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        await this.adapter.del(Buffer.from(key))
        resolve()
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }

  getKeys(): Promise<string[]> {
    return new Promise<string[]> (async (resolve, reject) => {
      try {
        let keys: string[] = await this.adapter.getKeys()
        resolve(keys)
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }

  getLength(): Promise<number> {
    return new Promise<number> (async (resolve, reject) => {
      try {
        let length: number = await this.adapter.getLength()
        resolve(length)
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }

  clear(): Promise<void> {
    return new Promise<void> (async (resolve, reject) => {
      try {
        await this.adapter.clear()
        resolve()
      }
      catch(error) {
        this.emit('error', error)
        reject(error)
      }
    })
  }
}