export default class Ticket {
  constructor({ lockerId, boxId }) {
    this.lockerId = lockerId
    this.boxId = boxId
    this._holeFlag = false
  }

  isUsed() {
    return this._holeFlag
  }

  punch() {
    this._holeFlag = true
  }
}
