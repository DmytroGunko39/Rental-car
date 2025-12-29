'use client';

import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';

interface DatepickerProps {
  name: string;
  minDate?: Date;
}

export default function DatepickerComponent({
  name,
  minDate,
}: DatepickerProps) {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  return (
    <>
      <DatePicker
        selected={field.value}
        onChange={(val: Date | null) => setFieldValue(name, val)}
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
      {meta.touched && meta.error && (
        <p className="text-[#2e398a] mt-1 text-sm">{meta.error}</p>
      )}
    </>
  );
}
