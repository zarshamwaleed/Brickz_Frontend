"use client";
import { useState } from "react";
import FiltersBar from "@/components/FiltersBar";
import WorkersList from "@/components/WorkersList";
import AddWorkerForm from "@/components/AddWorkerForm";
import workersData from "@/data/workers.json";

export default function WorkerManagement() {
  const [workers, setWorkers] = useState(workersData);
  const [filters, setFilters] = useState({
    status: "All Workers",
    search: "",
    role: "",
  });
  const [showForm, setShowForm] = useState(false);

  const filteredWorkers = workers.filter((w) => {
    if (filters.status === "Active" && w.status !== "Active") return false;
    if (filters.status === "Inactive" && w.status !== "Inactive") return false;
    if (filters.status === "Supervisors" && w.role !== "Site Supervisor") return false;

    if (
      filters.search &&
      !w.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.role && w.role !== filters.role) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 -mt-6 -ml-4 -mr-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Worker Management</h1>
            <p className="text-gray-600 mt-2">
              Manage your workforce efficiently
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Worker
          </button>
        </div>

        <FiltersBar filters={filters} setFilters={setFilters} />
        
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredWorkers.length} of {workers.length} workers
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Name</option>
              <option>Role</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        <WorkersList workers={filteredWorkers} />

        {showForm && (
          <AddWorkerForm
            onClose={() => setShowForm(false)}
            onSave={(newWorker) =>
              setWorkers((prev) => [...prev, { id: Date.now(), ...newWorker }])
            }
          />
        )}
      </div>
    </div>
  );
}