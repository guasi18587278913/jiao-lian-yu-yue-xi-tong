import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'

/**
 * Generates a 42-cell matrix for a given month, representing a 6x7 grid.
 * This ensures the calendar height is always consistent.
 * @param d The date for which to generate the month matrix.
 * @returns An array of 42 elements, with `Date` objects for days of the month and `null` for padding.
 */
export function getMonthMatrix(d: Date): (Date | null)[] {
  try {
    if (!d || !(d instanceof Date) || isNaN(d.getTime())) {
      return Array(42).fill(null);
    }
    const days = eachDayOfInterval({ start: startOfMonth(d), end: endOfMonth(d) })
    
    // getDay() returns 0 for Sunday, 1 for Monday, etc.
    // We adjust it to make Monday the start of the week (0 for Monday, 6 for Sunday)
    const firstDayOfWeek = (getDay(days[0]) + 6) % 7;
  
    const prefix = Array(firstDayOfWeek).fill(null)
    
    // Ensure the total grid size is always 42 cells
    const suffix = Array(42 - prefix.length - days.length).fill(null)
    
    return [...prefix, ...days, ...suffix]
  } catch (e) {
    console.error("Failed to generate month matrix for date:", d, e);
    return Array(42).fill(null);
  }
} 