import FullError from './FullError'
import InvalidTicketError from './InvalidTicketError'
import {
  getAFakeTicket,
  getAEmptyLocker,
  getAFullLocker,
  getANonFullLocker, fillLocker,
} from './TestUtils'
import GraduateRobot from './GraduateRobot'
import Locker from './Locker'
import RobotManager from './RobotManager'
import SuperRobot from './SuperRobot'
import Ticket from './Ticket'

// 1. 存包
describe('robot manager save', () => {
  let locker1 = null
  let locker2 = null
  let robotManager = null
  let superRobot = null
  let graduateRobot = null

  // 1.1 given 我是一个机器人管理员, 有一个0/24的一号柜, 一个0/24的二号柜
  describe('I am a robot manager, there are a 0/24 locker1 and a 0/24 locker2', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      locker2 = new Locker(24, 2)
      superRobot = new SuperRobot([locker1, locker2])
      graduateRobot = new GraduateRobot([locker1, locker2])
      robotManager = new RobotManager([locker1, locker2])
    })

    afterEach(() => {
      locker1 = null
      locker2 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
    })

    // 1.1.1 given 我有一个毕业机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.1.2 given 我有一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.1.3 given 我有一个毕业机器人和一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.1.4 given 我手下没有机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have no robot', () => {
      // given

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
  })

  // 1.2 given 我是一个机器人管理员, 有一个12/24的一号柜, 一个6/12的二号柜
  describe('I am a robot manager, there are a 0/24 locker1 and a 0/24 locker2', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      fillLocker(locker1, 12)
      locker2 = new Locker(12, 2)
      fillLocker(locker2, 6)
      superRobot = new SuperRobot([locker1, locker2])
      graduateRobot = new GraduateRobot([locker1, locker2])
      robotManager = new RobotManager([locker1, locker2])
    })

    afterEach(() => {
      locker1 = null
      locker2 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
    })

    // 1.2.1 given 我有一个毕业机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.2.2 given 我有一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.2.3 given 我有一个毕业机器人和一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.2.4 given 我手下没有机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have no robot', () => {
      // given

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
  })

  // 1.3 given 我是一个机器人管理员, 有一个24/24的一号柜, 一个0/24的二号柜
  describe('I am a robot manager, there are a 24/24 locker1 and a 0/24 locker2', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      fillLocker(locker1, 24)
      locker2 = new Locker(24, 2)
      superRobot = new SuperRobot([locker1, locker2])
      graduateRobot = new GraduateRobot([locker1, locker2])
      robotManager = new RobotManager([locker1, locker2])
    })

    afterEach(() => {
      locker1 = null
      locker2 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
    })

    // 1.3.1 given 我有一个毕业机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.3.2 given 我有一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.3.3 given 我有一个毕业机器人和一个超级机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
    // 1.3.4 given 我手下没有机器人, when 我存包, then 我拿到小票
    test('should get a ticket when I save given I have no robot', () => {
      // given

      // when
      const ticket = robotManager.save()

      // then
      expect(ticket).toBeInstanceOf(Ticket)
    })
  })

  // 1.4 given 我是一个机器人管理员, 有一个24/24的一号柜, 一个24/24的二号柜
  describe('I am a robot manager, there are a 24/24 locker1 and a 24/24 locker2', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      fillLocker(locker1, 24)
      locker2 = new Locker(24, 2)
      fillLocker(locker2, 24)
      superRobot = new SuperRobot([locker1, locker2])
      graduateRobot = new GraduateRobot([locker1, locker2])
      robotManager = new RobotManager([locker1, locker2])
    })

    afterEach(() => {
      locker1 = null
      locker2 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
    })

    // 1.4.1 given 我有一个毕业机器人, when 我存包, then 报错
    test('should get an error when I save given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.save()
      }).toThrowError(FullError)
    })
    // 1.4.2 given 我有一个超级机器人, when 我存包, then 报错
    test('should get an error when I save given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // then
      expect(() => {
        // when
        robotManager.save()
      }).toThrowError(FullError)
    })
    // 1.4.3 given 我有一个毕业机器人和一个超级机器人, when 我存包, then 报错
    test('should get an error when I save given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.save()
      }).toThrowError(FullError)
    })
    // 1.4.4 given 我手下没有机器人, when 我存包, then 报错
    test('should get an error when I save given I have no robot', () => {
      // given

      // then
      expect(() => {
        // when
        robotManager.save()
      }).toThrowError(FullError)
    })
  })
})

// 2. 取包
describe('robot manager withdraw', () => {
  let locker1 = null
  let robotManager = null
  let superRobot = null
  let graduateRobot = null
  let ticket = null
  let spy = null

  // 1. given 我是一个机器人管理员, 有一个存在一号柜零号位的小票
  describe('I am a robot manager, there is a ticket of locker1 box0', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      spy = jest.spyOn(locker1, 'open')
      ticket = locker1.save()
      superRobot = new SuperRobot([locker1])
      graduateRobot = new GraduateRobot([locker1])
      robotManager = new RobotManager([locker1])
    })

    afterEach(() => {
      locker1 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
      ticket = null
      spy = null
    })

    // 1.1.1 given 我有一个毕业机器人, when 我取包, then 1号柜0号位打开
    test('should locker1 box0 open when I withdraw given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // when
      robotManager.withdraw(ticket)

      // then
      expect(spy).toHaveBeenCalledWith(0)
    })
    // 1.1.2 given 我有一个超级机器人, when 我取包, then 1号柜0号位打开
    test('should locker1 box0 open when I withdraw given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // when
      robotManager.withdraw(ticket)

      // then
      expect(spy).toHaveBeenCalledWith(0)
    })
    // 1.1.3 given 我有一个毕业机器人和一个超级机器人, when 我取包, then 1号柜0号位打开
    test('should locker1 box0 open when I withdraw given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // when
      robotManager.withdraw(ticket)

      // then
      expect(spy).toHaveBeenCalledWith(0)
    })
    // 1.1.4 given 我手下没有机器人, when 我取包, then 1号柜0号位打开
    test('should locker1 box0 open when I withdraw given I have no robot', () => {
      // given

      // when
      robotManager.withdraw(ticket)

      // then
      expect(spy).toHaveBeenCalledWith(0)
    })
  })

  // 2. given 我是一个机器人管理员, 有一个伪造小票
  describe('I am a robot manager, there is a fake ticket', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      ticket = getAFakeTicket()
      superRobot = new SuperRobot([locker1])
      graduateRobot = new GraduateRobot([locker1])
      robotManager = new RobotManager([locker1])
    })

    afterEach(() => {
      locker1 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
      ticket = null
    })

    // 1.1.1 given 我有一个毕业机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.2 given 我有一个超级机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.3 given 我有一个毕业机器人和一个超级机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.4 given 我手下没有机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have no robot', () => {
      // given

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
  })

  // 3. given 我是一个机器人管理员, 有一个用过的小票
  describe('I am a robot manager, there is a used ticket', () => {
    beforeEach(() => {
      locker1 = new Locker(24, 1)
      ticket = locker1.save()
      locker1.withdraw(ticket)

      superRobot = new SuperRobot([locker1])
      graduateRobot = new GraduateRobot([locker1])
      robotManager = new RobotManager([locker1])
    })

    afterEach(() => {
      locker1 = null
      robotManager = null
      superRobot = null
      graduateRobot = null
      ticket = null
    })

    // 1.1.1 given 我有一个毕业机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a graduate robot', () => {
      // given
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.2 given 我有一个超级机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a super robot', () => {
      // given
      robotManager.connect(superRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.3 given 我有一个毕业机器人和一个超级机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have a graduate robot and a super robot', () => {
      // given
      robotManager.connect(superRobot)
      robotManager.connect(graduateRobot)

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
    // 1.1.4 given 我手下没有机器人, when 我取包, then 报错
    test('should get an error when I withdraw given I have no robot', () => {
      // given

      // then
      expect(() => {
        // when
        robotManager.withdraw(ticket)
      }).toThrowError(InvalidTicketError)
    })
  })
})
