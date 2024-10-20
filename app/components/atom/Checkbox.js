import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-blue-500"
      />
      <label className="ml-2 text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;
