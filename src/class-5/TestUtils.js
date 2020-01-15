import Ticket from './Ticket'
import Locker from './Locker'

export function fillLocker(locker, times) {
  for (let i = 0; i < times; i += 1) {
    locker.save()
  }
  return locker
}

export function getAFakeTicket() {
  return new Ticket({
    lockerId: 999999,
    boxId: 99999999,
  })
}

export function getAFullLocker(order) {
  const locker = new Locker(24, order)
  for (let i = 0; i < 24; ++i) {
    locker.save()
  }
  return locker
}

export function getANonFullLocker(order) {
  return new Locker(24, order)
}

export function getAEmptyLocker(order) {
  return new Locker(24, order)
}

export function getANonEmptyLocker(order) {
  const locker = new Locker(24, order)
  locker.save()
  return locker
}
