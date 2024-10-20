
// "use client";
// import { useState } from "react";

// export const DropArea = ({ onDrop }) => {
//   const [showDrop, setShowDrop] = useState(false);

//   return (
//     <div
//       className={`flex-grow ${showDrop ? 'bg-gray-200' : ''}`}
//       onDragEnter={() => setShowDrop(true)}
//       onDragLeave={() => setShowDrop(false)}
//       onDrop={() => {
//         onDrop();
//         setShowDrop(false);
//       }}
//       onDragOver={(e) => {
//         e.preventDefault();
//       }}
//     >
//       <div className="flex items-center justify-center h-full text-gray-600">
//         {showDrop ? <span>Drop here</span> : null}
//       </div>
//     </div>
//   );
// };


"use client";
import { useState } from "react";

export const DropArea = ({ onDrop}) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className={`flex-grow ${showDrop ? 'bg-gray-200' : ''} `}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex items-center justify-center h-full text-gray-600">
        {showDrop ? <span>Drop here</span> : null}
      </div>
    </div>
  );
};
