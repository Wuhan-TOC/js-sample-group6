import { ERR_FULL, ERR_INVALID_TICKET } from './enum'
class Locker {
  constructor(size) {
    this.size = size
    this.lockerMap = new Map()
  }

  save(bag) {
    const availableSize = this.size - this.lockerMap.size

    if (availableSize === 0) {
      return ERR_FULL
    }
    const ticket = Math.random().toString()

    this.lockerMap.set(ticket, bag)

    return ticket
  }

  withdraw(ticket) {
    if (!this.lockerMap.has(ticket)) {
      return ERR_INVALID_TICKET
    }

    const bag = this.lockerMap.get(ticket)
    this.lockerMap.delete(ticket)

    return bag
  }
}

export default Locker
