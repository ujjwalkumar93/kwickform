"use client";
import { useState, useEffect } from "react";
import Sidebar from "../moclecule/Sidebar";
import BuildContainer from "../moclecule/BuildContainer";
import Header from "../moclecule/Header";
import {initialSections} from "../../constant/BuildContainer"


export default function CreateForm() {
  const [sections, setSections] = useState(initialSections);
  const [selectedComponent, setSelectedComponent] = useState(null);

useEffect(() => {
  console.log("!!!!!!!!!!!!! selectedComponent:sections ", selectedComponent, sections)
}, [selectedComponent, sections])

  const onDrop = ({targetType, targetSectionIndex, targetColumnIndex}) => {
    // console.log('Dropped on section:', targetType, targetSectionIndex, targetColumnIndex);
    let updatedSections = [...sections];
    console.log("!!!!!!!!!!!!!!: ", selectedComponent?.type, targetType, targetSectionIndex, targetColumnIndex)

    if(selectedComponent?.type === "section" && targetType === "section"){
      const [element] = updatedSections.splice(selectedComponent?.index, 1);
      updatedSections.splice(targetSectionIndex, 0, element); 
    }
    if(selectedComponent?.type === "row" && targetType === "section"){
      const componentToInsert = updatedSections?.[selectedComponent?.sectionIndex]?.columnList?.[selectedComponent?.columnIndex]
      updatedSections = updatedSections?.map((section, index) => {
        if(index === selectedComponent?.sectionIndex){
          section.columnList = section.columnList?.filter((col, ind) => ind !== selectedComponent?.columnIndex);
        }
        if(index === targetSectionIndex){
          section.columnList = [...section.columnList,componentToInsert]
        }
        return section;
      })

    }

    if(selectedComponent?.type === "field" && targetType === "row" ){
      updatedSections = updatedSections?.map((section, index) => {
        if(index === targetSectionIndex){
          console.log("############## @@")
          return section.columnList.map((colum, ind) => {
            if(ind === targetColumnIndex){
              console.log("############ map")
              return colum.fields.push(selectedComponent)
            }
          })
        }
        return section;
      })
    }
   
    setSections(updatedSections);
  };

  const handleSetActiveElement = (data) => {
    console.log('################ data', data )
  }
  
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar setSelectedComponent={setSelectedComponent} />
        {/* <Sidebar setSelectedComponent={handleSetActiveElement} /> */}
        <BuildContainer sections={sections} setSections={setSections} onDrop={onDrop} setSelectedComponent={setSelectedComponent} />
      </div>
    </div>
  );
}
