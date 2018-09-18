const rocks_adapter = require('./rocks_storage')
const node_adapter = require('./node_storage')
const browser_adapter = require('./browser_storage')

// schema?
  // profile storage (save the keypair)
  // ledger storage (blocks, txs) => content addressed
  // tracker => save between restarts 
  // gateway nodes list
  // pledge of space / block solutions 

// SSDB record storage (BEP-44 schema)
// cache or ephemeral storage
// self-hosted records (without a node)

// if I stored the public key of a record 


export default class Storage {
  adapter: any
  constructor(adapter: string) {
    if (adapter === 'browser') {
      this.adapter = browser_adapter
    } else if (adapter === 'node') {
      this.adapter = node_adapter
    } else if (adapter === 'rocks') {
      this.adapter = rocks_adapter
    }
  }

  async put(key: any, value: any) {
    await this.adapter.put(key, value)
    return
  }

  async get(key: any) {
    const value: number = await this.adapter.get(key)
    return value
  }

  async del(key: any) {
    await this.adapter.del(key)
    return
  }

  async getKeys() {
    let keys: number[] = await this.adapter.get_keys()
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