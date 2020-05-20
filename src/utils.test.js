import { getFormattedDate } from './utils'

describe('getFormattedTime', () => {
  test('it should display dates in mm/dd/yyyy format', () => {
    const date1 = getFormattedDate('2017-05-26T19:02:03Z')
    expect(date1).toEqual('05/26/2017')
  })
})
