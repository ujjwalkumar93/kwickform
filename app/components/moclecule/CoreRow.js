"use client";
import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ALL_FIELD_TYPE } from "@/app/constant/BuildContainer";

const CoreRow = ({ fieldType }) => {
    console.log("fieldType: 11 ", fieldType)
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const types = [...ALL_FIELD_TYPE]; // Example types for the dropdown

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Input for Name */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
          placeholder="Enter name"
        />
      </div>

      {/* Dropdown for Type */}
      <div className="flex-1 mx-4">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={fieldType}
          onChange={(e) => setType(e.target.value?.label)}
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-700"
        >
          {/* <option value="" disabled>Select type</option> */}
          {types.map((type, index) => (
            <option key={index} value={type} className="text-gray-700">
              {type?.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text View */}
      {/* <div className="flex-1">
        <span className="block text-sm font-medium text-gray-700">Name</span>
        <p className="text-gray-600">{name.trim().replace(/ /g, '_')}</p>
      </div> */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name.trim().replace(/ /g, "_")}
          className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-700 bg-gray-200"
          readOnly
        />
      </div>

      <div className="relative">
        <button className="flex items-center justify-center text-gray-600 hover:text-gray-900 px-4 py-2">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CoreRow;
