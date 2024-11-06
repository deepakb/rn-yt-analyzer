import * as React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import {
  addDays,
  addMonths,
  format,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from 'date-fns'

import { useTheme } from '@/contexts/ThemeContext'

export interface DateRange {
  from: Date
  to?: Date
}

type DisabledDate = Date | DateRange

interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range'
  selected?: Date | Date[] | DateRange
  onSelect?: (date: Date | Date[] | DateRange) => void
  className?: string
  disabled?: DisabledDate[]
  initialFocus?: Date
  numberOfMonths?: number
  showOutsideDays?: boolean
}

function Calendar({
  mode = 'single',
  selected,
  onSelect,
  className = '',
  disabled,
  initialFocus,
  numberOfMonths = 1,
  showOutsideDays = true,
}: CalendarProps) {
  const { isDark } = useTheme()
  const [currentMonth, setCurrentMonth] = React.useState(
    initialFocus || new Date()
  )

  // Track the hover state for range selection
  const [rangeSelectionStart, setRangeSelectionStart] = React.useState<Date | null>(null)

  // Helper to check if a date is within a range
  const isDateInRange = (date: Date, range: DateRange): boolean => {
    if (!range.from || !range.to) return false
    return isWithinInterval(date, { 
      start: range.from, 
      end: range.to 
    })
  }

  // Helper to check if a date is disabled
  const checkIsDisabled = (date: Date): boolean => {
    if (!disabled) return false
    
    return disabled.some((disabledDate) => {
      if (disabledDate instanceof Date) {
        return isSameDay(disabledDate, date)
      }
      // Check if date is within disabled range
      return isDateInRange(date, disabledDate as DateRange)
    })
  }

  // Helper to check if a date is selected
  const isSelected = (date: Date): boolean => {
    if (!selected) return false
    
    if (mode === 'single') {
      return selected instanceof Date && isSameDay(selected, date)
    }
    
    if (mode === 'multiple') {
      return (selected as Date[]).some(
        (selectedDate) => isSameDay(selectedDate, date)
      )
    }
    
    if (mode === 'range') {
      const range = selected as DateRange
      return !!(
        (range.from && isSameDay(range.from, date)) || 
        (range.to && isSameDay(range.to, date)) ||
        (range.from && range.to && isDateInRange(date, range))
      )
    }
    
    return false
  }

  // Helper to check if a date is in the selected range
  const isInSelectedRange = (date: Date): boolean => {
    if (mode !== 'range' || !selected) return false
    const range = selected as DateRange
    return !!(range.from && range.to && isDateInRange(date, range))
  }

  // Helper to check if a date is the start or end of a range
  const isRangeStart = (date: Date): boolean => {
    if (mode !== 'range' || !selected) return false
    const range = selected as DateRange
    return !!range.from && isSameDay(date, range.from)
  }

  const isRangeEnd = (date: Date): boolean => {
    if (mode !== 'range' || !selected) return false
    const range = selected as DateRange
    return !!range.to && isSameDay(date, range.to)
  }

  // Handle date selection
  const handleSelect = (date: Date) => {
    if (!onSelect) return
    
    if (mode === 'single') {
      onSelect(date)
    } else if (mode === 'multiple') {
      const dates = Array.isArray(selected) ? selected : []
      const isAlreadySelected = dates.some(d => isSameDay(d, date))
      
      if (isAlreadySelected) {
        onSelect(dates.filter(d => !isSameDay(d, date)))
      } else {
        onSelect([...dates, date])
      }
    } else if (mode === 'range') {
      if (!rangeSelectionStart) {
        // Start new range selection
        setRangeSelectionStart(date)
        onSelect({ from: date })
      } else {
        // Complete range selection
        const isFromAfterTo = date < rangeSelectionStart
        const range: DateRange = {
          from: isFromAfterTo ? date : rangeSelectionStart,
          to: isFromAfterTo ? rangeSelectionStart : date,
        }
        setRangeSelectionStart(null)
        onSelect(range)
      }
    }
  }

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date)
    const days: Array<{ date: Date | null; isOutside: boolean }> = []
    const daysInWeek = 7
    const firstDayOfMonth = getDay(start)

    // Add previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      if (showOutsideDays) {
        days.push({
          date: addDays(start, i - firstDayOfMonth),
          isOutside: true,
        })
      } else {
        days.push({ date: null, isOutside: true })
      }
    }

    // Add current month's days
    let currentDate = start
    while (format(currentDate, 'M') === format(start, 'M')) {
      days.push({ date: currentDate, isOutside: false })
      currentDate = addDays(currentDate, 1)
    }

    // Add next month's days to complete the grid
    const remainingDays = (daysInWeek - (days.length % daysInWeek)) % daysInWeek
    if (remainingDays > 0 && showOutsideDays) {
      for (let i = 0; i < remainingDays; i++) {
        days.push({
          date: addDays(currentDate, i),
          isOutside: true,
        })
      }
    }

    return days
  }

  return (
    <View
      className={`
        p-3 rounded-lg
        bg-surface dark:bg-surface-dark
        border border-border dark:border-border-dark
        ${className}
      `}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-md active:opacity-70"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDark ? '#E5E7EB' : '#374151'}
          />
        </TouchableOpacity>

        <Text
          className={`
            text-lg font-inter-medium
            ${isDark ? 'text-text-dark' : 'text-text'}
          `}
        >
          {format(currentMonth, 'MMMM yyyy')}
        </Text>

        <TouchableOpacity
          onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-md active:opacity-70"
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? '#E5E7EB' : '#374151'}
          />
        </TouchableOpacity>
      </View>

      {/* Calendar grid */}
      <View>
        {/* Weekday headers */}
        <View className="flex-row justify-between mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text
              key={day}
              className={`
                text-sm font-inter-medium text-center w-10
                ${isDark ? 'text-text-muted-dark' : 'text-text-muted'}
              `}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Days grid */}
        {chunk(getDaysInMonth(currentMonth), 7).map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between mb-1">
            {week.map(({ date, isOutside }, dayIndex) => {
              if (!date) {
                return (
                  <View
                    key={dayIndex}
                    className="w-10 h-10 items-center justify-center"
                  />
                )
              }

              const isToday = isSameDay(date, new Date())
              const selected = isSelected(date)
              const inRange = isInSelectedRange(date)
              const isStart = isRangeStart(date)
              const isEnd = isRangeEnd(date)
              const isDateDisabled = checkIsDisabled(date)

              return (
                <TouchableOpacity
                  key={dayIndex}
                  onPress={() => !isDateDisabled && handleSelect(date)}
                  disabled={isDateDisabled}
                  className={`
                    w-10 h-10 items-center justify-center
                    ${isStart ? 'rounded-l-md' : ''}
                    ${isEnd ? 'rounded-r-md' : ''}
                    ${(selected || isStart || isEnd) ? 'bg-primary rounded-md' : ''}
                    ${inRange ? 'bg-primary' : ''}
                    ${isToday && !selected && !inRange ? 'bg-background-subtle dark:bg-background-subtle-dark' : ''}
                    ${isDateDisabled ? 'opacity-50' : ''}
                  `}
                >
                  <Text
                    className={`
                      text-sm font-inter-medium
                      ${(selected || isStart || isEnd || inRange) ? 'text-white' : ''}
                      ${!selected && !isStart && !isEnd && !inRange && isDark ? 'text-text-dark' : 'text-text'}
                      ${isOutside ? 'opacity-50' : ''}
                    `}
                  >
                    {format(date, 'd')}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

// Helper function to chunk array into smaller arrays
function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce<T[][]>((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size))
    }
    return acc
  }, [])
}

export { Calendar }
