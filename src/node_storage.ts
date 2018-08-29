
const node_storage = require('node-persist')
const os = require('os')

const Adapter = {
  initiated: <boolean> false,
  init: async () => {
    try {
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
      Adapter.initiated = true
      return
    }
    catch(error) {
      console.log('Error initiating node storage')
      console.log(error)
    }
  },
  check: async () => {
    try {
      if (!Adapter.initiated) await Adapter.init()
      return
    }
    catch(error) {
      console.log('Error checking if node storage is initialized')
      console.log(error)
    }
  },
  set: async (key: string, value: object) => {
    try {
      await Adapter.check
      await node_storage.setItem(key, value)
      return
    }
    catch(error) {
      console.log('Error setting record with node storage')
      console.log(error)
    }
  },
  get: async(key: string) => {
    try {
      await Adapter.check
      const value: object = await node_storage.getItem(key)
      return value
    }
    catch(error) {
      console.log('Error getting record with node storage')
      console.log(error)
    }
  },
  del: async (key:string) => {
    try {
      await Adapter.check
      await node_storage.removeItem(key)
      return
    }
    catch(error) {
      console.log('Error remvoing record with node storage')
      console.log(error)
    }
  },
  get_keys: async () => {
    try {
      await Adapter.check
      const keys: string[] = await node_storage.keys()
      return keys
    }
    catch(error) {
      console.log('Error getting all keys from node storage')
      console.log(error)
    }
  },
  get_legnth: async () => {
    try {
      await Adapter.check
      const length: number = await node_storage.length()
      return length
    }
    catch(error) {
      console.log('Error getting length from node storage')
      console.log(error)
    }
  },
  clear: async () => {
    try {
      await Adapter.check
      await node_storage.clear()
      return
    }
    catch(error) {
      console.log('Error clearing all records from node storage')
      console.log(error)
    }
  },
}

export default Adapter