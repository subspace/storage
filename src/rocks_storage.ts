const level = require('level-rocksdb')
const os = require('os')
const db = level(`${os.homedir()}/spacerocks`, { valueEncoding: 'binary' })

const Adapter = {
  put: async (key: Buffer, value: Buffer) => {
    try {
      await db.put(key, value)
      return
    } 
    catch (error) {
      console.log('Error putting record with rocks storage')
      console.log(error)
    }
  },
  get: async (key: Buffer) => {
    try {
      let value: Buffer = await db.get(key)
      return value 
    } 
    catch (error) {
      console.log('Error getting record with rocks storage')
      console.log(error)
    }
  },
  del: async (key: Buffer) => {
    try {
      await db.del(key)
      return
    }
    catch (error) {
      console.log('Error deleting record with rocks storage')
      console.log(error)
    }
  }
}

export default Adapter