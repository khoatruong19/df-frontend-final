'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

type DatePickerProps = {
  triggerElement: React.ReactNode;
  setValue: (dateString: string) => void;
};

export function DatePicker({ triggerElement, setValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(true);

  const selectDate = (date?: Date) => {
    if (!date) return;
    setDate(date);
    setValue(format(date, 'dd/MM/yyyy'));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={selectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
