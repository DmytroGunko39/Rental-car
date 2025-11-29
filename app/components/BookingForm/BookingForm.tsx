'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import SendBtn from '../SendBtn/SendBtn';

import { Slide, toast } from 'react-toastify';
import { Car } from '../../types/car';
import DatepickerComponent from '../DatePickerComponent/DatepickerComponent';

interface BookingFormProps {
  car: Car;
}

interface FormValues {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

export default function BookingForm({ car }: BookingFormProps) {
  const initialValues: FormValues = {
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.string().required('Booking date is required'),
  });

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    toast(`Thank you, ${values.name}. Our manager will contact you shortly.`, {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      transition: Slide,
    });

    resetForm();
  };

  return (
    <div
      className="
        flex flex-col gap-6
        border border-[#dadde1]
        rounded-[10px]
        p-8
        w-full 
        bg-white
      "
    >
      {/* Header text */}
      <div className="mb-4">
        <p className="text-[20px] font-semibold leading-[1.2] text-[#101828] mb-2">
          Book your car now
        </p>
        <p className="text-[16px] font-medium leading-[1.25] text-[#8d929a]">
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
                h-[48px]
                rounded-[12px]
                px-5
                py-3
                text-[16px] font-medium
                border-none outline-none
                bg-[#f7f7f7]
                text-[#8d929a]
                hover:bg-[#e2e0e0]
                focus:bg-[#e2e0e0]
                focus:text-[#4e5055]
                transition
              "
          />
          <ErrorMessage
            name="name"
            component="p"
            className="text-[#2e398a] mt-1 text-sm"
          />

          {/* Email */}

          <Field
            name="email"
            placeholder="Email*"
            className="
                w-full
                h-[48px]
                rounded-[12px]
                px-5
                py-3
                text-[16px] font-medium
                border-none outline-none
                bg-[#f7f7f7]
                text-[#8d929a]
                hover:bg-[#e2e0e0]
                focus:bg-[#e2e0e0]
                focus:text-[#4e5055]
                transition
              "
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-[#2e398a] mt-1 text-sm"
          />

          <DatepickerComponent name="bookingDate" minDate={new Date()} />

          <Field
            name="comment"
            placeholder="Comment"
            className="
                w-full
                h-[48px]
                rounded-[12px]
                px-5
                py-3
                text-[16px] font-medium
                border-none outline-none
                bg-[#f7f7f7]
                text-[#8d929a]
                hover:bg-[#e2e0e0]
                focus:bg-[#e2e0e0]
                focus:text-[#4e5055]
                transition
              "
          />

          {/* Submit Button */}
          <SendBtn />
        </Form>
      </Formik>
    </div>
  );
}
