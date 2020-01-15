import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'
import {
  getAFakeTicket,
  getAEmptyLocker,
  getAFullLocker,
  getANonFullLocker,
} from './TestUtils'
import GraduateRobot from './GraduateRobot'

// 存包
describe('graduate robot save', () => {
  // 1. given 我是一个机器人, 有一个非满的一号柜 when 我存一个包 then 我拿到一号柜的小票
  test('should get a ticket from locker 1 when I save a bag given there is a non-full locker 1', () => {
    // given
    const locker1 = getANonFullLocker(1)
    const lockers = [locker1]
    const robot = new GraduateRobot(lockers)

    // when
    const ticket = robot.save()

    // then
    expect(ticket.lockerId).toBe(locker1.order)
  })
  // 2. given 我是一个机器人, 有一个满的一号柜, 非满的二号柜, 非满的三号柜 when 我存一个包 then 我拿到二号柜的小票
  test('should get a ticket from locker 2 when I save a bag given there are a full locker 1, a non-full locker 2 and a non-full locker 3', () => {
    // given
    const locker1 = getAFullLocker(1)
    const locker2 = getANonFullLocker(2)
    const locker3 = getANonFullLocker(3)
    const lockers = [locker1, locker2, locker3]
    const robot = new GraduateRobot(lockers)

    // when
    const ticket = robot.save()

    // then
    expect(ticket.lockerId).toBe(locker2.order)
  })
  // 3. given 我是一个机器人, 有一个满的一号柜 when 我存一个包 then 我报错
  test('should get a error when I save a bag given there is a full locker 1', () => {
    // given
    const locker1 = getAFullLocker(1)
    const lockers = [locker1]
    const robot = new GraduateRobot(lockers)

    // then
    expect(() => {
      // when
      robot.save()
    }).toThrowError(FullError)
  })
})

// 取包
describe('graduate robot withdraw', () => {
  // 4. given 我是一个机器人, 有一个非满的一号柜, 非满的二号柜, 我先存一个包, 拿到小票 when 我拿这个小票取包 then 从一号柜取到包
  test('should get a bag from locker 1 when I withdraw given there are a non-full locker 1 and a non-full locker 2 and I save a package', () => {
    // given
    const locker1 = getANonFullLocker(1)
    const spy = jest.spyOn(locker1, 'open')
    const locker2 = getANonFullLocker(2)
    const lockers = [locker1, locker2]
    const robot = new GraduateRobot(lockers)
    const ticket = robot.save()

    // when
    robot.withdraw(ticket)

    // then
    expect(spy).toHaveBeenCalled()
  })

  // 5. given 我是一个机器人, 有一个一号柜 when 我拿一个错误的小票取包 then 我报错
  test('should get a error when I withdraw given there is a empty locker 1', () => {
    // given
    const locker1 = getAEmptyLocker(1)
    const lockers = [locker1]
    const robot = new GraduateRobot(lockers)

    // then
    expect(() => {
      // when
      robot.withdraw(getAFakeTicket())
    }).toThrowError(InvalidTicketError)
  })

  // 6. given 我是一个机器人, 有一个一号柜 when 我拿一个使用过的小票取包 then 我报错
  test('should get a error when I withdraw with a used ticket given there is a empty locker 1', () => {
    // given
    const locker1 = getAEmptyLocker(1)
    const lockers = [locker1]
    const robot = new GraduateRobot(lockers)
    const ticket = robot.save()
    robot.withdraw(ticket)

    // then
    expect(() => {
      // when
      robot.withdraw(ticket)
    }).toThrowError(InvalidTicketError)
  })
})
