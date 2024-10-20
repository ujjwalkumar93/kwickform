"use client";
import { useState, useEffect } from "react";
import Sidebar from "../moclecule/Sidebar";
import BuildContainer from "../moclecule/BuildContainer";
import Header from "../moclecule/Header";
import {initialSections} from "../../constant/BuildContainer"


export default function CreateForm() {
  const [sections, setSections] = useState(initialSections);
  const [selectedComponent, setSelectedComponent] = useState(null);



  const onDrop = ({targetType, targetSectionIndex, targetColumnIndex}) => {
    console.log('Dropped on section:', targetType, targetSectionIndex, targetColumnIndex);
    let updatedSections = [...sections];

    if(selectedComponent?.type === "section" && targetType === "section"){
      const [element] = updatedSections.splice(selectedComponent?.index, 1);
      updatedSections.splice(targetSectionIndex, 0, element); 
    }
    if(selectedComponent?.type === "row" && targetType === "section"){
      const componentToInsert = updatedSections?.[selectedComponent?.sectionIndex]?.columnList?.[selectedComponent?.columnIndex]
      updatedSections = updatedSections?.map((section, index) => {
        const x = section.columnList?.filter((col, ind) => ind === selectedComponent?.columnIndex)
        console.log('########## x', x)
        if(index === selectedComponent?.sectionIndexs){
          section.columnList = section.columnList?.filter((col, ind) => ind !== selectedComponent?.columnIndex)
        }
        if(index === targetSectionIndex){
          section.columnList = [...section.columnList,componentToInsert]
        }
        return section;
      })

    }
   
    console.log('Updated sections:', updatedSections);
    setSections(updatedSections);
  };

  const handleSetActiveElenet = (data) => {
    // console.log('################ data', data )
  }
  
  return (
    <div>
      <Header />
      <div className="flex">
        {/* <Sidebar setSelectedComponent={setSelectedComponent} /> */}
        <Sidebar setSelectedComponent={handleSetActiveElenet} />
        <BuildContainer sections={sections} setSections={setSections} onDrop={onDrop} setSelectedComponent={setSelectedComponent} />
      </div>
    </div>
  );
}
