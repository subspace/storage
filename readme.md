# Subspace Storage Module

Provides a common interface for all core modules to interact with local storage in a device agnoostic manner.

### Node JS Primary

Uses [RocksDB](https://rocksdb.org/) through [level-rocksdb](https://github.com/Level/level-rocksdb)

### Node JS Backup

Uses [node-persist](https://github.com/simonlast/node-persist#readme) 

### Browser

Uses [localForage](https://github.com/localForage/localForage), a wrapper around indexed db, local storage, and websql.

### React Native (Anroid & iOS)

Uses [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage)  
Not implemented yet...

### API

#### storage.put(key: string | Buffer, value: Buffer) => {}

#### storage.get(key: string | Buffer) => {value: Buffer}

#### storage.del(key: string | Buffer) => {}

### Usage by other modules

#### Profile

Persists the user profile under key: 'profile'

#### Tranpsort

Persists a map of gateway nodes and IP addresses under key: 'gateways'

#### Tracker

Persists the tracker between sessions under key: 'tracker'

#### Ledger

Stores blocks and txs under key: Buffer.from(hash(value))

#### Database

Stores mutable records under key: Buffer.from(hash(record_public_key))

Stores immutable records under key: Buffer.from(hash(encoded_value))


## Module Usage

Install this module as a dependency into another project

```
$ yarn add https://www.github.com/subspace/storage.git
```

Require this module inside a script

```javascript
const Storage = require('subspace-storage').default
const storage = new Storage(adapter='rocks')

let key = Buffer.from(crypto.getHash('key'), 'hex')
let value = {
  some: 'value'
}

// write value
await stoage.put(key, value)

// read value
let  = await storage.get(key)

// delete value
await storage.del(key)



// adapter may be one of three types
  // 'rocks' (default)
  // 'node' 
  // 'browser'
  // 'mobile'
```

Since this creates a unqiue storage instance it should be created only once at the top level of the project and passed to various modules for usage.

## Development Usage

Clone the repo and install depedencies  

```
$ git clone https://www.github.com/subspace/storage.git
$ cd storage
$ yarn
```

Build manually.  
 
```
$ tsc -w
```

[Instructions](https://code.visualstudio.com/docs/languages/typescript#_step-2-run-the-typescript-build) to automate with visual studio code.

Run tests

```
$ npx jest
```


