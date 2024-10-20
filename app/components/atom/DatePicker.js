import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ selectedDate, onChange }) => {
  return (
    <div className="mb-4">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        className="w-full py-2 px-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DatePickerComponent;
