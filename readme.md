# Subspace Storage Module

Provides a common interface for all core modules to interact with local storage in a device agnoostic manner.

### Node JS (Server, Electron, BitBot)

Uses [node-persist](https://github.com/simonlast/node-persist#readme) 

### Browser

Uses [localForage](https://github.com/localForage/localForage), a wrapper around indexed db, local storage, and websql.

### React Native (Anroid & iOS)

Uses [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage)  
Not implemented yet...


## Module Usage

Install this module as a dependency into another project

```
$ yarn add https://www.github.com/subspace/storage.git
```

Require this module inside a script

```javascript
const Storage = require('subspace-storage').default
const storage new Storage(adapter='node')

// adapter may be one of three types
  // 'node' (default)
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


