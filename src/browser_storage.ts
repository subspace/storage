const browser_storage = require('localforage')

const Adapter = {
  put: async (key: string, value: object) => {
    try {
      await browser_storage.setItem(key, value)
      return
    }
    catch(error) {
      console.log('Error setting record with browser storage')
      console.log(error)
    }
  },
  get: async(key: string) => {
    try {
      const value: object = await browser_storage.getItem(key)
      return value
    }
    catch(error) {
      console.log('Error getting record with browser storage')
      console.log(error)
    }
  },
  del: async (key:string) => {
    try {
      await browser_storage.removeItem(key)
      return
    }
    catch(error) {
      console.log('Error remvoing record with browser storage')
      console.log(error)
    }
  },
  get_keys: async () => {
    try {
      const keys: string[] = await browser_storage.keys()
      return keys
    }
    catch(error) {
      console.log('Error getting all keys from browser storage')
      console.log(error)
    }
  },
  get_length: async () => {
    try {
      const length: number = await browser_storage.length()
      return length
    }
    catch(error) {
      console.log('Error getting length from browser storage')
      console.log(error)
    }
  },
  clear: async () => {
    try {
      await browser_storage.clear()
      return
    }
    catch(error) {
      console.log('Error clearing all records from browser storage')
      console.log(error)
    }
  },
}

export default Adapter