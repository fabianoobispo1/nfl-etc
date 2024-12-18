'use client'
import { addDays, format, startOfDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Calendar } from './calendar'
import { FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

export function DatePickerWithDisabledRange() {
  const [date, setDate] = useState<Date | undefined>()
  const fromDate = new Date()
  const toDate = addDays(fromDate ?? new Date(), 5)
  const disabled = (date: Date) =>
    startOfDay(date) < startOfDay(fromDate) ||
    startOfDay(date) > startOfDay(toDate)

  return (
    <FormItem className="flex flex-col">
      <Label id="datepicker-disabled-range-v9">
        Datepicker With Disabled Range
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            aria-labelledby="datepicker-disabled-range-v9"
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            hideNavigation={false}
            selected={date}
            onSelect={setDate}
            showOutsideDays={true}
            endMonth={new Date(2099, 11)}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      <span className="text-[0.8rem] text-muted-foreground">
        Only dates within 5 days should be enabled.
      </span>
    </FormItem>
  )
}
