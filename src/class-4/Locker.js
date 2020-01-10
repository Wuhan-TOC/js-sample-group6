import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'
import Ticket from './Ticket'

class Locker {
  constructor(size, order) {
    this.size = size
    this.boxes = new Array(size)
    this.order = order
  }

  save() {
    const index = this.getEmptyBox()
    if (index === -1) {
      return new FullError()
    }

    this.boxes[index] = true

    return new Ticket({
      lockerId: this.order,
      boxId: index,
    })
  }

  withdraw(ticket) {
    if (
      ticket.lockerId !== this.order ||
      !this.boxes[ticket.boxId] ||
      ticket.isUsed()
    ) {
      throw new InvalidTicketError()
    }

    ticket.punch()
    this.open(ticket.boxId)
    this.boxes[ticket.boxId] = false
  }

  // eslint-disable-next-line class-methods-use-this
  open(index) {
    console.log(`${index}号柜门打开`)
  }

  getEmptyBox() {
    return this.boxes.findIndex((box) => !box)
  }

  getEmptyRate() {
    const emptyCount = this.boxes.filter(box => !box).length
    return emptyCount / this.size
  }
}

export default Locker
