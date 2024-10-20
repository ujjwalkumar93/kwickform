import React from 'react';

const Radio = ({ label, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-blue-500"
      />
      <label className="ml-2 text-gray-700">{label}</label>
    </div>
  );
};

export default Radio;
