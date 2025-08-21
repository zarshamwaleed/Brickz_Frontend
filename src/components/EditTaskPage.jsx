"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import workersData from "@/data/workers.json";
import { tasks } from "@/data/tasks";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const task = tasks.find((t) => String(t.id) === String(id));

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Medium");
  const [assignedWorkers, setAssignedWorkers] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", done: false }]);

  // pre-fill form on mount
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setProject(task.project || "");
      setStatus(task.status || "Not Started");
      setPriority(task.priority || "Medium");
      setDueDate(task.dueDate || "");
      setDescription(task.description || "");
      setSubtasks(task.subtasks || [{ name: "", done: false }]);

      // match assigned workers to ids
      if (task.workers) {
        setAssignedWorkers(task.workers.map((w) => w.id));
      }
    }
  }, [task]);

  const toggleWorkerSelection = (id) => {
    setAssignedWorkers((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleSubtaskChange = (index, value) => {
    const updated = [...subtasks];
    updated[index].name = value;
    setSubtasks(updated);
  };

  const removeSubtask = (index) => {
    if (subtasks.length > 1) {
      setSubtasks(subtasks.filter((_, i) => i !== index));
    }
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { name: "", done: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      project,
      status,
      priority,
      assigned: `${assignedWorkers.length} workers`,
      dueDate,
      description,
      workers: workersData.filter((w) => assignedWorkers.includes(w.id)),
      subtasks,
    };

    console.log("Updated Task:", updatedTask);

    // redirect back
    router.push("/projects");
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <p className="text-gray-600 text-center">Task not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-600 mt-2">Update the details of your task</p>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
              />
            </div>

            {/* Workers */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Assign Team Members</h3>
              <div className="border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-1 gap-3">
                  {workersData.map((worker) => (
                    <label 
                      key={worker.id} 
                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${assignedWorkers.includes(worker.id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={assignedWorkers.includes(worker.id)}
                          onChange={() => toggleWorkerSelection(worker.id)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{worker.name}</span>
                        <span className="text-xs text-gray-500">{worker.role}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {assignedWorkers.length} {assignedWorkers.length === 1 ? 'worker' : 'workers'} selected
              </p>
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Subtasks</h3>
                <button
                  type="button"
                  onClick={addSubtask}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Subtask
                </button>
              </div>
              
              <div className="space-y-3">
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-3 text-sm text-gray-500">{index + 1}.</span>
                    <input
                      type="text"
                      placeholder={`Subtask ${index + 1}`}
                      value={subtask.name}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    {subtasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubtask(index)}
                        className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/projects")}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}