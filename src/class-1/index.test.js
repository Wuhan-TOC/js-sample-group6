import inchToFoot from './index'

test('should return 0 when converting to foot given 0 inch', () => {
  const givenInch = 0
  const actualFoot = inchToFoot(givenInch)

  expect(actualFoot).toBe(0)
})

test('should return 1 when converting to foot given 12 inch', () => {
  const givenInch = 12
  const actualFoot = inchToFoot(givenInch)

  expect(actualFoot).toBe(1)
})
