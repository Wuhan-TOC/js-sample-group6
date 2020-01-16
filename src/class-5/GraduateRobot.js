import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'

export default class GraduateRobot {
  constructor(lockerList) {
    this.lockerList = lockerList
  }
  save() {
    const foundLocker = this.lockerList.find(
      (locker) => locker.getEmptyBox() !== -1
    )

    if (!foundLocker) {
      throw new FullError()
    }

    return foundLocker.save()
  }

  withdraw(ticket) {
    const { lockerId } = ticket
    const foundLocker = this.lockerList.find(
      (locker) => locker.order === lockerId
    )

    if (!foundLocker) {
      throw new InvalidTicketError()
    }
    foundLocker.withdraw(ticket)
  }
}
