// "use client"; // Ensure this component is rendered on the client-side

// import React, { useState, useEffect, useRef } from "react";
// import { DndProvider, useDrop, useDrag } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const ItemTypes = {
//   COMPONENT: "component",
// };

// // Sample components for the sidebar
// const initialComponents = [
//   { id: "1", content: "TextField" },
//   { id: "2", content: "DatePicker" },
//   { id: "3", content: "TextArea" },
// ];


// // const DraggableComponent = ({ item, index, moveComponent }) => {
// //   const ref = useRef(null);

// //   // Handle drop behavior
// //   const [{ handlerId }, drop] = useDrop({
// //     accept: ItemTypes.COMPONENT,
// //     collect(monitor) {
// //       return {
// //         handlerId: monitor.getHandlerId(),
// //       };
// //     },
// //     hover(draggedItem, monitor) {
// //       console.log("hovering...", draggedItem);
    
// //       if (!ref.current) return;
    
// //       const dragIndex = draggedItem.index;
// //       const hoverIndex = index;
    
// //       // Log to check both indices
// //       console.log("Drag Index:", dragIndex, "Hover Index:", hoverIndex);
    
// //       // Prevent replacing item with itself
// //       // if (dragIndex === hoverIndex) {
// //       //   console.log("Same indices - skipping move");
// //       //   return;
// //       // }
    
// //       // Determine the bounding rectangle of the hover component
// //       const hoverBoundingRect = ref.current?.getBoundingClientRect();
    
// //       // Get vertical middle
// //       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
// //       // Determine mouse position
// //       const clientOffset = monitor.getClientOffset();
    
// //       // Get pixels to the top
// //       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
// //       // Dragging downwards: only move when the cursor is below 50%
// //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
    
// //       // Dragging upwards: only move when the cursor is above 50%
// //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
    
// //       // Perform the move
// //       // console.log("Moving component from", dragIndex, "to", hoverIndex);
// //       // if(moveComponent){
// //       //   moveComponent(dragIndex, hoverIndex);
// //       // }
      
    
// //       // Update the dragged item's index to prevent infinite reordering
// //       draggedItem.index = hoverIndex;
// //       // console.log("Updated dragged item index to", hoverIndex);
// //     },
// //     isDragging(monitor){
// //       console.log("%%%%%%%%%%%%%%%% ", monitor)
// //     }

    
    
// //   });

// //   // Handle drag behavior
// //   const [{ isDragging }, drag] = useDrag({
// //     type: ItemTypes.COMPONENT,
// //     item: { id: item.id, content: item.content, index }, // pass the id and current index of the item
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging(),
// //     }),
// //   });

// //   // Apply drag and drop refs
// //   drag(drop(ref));

// //   const opacity = isDragging ? 0.5 : 1;

// //   return (
// //     <div
// //       ref={ref}
// //       className="text-neutral-800"
// //       style={{
// //         opacity,
// //         padding: "8px",
// //         margin: "4px",
// //         backgroundColor: isDragging ? "#e0e0e0" : "#fff",
// //         border: "1px solid #ccc",
// //         borderRadius: "4px",
// //         cursor: "move",
// //       }}
// //       data-handler-id={handlerId}
// //     >
// //       {item.content}
// //     </div>
// //   );
// // };

// const DraggableComponent = ({ item, index, moveComponent }) => {
//   const ref = useRef(null);

//   const [, drop] = useDrop({
//     accept: ItemTypes.COMPONENT,
//     hover(draggedItem, monitor) {
//       // console.log("######## start", ref)
//       if (!ref.current) return;

//       const dragIndex = draggedItem.index;
//       const hoverIndex = index;

//       // Prevent replacing item with itself
//       console.log('############### dragindex hover index: ',dragIndex, hoverIndex)
//       // if (dragIndex === hoverIndex) return;

//       // Determine the bounding rectangle of the hover component
//       const hoverBoundingRect = ref.current.getBoundingClientRect();

//       // Get vertical middle
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       console.log("############## 00", hoverMiddleY)

//       // Determine mouse position
//       const clientOffset = monitor.getClientOffset();

//       // Get pixels to the top
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//       console.log('##############1')

//       // Only move when the mouse has crossed half of the component height
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

//       // Move the component
//       moveComponent(dragIndex, hoverIndex);

//       // Update the dragged item's index
//       draggedItem.index = hoverIndex;

//       // Log the indices
//       console.log(`DragIndex: ${dragIndex}, HoverIndex: ${hoverIndex}`);
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.COMPONENT,
//     item: { id: item.id, index }, // pass the id and current index of the item
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   // Apply drag and drop refs
//   drag(drop(ref));

//   const opacity = isDragging ? 0.5 : 1;

//   return (
//     <div
//       ref={ref}
//       style={{
//         opacity,
//         padding: "8px",
//         margin: "4px",
//         backgroundColor: "#fff",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         cursor: "move",
//       }}
//     >
//       {item.content} (Index: {index}) {/* Display current index */}
//     </div>
//   );
// };

// const DroppableArea = ({ components, setDroppedComponents }) => {
//   const componentsRef = useRef(components);
//   useEffect(() => {
//     componentsRef.current = components;
//   }, [components]);
//   const moveComponent = (dragIndex, hoverIndex) => {
//     console.log("moving....");
//     const draggedItem = components[dragIndex];
//     const updatedComponents = [...components];
//     updatedComponents.splice(dragIndex, 1);
//     updatedComponents.splice(hoverIndex, 0, draggedItem);
//   };

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: ItemTypes.COMPONENT,
//     drop: (droppedItem) => {
//       // console.log("@@@@", droppedItem);
//       const currentComponents = componentsRef.current;
//       if (droppedItem && droppedItem.id) {
//         const isAlreadyDropped = currentComponents.find(
//           (component) => component.id === droppedItem.id
//         );

//         // if (!isAlreadyDropped) {
//           if (1 > 0) {
//           setDroppedComponents((prev) => [
//             ...prev,
//             { id: droppedItem.id, content: droppedItem.content },
//           ]);
//         }
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       style={{
//         flexGrow: 1,
//         backgroundColor: "#e0e0e0",
//         padding: "20px",
//         borderRadius: "5px",
//         position: "relative",
//       }}
//     >
//       <h4 className="text-neutral-800">Main Page</h4>
//       {components.map((item, index) => (
//         <DraggableComponent
//           key={item.id}
//           item={item}
//           index={index}
//           moveComponent={moveComponent}
//         />
//       ))}
//       {isOver && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.1)",
//             border: "1px dashed #ccc",
//             zIndex: 1,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// function DragAndDrop() {
//   const [droppedComponents, setDroppedComponents] = useState([]);
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div
//         style={{ display: "flex", gap: "20px", height: "100vh" }}
//         className="bg-gray-200"
//       >
//         {/* Sidebar for draggable components */}
//         <div
//           style={{
//             width: "250px",
//             backgroundColor: "#f0f0f0",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           <h4 className="text-neutral-800">Components</h4>
//           {initialComponents.map((item) => (
//             <DraggableComponent key={item.id} item={item} index={item.id} />
//           ))}
//         </div>
//         <DroppableArea
//           components={droppedComponents}
//           setDroppedComponents={setDroppedComponents}
//         />
//       </div>
//     </DndProvider>
//   );
// }

// export default DragAndDrop;
