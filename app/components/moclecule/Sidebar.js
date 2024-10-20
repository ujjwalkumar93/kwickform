"use client";
import React from "react";
import {FieldTypeList} from "../atom/FieldTypeList";

const Sidebar = ({ setSelectedComponent }) => {
  return (
    <div className="w-[15%] h-screen bg-gray-50 p-6 overflow-auto shadow-inner">
      <h2 className="text-xl  mb-6 text-neutral-800">Components</h2>
      <FieldTypeList setSelectedComponent={setSelectedComponent}/>
    </div>
  );
};

export default Sidebar;
