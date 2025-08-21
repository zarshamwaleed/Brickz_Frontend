// src/app/tasks/page.jsx
"use client";
import { useState, useMemo } from "react";
import FiltersBar from "@/components/FiltersBar";
import TaskList from "@/components/TaskList";
import { tasks } from "@/data/tasks";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const [filters, setFilters] = useState({
    status: "All Tasks",
    search: "",
    project: "",
    priority: "",
    role: ""
  });
  
  const router = useRouter();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filters.status !== "All Tasks") {
        if (filters.status === "Overdue") {
          if (!task.dueDate) return false;
          const today = new Date();
          const due = new Date(task.dueDate);
          if (due >= today) return false;
        } else if (task.status !== filters.status) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm) ||
          task.project.toLowerCase().includes(searchTerm) ||
          task.subtasks.some(sub => sub.name.toLowerCase().includes(searchTerm)) ||
          task.workers.some(worker => worker.name.toLowerCase().includes(searchTerm));
        
        if (!matchesSearch) return false;
      }

      // Project filter
      if (filters.project && task.project !== filters.project) {
        return false;
      }

      // Priority filter
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }

      // Role filter
      if (filters.role && !task.workers.some(worker => worker.role === filters.role)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 -mt-6 -mr-4 -ml-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
         <p className="text-gray-600 mt-2">Manage and track all your team&apos;s tasks in one place</p>

          </div>
          <button
            onClick={() => router.push("/add-task")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Task
          </button>
        </div>

        {/* Filters */}
        <FiltersBar filters={filters} setFilters={setFilters} />

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new task.</p>
            <button
              onClick={() => {
                setFilters({
                  status: "All Tasks",
                  search: "",
                  project: "",
                  priority: "",
                  role: ""
                });
                router.push("/add-task");
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create New Task
            </button>
          </div>
        )}
      </div>
    </main>
  );
}