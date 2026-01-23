'use client';

import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePickerComponent.css';

import { registerLocale } from 'react-datepicker';
import customEn from '../../helpers/locales/en-custom';

registerLocale('custom-en', customEn);

interface DateRangePickerProps {
  startName: string;
  endName: string;
  minDate?: Date;
}

export default function DateRangePickerComponent({
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
        locale="custom-en"
        dateFormat="dd/MM/yyyy"
        placeholderText="Booking date"
        minDate={minDate}
        className="
        w-[570px] h-12
        rounded-xl
        px-5 py-3
        bg-gray-50
        border border-transparent outline-none
        text-base font-medium
        text-gray-700
        placeholder:text-gray-400
        hover:bg-gray-100
        focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
        transition-all duration-200
      "
      />

      {touched[startName] && errors[startName] && (
        <p className="text-red-500 mt-1 text-sm font-medium">
          {errors[startName] as string}
        </p>
      )}
      {touched[endName] && errors[endName] && (
        <p className="text-red-500 mt-1 text-sm font-medium">
          {errors[endName] as string}
        </p>
      )}
    </>
  );
}
