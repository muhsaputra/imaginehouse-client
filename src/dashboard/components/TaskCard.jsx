import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded shadow p-2 mb-2">
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskCard;
