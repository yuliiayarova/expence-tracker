import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './DatePickerGroup.module.css';
import { CustomInput } from '../CustomInput/CustomInput';

export const DatePickerGroup = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className={css.group}>
      <div className={css.field}>
        <label className={css.label}>Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          placeholderText="mm/dd/yyyy"
          dateFormat="MM/dd/yyyy"
          strictParsing
          shouldCloseOnSelect={true}
          customInput={<CustomInput type="date" />}
          calendarClassName={css.myCalendar}
          
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Time</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          placeholderText="00:00:00"
          timeCaption="Time"
          dateFormat="HH:mm:ss"
          customInput={<CustomInput type="time" />}
        />
      </div>
    </div>
  );
}; 
