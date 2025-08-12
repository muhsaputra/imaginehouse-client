import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 mt-2 bg-white rounded shadow text-sm"
    >
      <div className="font-semibold">{task.title}</div>
      {task.description && (
        <div className="text-gray-600">{task.description}</div>
      )}
    </div>
  );
};

export default SortableItem;
