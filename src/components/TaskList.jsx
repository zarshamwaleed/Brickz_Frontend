// src/components/TaskList.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskList({ tasks }) {
  const router = useRouter();
  const [expandedTasks, setExpandedTasks] = useState({});

  // Helper function to determine if task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const toggleExpand = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, i) => {
        const completedCount = task.subtasks.filter((s) => s.done).length;
        const totalCount = task.subtasks.length;
        const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        const overdue = isOverdue(task.dueDate);
        const isExpanded = expandedTasks[task.id || i];

        return (
          <div
            key={task.id || i}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            {/* Status indicator bar */}
            <div className={`h-1 ${
              task.status === "Completed" ? "bg-green-500" : 
              task.status === "In Progress" ? "bg-yellow-500" : 
              overdue ? "bg-red-500" : "bg-blue-500"
            }`}></div>
            
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.project}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium flex items-center whitespace-nowrap ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : overdue
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    task.status === "Completed" ? "bg-green-500" : 
                    task.status === "In Progress" ? "bg-yellow-500" : 
                    overdue ? "bg-red-500" : "bg-gray-500"
                  }`}></span>
                  {overdue ? "Overdue" : task.status}
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      task.status === "Completed" ? "bg-green-500" : 
                      task.status === "In Progress" ? "bg-yellow-500" : "bg-blue-500"
                    }`} 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{completedCount}/{totalCount} subtasks completed</p>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-medium ${
                    task.priority === "High" ? "text-red-600" :
                    task.priority === "Medium" ? "text-yellow-600" :
                    "text-blue-600"
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{task.assigned}</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className={`${overdue ? "text-red-600 font-medium" : "text-gray-700"}`}>
                    {task.dueDate} {overdue && "• Overdue"}
                  </span>
                </div>
              </div>

              {/* Subtasks */}
              {task.subtasks.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-500">SUBTASKS</p>
                    {task.subtasks.length > 3 && (
                      <button 
                        onClick={() => toggleExpand(task.id || i)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {isExpanded ? 'Show less' : `+${task.subtasks.length - 3} more`}
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {(isExpanded ? task.subtasks : task.subtasks.slice(0, 3)).map((sub, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                          sub.done
                            ? "bg-green-50 text-green-700"
                            : sub.inProgress
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-white text-gray-700 border border-gray-200"
                        }`}
                      >
                        {sub.done ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : sub.inProgress ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="truncate">{sub.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-2">
                <button
                  className="flex-1 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  onClick={() => router.push(`/taskDetails/${task.id}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Details
                </button>
                <button
                  className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={() => router.push(`/edit-task/${task.id}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}