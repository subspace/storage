const rocks_adapter = require('./rocks_storage').default
const node_adapter = require('./node_storage').default
const browser_adapter = require('./browser_storage').default

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

  encodeKey(key: any) {
    // convert key to binary before saving to RocksDB
    // if string convert to buffer, else alreaddy is buffer 
    if (typeof key === 'string') {
      key = Buffer.from(key)
    }
    return key 
  }

  encodeValue(value: object) {
    // convert value to binary before saving to RocksDB 
    // stringify JSON and convert to a buffer
    const stringValue: string = JSON.stringify(value)
    const bufferValue: any = Buffer.from(stringValue)
    return bufferValue
  }

  decodeValue(value: any) {
    // read binary value from Rocks and convert back to JSON
    // convert buffer back to valid JSON
    const stringValue: string = value.toString()
    const JSONvalue: object = JSON.parse(stringValue)
    return JSONvalue
  }

  async put(key: any, value: any) {
    key = this.encodeKey(key)
    value = this.encodeValue(value)
    await this.adapter.put(key, value)
    return
  }

  async get(key: any) {
    key = this.encodeKey(key)
    const bufferValue: any = await this.adapter.get(key)
    const value = this.decodeValue(bufferValue)
    return value
  }

  async del(key: any) {
    key = this.encodeKey(key)
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