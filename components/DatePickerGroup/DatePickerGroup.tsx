'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormikContext } from 'formik';
import css from './DatePickerGroup.module.css';
import { CustomInput } from '../CustomInput/CustomInput';

interface TransactionFormValues {
  type: 'incomes' | 'expenses';
  date: string;
  time: string;
  category: string;
  sum: number | '';
  comment: string;
}

const pad = (num: number) => String(num).padStart(2, '0');

const buildDateFromValues = (date: string, time: string) => {
  if (!date) return null;

  const safeTime = time || '00:00';
  return new Date(`${date}T${safeTime}`);
};

export const DatePickerGroup = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<TransactionFormValues>();

  const selectedDate = buildDateFromValues(values.date, values.time);
  const selectedTime = buildDateFromValues(values.date, values.time);

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      setFieldValue('date', '');
      return;
    }

    const formattedDate = `${date.getFullYear()}-${pad(
      date.getMonth() + 1,
    )}-${pad(date.getDate())}`;

    setFieldValue('date', formattedDate);
  };

  const handleTimeChange = (date: Date | null) => {
    if (!date) {
      setFieldValue('time', '');
      return;
    }

    const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    setFieldValue('time', formattedTime);
  };

  return (
    <div className={css.group}>
      <div className={css.field}>
        <label className={css.label} htmlFor="transaction-date">
          Date
        </label>
        <DatePicker
          id="transaction-date"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          customInput={<CustomInput type="date" />}
          calendarClassName={css.myCalendar}
          maxDate={new Date()}
        />
        {errors.date && touched.date && (
          <span className={css.error}>{errors.date}</span>
        )}
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="transaction-time">
          Time
        </label>
        <DatePicker
          id="transaction-time"
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          customInput={<CustomInput type="time" />}
        />
        {errors.time && touched.time && (
          <span className={css.error}>{errors.time}</span>
        )}
      </div>
    </div>
  );
};
