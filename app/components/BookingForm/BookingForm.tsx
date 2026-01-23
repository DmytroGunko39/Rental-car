'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SendBtn from '../SendBtn/SendBtn';
import { Slide, toast } from 'react-toastify';
import { Car } from '../../types/car';
import DateRangePickerComponent from '../DateRangePickerComponent/DateRangePickerComponent';

interface BookingFormProps {
  car: Car;
}

interface FormValues {
  name: string;
  email: string;
  bookingStartDate: Date | null;
  bookingEndDate: Date | null;
  comment: string;
}

export default function BookingForm({ car }: BookingFormProps) {
  const initialValues: FormValues = {
    name: '',
    email: '',
    bookingStartDate: null,
    bookingEndDate: null,
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingStartDate: Yup.date()
      .nullable()
      .required('Start date date is required'),
    bookingEndDate: Yup.date()
      .nullable()
      .required('End date date is required')
      .min(
        Yup.ref('bookingStartDate'),
        'End date must be the same or after start date',
      ),
  });

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    toast(`Thank you, ${values.name}. Our manager will contact you shortly.`, {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      transition: Slide,
    });

    resetForm();
  };

  return (
    <div
      className="
        flex flex-col gap-6
        border border-gray-200
        rounded-2xl
        p-8
        w-full 
        bg-white
        shadow-sm
      "
    >
      {/* Header text */}
      <div className="mb-4">
        <p className="text-xl font-bold leading-tight text-gray-900 mb-2">
          Book your car now
        </p>
        <p className="text-base font-medium leading-relaxed text-gray-500">
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form
          className="
            flex flex-col items-center justify-center
            gap-8 w-full
          "
        >
          {/* Name */}
          <Field
            name="name"
            placeholder="Name*"
            className="
                w-full
                h-12
                rounded-xl
                px-5
                py-3
                text-base font-medium
                border border-transparent outline-none
                bg-gray-50
                text-gray-700
                placeholder:text-gray-400
                hover:bg-gray-100
                focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                transition-all duration-200
              "
          />
          <ErrorMessage
            name="name"
            component="p"
            className="text-red-500 mt-1 text-sm font-medium"
          />

          {/* Email */}
          <Field
            name="email"
            placeholder="Email*"
            className="
                w-full
                h-12
                rounded-xl
                px-5
                py-3
                text-base font-medium
                border border-transparent outline-none
                bg-gray-50
                text-gray-700
                placeholder:text-gray-400
                hover:bg-gray-100
                focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                transition-all duration-200
              "
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-red-500 mt-1 text-sm font-medium"
          />

          <DateRangePickerComponent
            startName="bookingStartDate"
            endName="bookingEndDate"
            minDate={new Date()}
          />

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className="
                w-full
                h-24
                rounded-xl
                px-5
                pt-3 pb-3 
                text-base font-medium
                border border-transparent outline-none
                bg-gray-50
                text-gray-700
                placeholder:text-gray-400
                hover:bg-gray-100
                focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                transition-all duration-200
                resize-none
              "
          />

          {/* Submit Button */}
          <SendBtn />
        </Form>
      </Formik>
    </div>
  );
}
