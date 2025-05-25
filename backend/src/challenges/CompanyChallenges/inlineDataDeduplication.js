function solution(operations) {
  let ans = [];
  let dataStorage = new StorageArray();
  for (let operation of operations) {
    if (operation.startsWith('READ ')) {
      ans.push(dataStorage.read(parseInt(operation.slice(5))));
    } else if (operation.startsWith('WRITE ')) {
      ans.push(dataStorage.write(operation.slice(6)));
    } else if (operation.startsWith('DELETE ')) {
      ans.push(dataStorage.delete(parseInt(operation.slice(7))));
    }
  }
  return ans;
}

class ReferenceCounter {
  constructor(addr, refs) {
    this.addr = addr;
    this.refs = refs;
  }
}

class StorageArray {
  constructor() {
    this.data_storage = Array(64).fill(null);
    this.alloc_addr_ptr = 0;
    this.dedup_lookaside = {};
  }

  _alloc_addr() {
    let start_alloc_addr_ptr = this.alloc_addr_ptr;
    while (true) {
      let ref_counter = this.dedup_lookaside[this.data_storage[this.alloc_addr_ptr]];
      if (ref_counter == null || ref_counter.addr != this.alloc_addr_ptr) {
        break;
      }
      this.alloc_addr_ptr = (this.alloc_addr_ptr + 1) % this.data_storage.length;
      if (this.alloc_addr_ptr == start_alloc_addr_ptr) {
        return null;
      }
    }

    return this.alloc_addr_ptr;
  }

  write(data) {
    if (this.dedup_lookaside[data]) {
      let addr = this.dedup_lookaside[data].addr;
      this.dedup_lookaside[data].refs += 1;
      return addr;
    } else {
      let addr = this._alloc_addr();
      if (addr === null) {
        return null;
      }
      this.data_storage[addr] = data;
      this.dedup_lookaside[data] = new ReferenceCounter(addr, 1);
      return addr;
    }
  }

  read(addr) {
    if (addr >= 0 && addr < this.data_storage.length && this.data_storage[addr] != null) {
      let data = this.data_storage[addr];
      if (this.dedup_lookaside[data] && this.dedup_lookaside[data].addr == addr) {
        return data;
      }
    }
    return null;
  }

  delete(addr) {
    if (addr >= 0 && addr < this.data_storage.length && this.data_storage[addr] != null) {
      let data = this.data_storage[addr];
      if (this.dedup_lookaside[data] && this.dedup_lookaside[data].addr == addr) {
        this.dedup_lookaside[data].refs -= 1;
        if (this.dedup_lookaside[data].refs == 0) {
          delete this.dedup_lookaside[data];
        }
        return data;
      }
    }
    return null;
  }
}

module.exports = solution;