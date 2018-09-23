const rocks_adapter = require('./rocks_storage').default
const node_adapter = require('./node_storage').default
const browser_adapter = require('./browser_storage').default

// ToDo
  // handle storage of farming plot / proof of space
  // handle cache or ephemeral storage
  // handle self-hosted records (without a node)

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

  private encodeKey(key: string | Buffer) {
    // convert key to binary before saving to storage
    // if string convert to buffer, else already is buffer
    let encodedKey: Buffer
    if (typeof key === 'string') {
      encodedKey = Buffer.from(key)
    } else {
      encodedKey = key
    }
    return encodedKey
  }

  private encodeValue(value: object) {
    // convert value (JSON object) to binary before saving to storage 
    // stringify JSON and convert to a buffer
    const stringValue: string = JSON.stringify(value)
    const bufferValue: Buffer = Buffer.from(stringValue)
    return bufferValue
  }

  private decodeValue(value: Buffer) {
    // read binary value from Rocks and convert back to JSON
    // convert buffer back to valid JSON
    const stringValue: string = value.toString()
    const JSONvalue: object = JSON.parse(stringValue)
    return JSONvalue
  }

  async put(key: string | Buffer, value: object) {
    // put value to storage, given a key
    const bufferKey: Buffer = this.encodeKey(key)
    const bufferValue: Buffer = this.encodeValue(value)
    await this.adapter.put(bufferKey, bufferValue)
    return
  }

  async get(key: string | Buffer) {
    // get value from storage, given a key
    const bufferKey: Buffer = this.encodeKey(key)
    const bufferValue: Buffer = await this.adapter.get(key)
    const value: object = this.decodeValue(bufferValue)
    return value
  }

  async del(key: string | Buffer) {
    const bufferKey: Buffer = this.encodeKey(key)
    await this.adapter.del(bufferKey)
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