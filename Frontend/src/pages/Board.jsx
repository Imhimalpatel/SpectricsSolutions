import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";

const Board = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "First Task", description: "Sample", status: "todo" },
    { id: "2", title: "Second Task", description: "Sample", status: "todo" },
    { id: "3", title: "Third Task", description: "Sample", status: "todo" },
  ]);

  // ✅ Delete handler
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Button Move handler
  const handleMove = (id, direction) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          if (direction === "previous") {
            if (task.status === "inprogress") return { ...task, status: "todo" };
            if (task.status === "done") return { ...task, status: "inprogress" };
          } else if (direction === "next") {
            if (task.status === "todo") return { ...task, status: "inprogress" };
            if (task.status === "inprogress") return { ...task, status: "done" };
          }
        }
        return task;
      })
    );
  };

  // ✅ Drag handler
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // dropped outside

    // If dropped in same place → no change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  const columns = ["todo", "inprogress", "done"];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6">
        {columns.map((col) => (
          <Column
            key={col}
            columnId={col}
            title={col.toUpperCase()}
            tasks={tasks.filter((task) => task.status === col)}
            onDelete={handleDelete}
            onMove={handleMove}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
 