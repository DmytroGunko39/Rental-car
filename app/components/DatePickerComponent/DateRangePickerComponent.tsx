'use client';

import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';
import { start } from 'repl';

interface DateRangePickerProps {
  startName: string;
  endName: string;
  minDate?: Date;
}

export default function DatepickerComponent({
  startName,
  endName,
  minDate,
}: DateRangePickerProps) {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();

  const startDate: Date | null = values[startName];
  const endDate: Date | null = values[endName];

  return (
    <>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(dates: [Date | null, Date | null]) => {
          const [start, end] = dates;
          setFieldValue(startName, start);
          setFieldValue(endName, end);
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText="Booking date"
        minDate={minDate}
        className="
        w-[570px] h-[48px]
        rounded-[12px]
        px-5 py-3
        bg-[#f7f7f7]
        border-none outline-none
        text-[16px] font-medium
        text-[#8d929a]
        hover:bg-[#e2e0e0]
        focus:bg-[#e2e0e0]
        focus:text-[#4e5055]
        transition
      "
      />

      {touched[startName] && errors[startName] && (
        <p className="text-[#2e398a] mt-1 text-sm">
          {errors[startName] as string}
        </p>
      )}
      {touched[endName] && errors[endName] && (
        <p className="text-[#2e398a] mt-1 text-sm">
          {errors[endName] as string}
        </p>
      )}
    </>
  );
}
