'use client'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Calendar } from './calendar'
import { FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
export function DatePickerWithDefaults() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <FormItem className="flex flex-col">
      <Label id="datepicker-default-range-v9">Datepicker With Defaults</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            aria-labelledby="datepicker-default-range-v9"
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays={true}
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  )
}
