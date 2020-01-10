import Ticket from './Ticket'
import Locker from './Locker'
import SuperRobot from './SuperRobot'
import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'

// 存包
describe('Super robot save package', () => {
  // 1. given 我是一个机器人, 有一个 0/24 的一号柜， 有一个 12/24 的二号柜，when 我存一个包 then 我拿到一号柜的小票
  test('should get a ticket from locker 1 when I save a bag given there are a 0/24 locker 1 and a 12/24 locker 2', () => {
    // given
    const locker1 = new Locker(24, 1)
    const locker2 = HelperUtils.fillLocker(new Locker(24, 2), 12)
    const lockers = [locker1, locker2]
    const superRobot = new SuperRobot(lockers)

    // when
    const ticket = superRobot.save()

    // then
    expect(ticket.lockerId).toBe(locker1.order)
  })

  // 2. given 我是一个机器人, 有一个 12/24 的一号柜， 有一个 12/24 的二号柜，when 我存一个包 then 我拿到一号柜的小票
  test('should get a ticket from locker 1 when I save a bag given there are a 12/24 locker 1 and a 12/24 locker 2', () => {
    // given
    const locker1 = HelperUtils.fillLocker(new Locker(24, 1), 12)
    const locker2 = HelperUtils.fillLocker(new Locker(24, 2), 12)
    const lockers = [locker1, locker2]
    const superRobot = new SuperRobot(lockers)

    // when
    const ticket = superRobot.save()

    // then
    expect(ticket.lockerId).toBe(locker1.order)
  })

  // 3. given 我是一个机器人, 有一个 12/24 的一号柜， 有一个 6/12 的二号柜，when 我存一个包 then 我拿到一号柜的小票
  test('should get a ticket from locker 1 when I save a bag given there are a 12/24 locker 1 and a 6/12 locker 2', () => {
    // given
    const locker1 = HelperUtils.fillLocker(new Locker(24, 1), 12)
    const locker2 = HelperUtils.fillLocker(new Locker(12, 2), 6)
    const lockers = [locker1, locker2]
    const superRobot = new SuperRobot(lockers)

    // when
    const ticket = superRobot.save()

    // then
    expect(ticket.lockerId).toBe(locker1.order)
  })

  // 4. given 我是一个机器人, 有一个 24/24 的一号柜， 有一个 24/24 的二号柜，when 我存一个包 then 我得到一个错误信息
  test('should get an error when I save a bag given there are a 24/24 locker 1 and a 24/24 locker 2', () => {
    // given
    const locker1 = HelperUtils.fillLocker(new Locker(24, 1), 24)
    const locker2 = HelperUtils.fillLocker(new Locker(24, 2), 24)
    const lockers = [locker1, locker2]
    const superRobot = new SuperRobot(lockers)

    // then
    expect(() => {
      // when
      superRobot.save()
    }).toThrowError(FullError)
  })
})

// 取包
describe('The super robot withdraw package', () => {
  // 1. given 我是一个机器人, 有一个存在一号柜零号位的小票，when 我取包， then 我拿到一号柜零号位打开
  test('should open box 0 of locker 1 when I withdraw a bag given a ticket box 0 of locker 1', () => {
    // given
    const locker = new Locker(24, 1)
    const spy = jest.spyOn(locker, 'open')
    const lockers = [locker]
    const superRobot = new SuperRobot(lockers)
    const ticket = superRobot.save()

    // when
    superRobot.withdraw(ticket)

    // then
    expect(spy).toHaveBeenCalledWith(0)
  })

  // 2. given 我是一个机器人, 有一个伪造小票，when 我取包， then 我得到一个错误
  test('should get an error when I withdraw a bag given a fake ticket', () => {
    // given
    const locker = new Locker(24, 1)
    const lockers = [locker]
    const superRobot = new SuperRobot(lockers)
    superRobot.save()
    const ticket = HelperUtils.getAFakeTicket()

    // then
    expect(() => {
      // when
      superRobot.withdraw(ticket)
    }).toThrowError(InvalidTicketError)
  })

  // 3. given 我是一个机器人, 有一个用过的小票，when 我取包， then 我得到一个错误
  test('should get an error when I withdraw a bag given a used ticket', () => {
    // given
    const locker = new Locker(24, 1)
    const lockers = [locker]
    const superRobot = new SuperRobot(lockers)
    const ticket = superRobot.save()
    superRobot.withdraw(ticket)

    // then
    expect(() => {
      // when
      superRobot.withdraw(ticket)
    }).toThrowError(InvalidTicketError)
  })
})

class HelperUtils {
  static fillLocker(locker, times) {
    for (let i = 0; i < times; i += 1) {
      locker.save()
    }
    return locker
  }

  static getAFakeTicket() {
    return new Ticket({
      lockerId: 999999,
      boxId: 99999999,
    })
  }
}
