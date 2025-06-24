import { describe, it, expect } from 'vitest'
import { getMonthMatrix } from '../calendar-utils'


describe('getMonthMatrix', () => {
  it('returns an array of 42 elements', () => {
    const matrix = getMonthMatrix(new Date('2024-01-01'))
    expect(matrix).toHaveLength(42)
  })

  it('first row is Monday-started', () => {
    const matrix = getMonthMatrix(new Date('2024-04-01'))
    const firstRow = matrix.slice(0, 7)
    const expectedDays = [1,2,3,4,5,6,0] // Mon..Sun
    firstRow.forEach((d, i) => {
      if (d) {
        expect(d.getDay()).toBe(expectedDays[i])
      }
    })
  })

  it('invalid dates return an array of nulls', () => {
    const matrix = getMonthMatrix(new Date('invalid'))
    expect(matrix).toHaveLength(42)
    matrix.forEach(cell => expect(cell).toBeNull())
  })
})
