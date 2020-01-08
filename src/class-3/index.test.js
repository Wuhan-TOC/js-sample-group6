import Ticket from './Ticket'
import Locker from './Locker'
import Robot from './Robot'
import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'

// 存包

// 1. given 我是一个机器人, 有一个非满的一号柜 when 我存一个包 then 我拿到一号柜的小票
test('should get a ticket from locker 1 when I save a bag given there is a non-full locker 1', () => {
  // given
  const locker1 = MockUtils.getANonFullLocker()
  const lockers = [locker1]
  const robot = new Robot(lockers)

  // when
  const ticket = robot.save('一个包')

  // then
  expect(ticket.lockerId).toBe(locker1.id)
})
// 2. given 我是一个机器人, 有一个满的一号柜, 非满的二号柜, 非满的三号柜 when 我存一个包 then 我拿到二号柜的小票
test('should get a ticket from locker 2 when I save a bag given there are a full locker 1, a non-full locker 2 and a non-full locker 3', () => {
  // given
  const locker1 = MockUtils.getAFullLocker()
  const locker2 = MockUtils.getANonFullLocker()
  const locker3 = MockUtils.getANonFullLocker()
  const lockers = [locker1, locker2, locker3]
  const robot = new Robot(lockers)

  // when
  const ticket = robot.save('一个包')

  // then
  expect(ticket.lockerId).toBe(locker2.id)
})
// 3. given 我是一个机器人, 有一个满的一号柜 when 我存一个包 then 我报错
test('should get a error when I save a bag given there is a full locker 1', () => {
  // given
  const locker1 = MockUtils.getAFullLocker()
  const lockers = [locker1]
  const robot = new Robot(lockers)

  // then
  expect(() => {
    // when
    robot.save('一个包')
  }).toThrowError(FullError)
})

// 取包

// 4. given 我是一个机器人, 有一个非空的一号柜, 非空的二号柜 when 我拿一个小票取包 then 从一号柜取到包
test('should get a bag from locker 1 when I withdraw given there are a non-empty locker 1 and a non-full locker 2', () => {
  // given
  const locker1 = MockUtils.getANonEmptyLocker()
  const locker2 = MockUtils.getANonEmptyLocker()
  const lockers = [locker1, locker2]
  const robot = new Robot(lockers)
  const ticket = robot.save('一个包')

  // when
  robot.withdraw(ticket)

  // then
  expect(ticket.lockerId).toBe(locker1.id)
})

// 5. given 我是一个机器人, 有一个空的一号柜 when 我拿一个错误的小票取包 then 我报错
test('should get a error when I withdraw given there is a empty locker 1', () => {
  // given
  const locker1 = MockUtils.getAEmptyLocker()
  const lockers = [locker1]
  const robot = new Robot(lockers)

  // then
  expect(() => {
    // when
    robot.withdraw(MockUtils.getAWrontTicker())
  }).toThrowError(InvalidTicketError)
})

class MockUtils {
  static getAFullLocker() {
    const locker = new Locker(24)
    for (let i = 0; i < 24; ++i) {
      locker.save('别人的包')
    }
    return locker
  }

  static getANonFullLocker() {
    return new Locker(24)
  }

  static getAEmptyLocker() {
    return new Locker(24)
  }

  static getANonEmptyLocker() {
    const locker = new Locker(24)
    locker.save('别人的包')
    return locker
  }

  static getAWrontTicker() {
    return new Ticket({
      lockerId: '不存在的ID',
      boxId: '不存在的ID',
    })
  }
}
