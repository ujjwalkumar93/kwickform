// "use client"
// import React, { useState } from 'react';
// import Button from '../components/atom/Button';
// import DatePicker from '../components/atom/DatePicker';
// import Radio from '../components/atom/Radio';
// import Checkbox from '../components/atom/Checkbox';
// import Dropdown from '../components/atom/Dropdown';

// const SampleForm = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [radioValue, setRadioValue] = useState('');
//   const [isChecked, setIsChecked] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSubmit = () => {
//     alert('Form submitted');
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Sample Form</h1>
        
//         <DatePicker 
//           selectedDate={selectedDate} 
//           onChange={(date) => setSelectedDate(date)} 
//         />
        
//         <Radio
//           label="Option 1"
//           name="radioGroup"
//           value="option1"
//           checked={radioValue === 'option1'}
//           onChange={(e) => setRadioValue(e.target.value)}
//         />
//         <Radio
//           label="Option 2"
//           name="radioGroup"
//           value="option2"
//           checked={radioValue === 'option2'}
//           onChange={(e) => setRadioValue(e.target.value)}
//         />
        
//         <Checkbox 
//           label="Accept Terms" 
//           checked={isChecked} 
//           onChange={(e) => setIsChecked(e.target.checked)} 
//         />
        
//         <Dropdown
//           label="Select an option"
//           options={[
//             { label: 'Option 1', value: 'option1' },
//             { label: 'Option 2', value: 'option2' },
//           ]}
//           selectedValue={selectedOption}
//           onChange={(e) => setSelectedOption(e.target.value)}
//         />

//         <Button 
//           label="Submit" 
//           onClick={handleSubmit} 
//         />
//       </div>
//     </div>
//   );
// };

// export default SampleForm;


// app/page.js'

"use client"

import ComponentCard from "../components/moclecule/ComponentCard";
import CoreRow from "../components/moclecule/CoreRow";

const HomePage = () => {
  const componentsList = [
    {
      type: 'button',
      name: 'Button Component',
      description: 'Triggers actions on click.',
    },
    {
      type: 'textfield',
      name: 'TextField Component',
      description: 'Accepts user input in a form.',
    },
    {
      type: 'checkbox',
      name: 'Checkbox Component',
      description: 'Allows users to select multiple options.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Component List</h1>
      <ComponentCard components={componentsList} />
      <CoreRow />
    </div>
  );
};

export default HomePage;

