import BrowserAdapter from './BrowserAdapter'
import IAdapter from './IAdapter';
//import NodeAdapter from './NodeAdapter'
import RocksAdapter from './RocksAdapter'
import * as os from "os";

// ToDo
  // handle storage of farming plot / proof of space
  // handle cache or ephemeral storage
  // handle self-hosted records (without a node)

export default class Storage {
  private adapter: IAdapter
  constructor(public readonly adapterName: string) {
    switch (adapterName) {
      case 'browser':
        this.adapter = new BrowserAdapter()
        break;
      // case 'node':
      //   this.adapter = new NodeAdapter()
      //   break;
      case 'rocks':
        this.adapter = new RocksAdapter(os.homedir())
        break;
      default:
        throw new Error('Wrong adapter name, supported adapters: browser, rocks')
    }
  }

  put(key: string, value: string): Promise<void> {
    return this.adapter.put(key, value)
  }

  get(key: string): Promise<string|null> {
    return this.adapter.get(key)
  }

  del(key: string): Promise<void> {
    return this.adapter.del(key)
  }

  getKeys(): Promise<string[]> {
    return this.adapter.getKeys()
  }

  getLength(): Promise<number> {
    return this.adapter.getLength()
  }

  clear(): Promise<void> {
    return this.adapter.clear()
  }
}
