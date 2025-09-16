import TaskCard from "../components/TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const Column = ({ columnId, title, tasks, onDelete, onMove }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-72">
      <h2 className="font-bold text-lg mb-4">{title}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
