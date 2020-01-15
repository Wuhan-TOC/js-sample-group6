import GraduateRobot from './GraduateRobot'

export default class RobotManager extends GraduateRobot {
  constructor(lockerList) {
    super(lockerList)
    this.robotCallMap = new Map()
    this.robotCallMap.set(this, 0)
  }

  save() {
    // eslint-disable-next-line prefer-destructuring
    let minCallCount = Number.MAX_VALUE
    let minCallRobot = null

    this.robotCallMap.forEach((value, key) => {
      if (value < minCallCount) {
        minCallCount = value
        minCallRobot = key
      }
    })
    this.robotCallMap.set(minCallRobot, this.robotCallMap.get(minCallRobot) + 1)
    if (minCallRobot === this) {
      return super.save()
    }
    return minCallRobot.save()
  }

  withdraw(ticket) {
    // eslint-disable-next-line prefer-destructuring
    let minCallCount = Number.MAX_VALUE
    let minCallRobot = null

    this.robotCallMap.forEach((value, key) => {
      if (value < minCallCount) {
        minCallCount = value
        minCallRobot = key
      }
    })
    this.robotCallMap.set(minCallRobot, this.robotCallMap.get(minCallRobot) + 1)
    if (minCallRobot === this) {
      super.withdraw(ticket)
    } else {
      minCallRobot.withdraw(ticket)
    }
  }

  connect(robot) {
    this.robotCallMap.set(robot, 0)
  }

  disconnect(robot) {
    this.robotCallMap.delete(robot)
  }
}
