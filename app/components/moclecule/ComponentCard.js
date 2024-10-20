"use client"
// app/components/ComponentCard.js

// import { CursorArrowRaysIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// const icons = {
//   button: <CursorArrowRaysIcon className="w-8 h-8 text-blue-600" />,
//   textfield: <PencilIcon className="w-8 h-8 text-green-600" />,
//   checkbox: <CheckCircleIcon className="w-8 h-8 text-purple-600" />,
//   // Add more icons as necessary
// };

// const ComponentCard = ({ components }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {components.map((component) => (
//         <div
//           key={component.type}
//           className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center text-center"
//         >
//           {/* Icon */}
//           <div className="mb-4">
//             {icons[component.type]}
//           </div>
          
//           {/* Component Name */}
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {component.name}
//           </h3>
          
//           {/* Description */}
//           <p className="text-gray-600 text-sm">
//             {component.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ComponentCard;


import React from 'react';

// Import your components
import Button from '../atom/Button';
import TextField from '../atom/TextField';
import Checkbox from '../atom/Checkbox';
import Dropdown from '../atom/Dropdown';

const componentsList = [
  { 
    id: 1, 
    type: 'button', 
    name: 'Button', 
    description: 'A clickable button component.', 
    component: <Button />
  },
  { 
    id: 2, 
    type: 'textfield', 
    name: 'TextField', 
    description: 'A simple text input field.', 
    component: <TextField />
  },
  { 
    id: 3, 
    type: 'checkbox', 
    name: 'Checkbox', 
    description: 'A basic checkbox component.', 
    component: <Checkbox />
  }
  ,
  { 
    id: 4, 
    type: 'dropdown', 
    name: 'Dropdown', 
    description: 'A dropdown menu for selection.', 
    component: <Dropdown />
  }
];

const ComponentCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {componentsList.map((item) => (
        <div key={item.id} className="flex bg-white p-4 shadow-md rounded-lg">
          {/* First column: Render the actual component */}
          <div className="w-1/2 flex justify-center items-center">
            {item.component}
          </div>

          {/* Second column: Component name and description */}
          <div className="w-1/2 pl-4">
            <div className="text-lg font-bold mb-2">{item.name}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentCard;

