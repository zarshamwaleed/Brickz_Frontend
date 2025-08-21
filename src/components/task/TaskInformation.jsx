import { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaCalendarAlt, FaFlag, FaTasks } from "react-icons/fa";

export default function TaskInformation({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Task:", editedTask);
    setIsEditing(false);
    // 👉 here you can send updatedTask to backend
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
      {/* Edit / Save / Cancel Icons */}
      <div className="absolute top-4 right-4 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              title="Save Changes"
            >
              <FaSave size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              title="Cancel Editing"
            >
              <FaTimes size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            title="Edit Task"
          >
            <FaEdit size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        // -------- Edit Mode --------
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <input
              type="text"
              name="project"
              value={editedTask.project}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFlag className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTasks className="h-4 w-4 text-gray-400" />
              </div>
              <select
                name="status"
                value={editedTask.status}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        // -------- View Mode --------
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{editedTask.title}</h2>
            <p className="text-gray-600 mt-1">{editedTask.project}</p>
          </div>

          {editedTask.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{editedTask.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <FaCalendarAlt className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Deadline</p>
                <p className="text-gray-900 font-medium">{editedTask.dueDate || "No deadline"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 bg-orange-50 rounded-lg mr-3">
                <FaFlag className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Priority</p>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(editedTask.priority)}`}>
                  {editedTask.priority}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg mr-3">
                <FaTasks className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(editedTask.status)}`}>
                  {editedTask.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}