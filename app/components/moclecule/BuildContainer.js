"use client";

import React, { useState, useEffect, useRef } from "react";
import { DropArea } from "./DropArea";
import {
  PlusIcon,
  EllipsisHorizontalIcon,
  ArrowsPointingOutIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const BuildContainer = ({
  sections,
  setSections,
  onDrop,
  setSelectedComponent,
}) => {
  // const [sections, setSections] = useState(initialSections);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
  const [confirmDeleteSection, setConfirmDeleteSection] = useState(false);
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(null);
  const dropdownRef = useRef(null);

  const handleInsertColumn = (sectionIndex) => {
    const newColumn = {
      id: `col-${sections[sectionIndex].columnList.length + 1}`,
      displayOrder: sections[sectionIndex].columnList.length + 1,
      columnName: `Column ${sections[sectionIndex].columnList.length + 1}`,
      fields: [],
    };

    const newSections = [...sections];
    newSections[sectionIndex].columnList.push(newColumn);
    setSections(newSections);
  };

  const handleAddSection = () => {
    const newSection = {
      id: `sec-${sections.length + 1}`,
      displayOrder: sections.length + 1,
      sectionName: `Section ${sections.length + 1}`,
      columnList: [
        {
          id: `col-1`,
          displayOrder: 1,
          columnName: `Section ${sections.length + 1} - Column 1`,
          fields: [],
        },
      ],
    };
    setSections([...sections, newSection]);
  };

  const handleToggleDropdown = (index) => {
    setCurrentSectionIndex(index);
    setDropdownOpen((prev) => !prev);
  };

  const handleInsertSectionAbove = () => {
    if (currentSectionIndex !== null) {
      const newSection = {
        id: `sec-${currentSectionIndex}-above`,
        displayOrder: currentSectionIndex,
        sectionName: `Section Above ${currentSectionIndex + 1}`,
        columnList: [
          {
            id: `sec-${currentSectionIndex}-above-col-1`,
            displayOrder: 1,
            columnName: `Column 1`,
            fields: [],
          },
        ],
      };
      const newSections = [...sections];
      newSections.splice(currentSectionIndex, 0, newSection);
      setSections(newSections);
    }
  };

  const handleInsertSectionBelow = () => {
    if (currentSectionIndex !== null) {
      const newSection = {
        id: `sec-${currentSectionIndex + 1}-below`,
        displayOrder: currentSectionIndex + 2,
        sectionName: `Section Below ${currentSectionIndex + 2}`,
        columnList: [
          {
            id: `sec-${currentSectionIndex + 1}-below-col-1`,
            displayOrder: 1,
            columnName: `Column 1`,
            fields: [],
          },
        ],
      };
      const newSections = [...sections];
      newSections.splice(currentSectionIndex + 1, 0, newSection);
      setSections(newSections);
    }
  };

  const handleDeleteSection = () => {
    if (currentSectionIndex !== null) {
      setConfirmDeleteSection(true);
    }
  };

  const confirmDeleteSectionHandler = () => {
    if (currentSectionIndex !== null) {
      const newSections = sections.filter(
        (_, index) => index !== currentSectionIndex
      );
      setSections(newSections);
      setConfirmDeleteSection(false);
    }
  };

  const handleDeleteColumn = (sectionIndex, colIndex) => {
    setConfirmDeleteColumn({ sectionIndex, colIndex });
  };

  const confirmDeleteColumnHandler = () => {
    if (confirmDeleteColumn) {
      const { sectionIndex, colIndex } = confirmDeleteColumn;
      const newSections = [...sections];
      newSections[sectionIndex].columnList.splice(colIndex, 1);
      setSections(newSections);
      setConfirmDeleteColumn(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setCurrentSectionIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDrop = (a, b) => {
    if (onDrop) {
      onDrop(a, b);
    }
  };

  return (
    <div className="w-[85%] h-screen bg-gray-50 p-4 overflow-auto shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-neutral-800">Page Configuration</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75">
            Cancel
          </button>
          <button className="px-4 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
            Save
          </button>
        </div>
      </div>

      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-white border border-gray-300 p-3 rounded-lg min-h-[300px] mb-4"
          draggable
          onDragStart={() =>
            setSelectedComponent({ type: "section", index: sectionIndex })
          }
          onDragEnd={() => setSelectedComponent(null)}

          onDrop={(e) => {
            e.preventDefault();
            onDrop({targetType: "section", targetSectionIndex: sectionIndex});
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {/* <DropArea onDrop={() => handleDrop(section?.id, null)} /> */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={section.sectionName}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[sectionIndex].sectionName = e.target.value;
                  setSections(newSections);
                }}
                placeholder="Enter section name"
                className="text-lg text-neutral-700 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end items-center space-x-2">
              <button
                onClick={() => handleInsertColumn(sectionIndex)}
                className="inline-flex items-center px-2 py-1 text-sm text-gray-800 border border-gray-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75"
              >
                <PlusIcon className="h-3 w-3 mr-1" />
                Insert Column
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => handleToggleDropdown(sectionIndex)}
                  className="inline-flex items-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
                >
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </button>
                {dropdownOpen && currentSectionIndex === sectionIndex && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <ul>
                      <li
                        onClick={handleInsertSectionAbove}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 whitespace-nowrap"
                      >
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        Insert section above
                      </li>
                      <li
                        onClick={handleInsertSectionBelow}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 whitespace-nowrap"
                      >
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        Insert section below
                      </li>
                      <li
                        onClick={handleDeleteSection}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600 whitespace-nowrap"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap space-x-4">
            {section.columnList.map((col, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col border border-gray-300 bg-gray-100 p-2 rounded-md min-h-[250px] flex-1"
                draggable
                onDragStart={(e) => { 
                  e.stopPropagation()
                  setSelectedComponent({ type: "row", sectionIndex: sectionIndex, columnIndex: colIndex })
                }}
                onDragEnd={() => setSelectedComponent(null)}
                style={{
                  zIndex: 1000
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <input
                    type="text"
                    value={col.columnName}
                    onChange={(e) => {
                      const newSections = [...sections];
                      newSections[sectionIndex].columnList[
                        colIndex
                      ].columnName = e.target.value;
                      setSections(newSections);
                    }}
                    className="text-gray-600 border border-gray-300 rounded-md p-1"
                    style={{
                      width: "100%",
                      minWidth: "150px",
                      maxWidth: "250px",
                    }}
                  />
                  <div className="flex ml-2">
                    <button
                      onClick={() => handleDeleteColumn(sectionIndex, colIndex)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {col?.fields?.map((e) => {
                  return <h1 className="text-gray-800">{e?.fieldType}</h1>;
                })}
                <DropArea onDrop={() => handleDrop(section?.id, col?.id)} />
              </div>
            ))}
          </div>
          <DropArea onDrop={() => handleDrop(section?.id, null)} />
        </div>
      ))}

      {confirmDeleteSection && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="text-lg">
              Are you sure you want to delete this section?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDeleteSection(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSectionHandler}
                className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteColumn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="text-lg text-gray-600">
              Are you sure you want to delete this column?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDeleteColumn(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteColumnHandler}
                className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleAddSection}
          className="inline-flex items-center px-2 py-1 text-sm text-blue-600 border border-gray-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75"
        >
          <PlusIcon className="h-3 w-3 mr-1 text-blue-600" />
          Add Section
        </button>
      </div>
    </div>
  );
};

export default BuildContainer;
