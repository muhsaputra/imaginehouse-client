import React, { useState, useRef } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DrawerButton } from "@/components/ui/DrawerButton";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const KanbanBoard = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/task");
      return res.data.tasks || [];
    },
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [addTaskData, setAddTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
  });

  const inputRef = useRef(null);

  const addTask = useMutation({
    mutationFn: async (newTask) => {
      const res = await axios.post("/api/v1/task", newTask);
      return res.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["calendarEvents"]);
      toast.success("Task added");
    },
  });

  const updateTask = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await axios.patch(
        `/api/v1/task/${updatedTask._id}`,
        updatedTask
      );
      return res.data.task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["calendarEvents"]);
      toast.success("Task updated");
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (task) => {
      if (!task || !task._id) {
        throw new Error("Task is missing _id");
      }

      if (task.createdFrom === "calendar") {
        await axios.delete(`/api/v1/calendar/${task._id}`);
      }

      await axios.delete(`/api/v1/task/${task._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["calendarEvents"]);
      toast.success("Task deleted");
    },
  });

  const statuses = ["To Do", "In Progress", "Review", "Done"];

  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {});

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = groupedTasks[source.droppableId];
    const draggedTask = sourceList[source.index];
    if (!draggedTask) return;

    try {
      await axios.patch(`/api/v1/task/${draggedTask._id}`, {
        status: destination.droppableId,
      });
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["calendarEvents"]);
      toast.success("Task status updated");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const openAddTaskModal = (status) => {
    setAddTaskData({
      title: "",
      description: "",
      dueDate: "",
      status,
    });
    setShowAddTaskModal(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    await addTask.mutateAsync(addTaskData);
    setShowAddTaskModal(false);
    setAddTaskData({
      title: "",
      description: "",
      dueDate: "",
      status: "To Do",
    });
  };

  const handleEditTaskSubmit = async (updatedTask, closeDrawer) => {
    console.log("updatedTask:", updatedTask); // cek isi task
    if (!updatedTask || !updatedTask._id) {
      toast.error("Task ID is missing");
      return;
    }
    await updateTask.mutateAsync(updatedTask);
    closeDrawer();
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-neutral-100 rounded-4xl py-10 px-4">
      <div className="flex flex-wrap gap-6 overflow-x-auto max-w-7xl w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col bg-white rounded-lg shadow-lg w-72 min-w-[18rem]"
                >
                  <div className="flex justify-between items-center bg-white px-4 pt-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {status}
                    </h2>
                    <button
                      onClick={() => openAddTaskModal(status)}
                      className="text-gray-600 hover:text-[#841618] cursor-pointer text-xl leading-none"
                      title="Add Task"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-col p-3">
                    {groupedTasks[status]?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-50 border-l-4 border-[#841618] rounded p-3 mb-3 shadow transition duration-200 ${
                              snapshot.isDragging
                                ? "opacity-80 scale-95"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="font-semibold text-[#841618]">
                              {task.title}
                              {task.createdFrom === "calendar" && (
                                <span title="Created from calendar">📅</span>
                              )}
                            </div>
                            {task.description && (
                              <div className="text-sm text-gray-600 mt-1">
                                {task.description}
                              </div>
                            )}
                            {task.dueDate && (
                              <div className="text-xs text-gray-500 mt-2">
                                Due:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex justify-end gap-2 mt-2">
                              <DrawerButton
                                className="cursor-pointer"
                                triggerLabel="Edit"
                                title="Edit Task"
                                task={task}
                                description="Update your task details here."
                                onOpen={() => setEditingTask(task)}
                              >
                                {(closeDrawer) => (
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleEditTaskSubmit(
                                        editingTask,
                                        closeDrawer
                                      );
                                    }}
                                    className="grid gap-4 mt-4"
                                  >
                                    <div className="grid gap-2">
                                      <label>Title</label>
                                      <input
                                        type="text"
                                        value={editingTask?.title || ""}
                                        onChange={(e) =>
                                          setEditingTask((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                          }))
                                        }
                                        className="border px-3 py-2 rounded"
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <label>Description</label>
                                      <textarea
                                        value={editingTask?.description || ""}
                                        onChange={(e) =>
                                          setEditingTask((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                          }))
                                        }
                                        className="border px-3 py-2 rounded "
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <label>Due Date</label>
                                      <input
                                        type="date"
                                        value={
                                          editingTask?.dueDate?.split("T")[0] ||
                                          ""
                                        }
                                        onChange={(e) =>
                                          setEditingTask((prev) => ({
                                            ...prev,
                                            dueDate: e.target.value,
                                          }))
                                        }
                                        className="border px-3 py-2 rounded cursor-pointer"
                                      />
                                    </div>
                                    <Button
                                      type="submit"
                                      className="bg-[#841618] text-white hover:bg-[#6e1214]"
                                    >
                                      Save Changes
                                    </Button>
                                  </form>
                                )}
                              </DrawerButton>

                              <button
                                onClick={() => {
                                  setTaskToDelete(task);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-red-600 cursor-pointer hover:underline text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleAddTaskSubmit}
              className="bg-white rounded-lg shadow-lg p-6 w-96"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#841618]">
                Add Task to {addTaskData.status}
              </h2>
              <input
                type="text"
                ref={inputRef}
                placeholder="Task Title"
                value={addTaskData.title}
                onChange={(e) =>
                  setAddTaskData({ ...addTaskData, title: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#841618]"
              />
              <textarea
                placeholder="Description"
                value={addTaskData.description}
                onChange={(e) =>
                  setAddTaskData({
                    ...addTaskData,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#841618]"
              />
              <input
                type="date"
                value={addTaskData.dueDate}
                onChange={(e) =>
                  setAddTaskData({ ...addTaskData, dueDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#841618]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#841618] text-white cursor-pointer rounded hover:bg-[#6d1214]"
                >
                  Add
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg w-80 p-6"
            >
              <h3 className="text-lg font-semibold text-[#841618] mb-4">
                Confirm Delete
              </h3>
              <p className="mb-4 text-sm">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 text-sm bg-gray-300 cursor-pointer rounded hover:bg-gray-400"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setTaskToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 text-sm bg-[#841618] text-white cursor-pointer rounded hover:bg-[#721419]"
                  onClick={async () => {
                    if (!taskToDelete || !taskToDelete._id) {
                      toast.error("Invalid task ID");
                      return;
                    }
                    await deleteTask.mutateAsync(taskToDelete);
                    setShowDeleteDialog(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default KanbanBoard;
