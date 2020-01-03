import Locker from '.'

import { ERR_FULL, ERR_INVALID_TICKET } from './enum'

test('given 一个储物柜 when 按存包按钮 then 得到一张小票', () => {
  // given
  const locker = new Locker(24)
  // when
  const ticket = locker.save('名牌包')
  // then
  expect(ticket).not.toBeNull()
})

test('given 一个储物柜 when 按存包按钮 then 提示柜子已满', () => {
  // given
  const fullLocker = new Locker(0)
  // when
  const err = fullLocker.save('名牌包')
  // then
  expect(err).toBe(ERR_FULL)
})

test('given 一个储物柜 when 刷凭条 then 对应柜门打开', () => {
  // given
  const locker = new Locker(24)
  const ticket = locker.save('名牌包')

  // when
  const myBag = locker.withdraw(ticket)

  // then
  expect(myBag).toBe('名牌包')
})

test('given 一个储物柜 when 刷了一个错误凭条 then 报错', () => {
  // given
  const locker = new Locker(24)

  // when
  const result = locker.withdraw('不存在的凭条')

  // then
  expect(result).toBe(ERR_INVALID_TICKET)
})

test('given 一个储物柜 when 刷了一个重复凭条 then 报错', () => {
  // given
  const locker = new Locker(24)
  const ticket = locker.save('名牌包')

  // when
  locker.withdraw(ticket)
  const result = locker.withdraw(ticket)

  // then
  expect(result).toBe(ERR_INVALID_TICKET)
})
