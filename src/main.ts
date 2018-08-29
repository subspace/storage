const node_adapter = require('./node_storage')
const browser_adapter = require('./browser_storage')


export default class Storage {
  adapter: any
  constructor(adapter: string) {
    if (adapter === 'browser') {
      this.adapter = browser_adapter
    } else {
      this.adapter = node_adapter
    }
  }

  async set(key: string, value: string) {
    await this.adapter.set(key, value)
    return
  }

  async get(key: string) {
    const value: string = await this.adapter.get(key)
    return value
  }

  async del(key: string) {
    await this.adapter.del(key)
    return
  }

  async getKeys() {
    let keys: string[] = await this.adapter.get_keys()
    return keys
  }

  async getLength() {
    let length: number = await this.adapter.get_length()
    return length
  }

  async clear() {
    await this.adapter.clear()
    return
  }
}