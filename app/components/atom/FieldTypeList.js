"use client"
import { useState } from "react";
import { FIELD_TYPE_LIST } from "../../constant/fieldtype";

export const FieldTypeList = ({setSelectedComponent}) => {
  return (
    <div>
      {FIELD_TYPE_LIST?.map((field, index) => {
        return (
          <div
            className="bg-white p-3 mb-4 shadow-md rounded-lg cursor-pointer text-neutral-800"
            draggable
            onDragStart={() => setSelectedComponent({index, field, ...{isSection:false}})}
            onDragEnd={() => setSelectedComponent(null)}
            key={index}
          >
            {field.fieldType}
          </div>
        );
      })}
    </div>
  );
};
