"use client";
import { useState } from "react";
import workersData from "@/data/workers.json";
import { projects } from "@/data/projects";
import { useRouter } from "next/navigation";

export default function AddTaskPage() {
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    status: "Not Started",
    priority: "Medium",
    dueDate: "",
    description: ""
  });
  const [assignedWorkers, setAssignedWorkers] = useState([]);
  const [subtasks, setSubtasks] = useState([{ name: "", done: false }]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

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

  const addSubtask = () => {
    setSubtasks([...subtasks, { name: "", done: false }]);
  };

  const removeSubtask = (index) => {
    if (subtasks.length > 1) {
      const updated = [...subtasks];
      updated.splice(index, 1);
      setSubtasks(updated);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Task title is required";
    if (!formData.project.trim()) newErrors.project = "Project name is required";
    if (assignedWorkers.length === 0) newErrors.workers = "At least one worker must be assigned";
    
    // Validate subtasks
    subtasks.forEach((subtask, index) => {
      if (!subtask.name.trim()) {
        newErrors[`subtask-${index}`] = "Subtask cannot be empty";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTask = {
        ...formData,
        assigned: `${assignedWorkers.length} workers`,
        workers: workersData.filter((w) => assignedWorkers.includes(w.id)),
        subtasks,
        id: Math.floor(Math.random() * 1000) // Generate a temporary ID
      };

      console.log("New Task Created:", newTask);
      
      // Here you would typically POST to your backend API
      // await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(newTask) });
      
      // Show success message
      alert("Task created successfully!");
      
      router.push("/projects");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("There was an error creating the task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "Not Started", label: "Not Started", color: "bg-gray-500" },
    { value: "In Progress", label: "In Progress", color: "bg-yellow-500" },
    { value: "Completed", label: "Completed", color: "bg-green-500" }
  ];

  const priorityOptions = [
    { value: "Low", label: "Low", color: "bg-blue-500" },
    { value: "Medium", label: "Medium", color: "bg-yellow-500" },
    { value: "High", label: "High", color: "bg-red-500" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Projects
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800">Create New Task</h1>
          <p className="text-gray-600 mt-2">Add a new task to your project management system</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g., Design Homepage Layout"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                    required
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Project Name Dropdown */}
                <div className="md:col-span-2">
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${errors.project ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                    required
                  >
                    <option value="" disabled>Select a project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.name}>{project.name}</option>
                    ))}
                  </select>
                  {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Due Date */}
                <div className="md:col-span-2">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe the task details, requirements, and objectives..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                {/* Workers */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Workers *
                  </label>
                  {errors.workers && <p className="text-sm text-red-600 mb-2">{errors.workers}</p>}
                  <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-3">
                      {workersData.map((worker) => (
                        <div
                          key={worker.id}
                          onClick={() => toggleWorkerSelection(worker.id)}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${assignedWorkers.includes(worker.id) ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"}`}
                        >
                          <div className={`w-3 h-3 rounded-full mr-3 ${assignedWorkers.includes(worker.id) ? "bg-blue-500" : "bg-gray-300"}`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{worker.name}</p>
                            <p className="text-sm text-gray-500">{worker.role}</p>
                          </div>
                          {assignedWorkers.includes(worker.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {assignedWorkers.length} worker{assignedWorkers.length !== 1 ? 's' : ''} selected
                  </p>
                </div>

                {/* Subtasks */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtasks
                  </label>
                  <div className="space-y-3">
                    {subtasks.map((subtask, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={`Subtask ${index + 1}`}
                            value={subtask.name}
                            onChange={(e) => handleSubtaskChange(index, e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${errors[`subtask-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                          />
                          {errors[`subtask-${index}`] && <p className="mt-1 text-sm text-red-600">{errors[`subtask-${index}`]}</p>}
                        </div>
                        {subtasks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSubtask(index)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSubtask}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mt-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Subtask
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/projects")}
                  className="mt-3 sm:mt-0 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Task"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}