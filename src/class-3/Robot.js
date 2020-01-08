import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'

export default class Robot {
  constructor(lockerList) {
    this.lockerList = lockerList
  }
  save() {
    let ticket = null

    for (const locker of this.lockerList) {
      if (locker.getEmptyBox() !== -1) {
        ticket = locker.save()
        break
      }
    }
    if (ticket == null) {
      throw new FullError()
    }

    return ticket
  }

  withdraw(ticket) {
    const { lockerId } = ticket
    const locker = this.lockerList.find((locker) => locker.order === lockerId)

    if (locker == null) {
      throw new InvalidTicketError()
    }
    locker.withdraw(ticket)
  }
}
