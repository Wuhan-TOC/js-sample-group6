import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'

export default class SuperRobot {
  constructor(lockerList) {
    this.lockerList = lockerList
  }
  save() {
    let ticket = null

    let newLockerListSortedByEmptyRateAndOrder = Array.from(this.lockerList).sort((a, b) => {
      let diff = a.getEmptyRate() - b.getEmptyRate()
      if (Math.abs(diff) < 0.0001) {
        return a.order - b.order
      } else {
        return diff
      }
    })

    for (const locker of newLockerListSortedByEmptyRateAndOrder) {
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
