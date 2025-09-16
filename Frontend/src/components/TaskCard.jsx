import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index, onDelete, onMove }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-50 p-4 rounded-lg shadow-sm mb-3 flex justify-between items-center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>

          <div className="flex gap-2">
            {/* Previous */}
            <button
              onClick={() => onMove(task.id, "previous")}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ◀
            </button>

            {/* Next */}
            <button
              onClick={() => onMove(task.id, "next")}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              ▶
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(task.id)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
