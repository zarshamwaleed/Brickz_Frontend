"use client";
import { useState } from "react";

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

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const nameMatch = w.name.toLowerCase().includes(searchTerm);
      const roleMatch = w.role.toLowerCase().includes(searchTerm);
      const emailMatch = w.email.toLowerCase().includes(searchTerm);
      const employeeIdMatch = w.employeeId.toLowerCase().includes(searchTerm);
      
      if (!nameMatch && !roleMatch && !emailMatch && !employeeIdMatch) return false;
    }

    if (filters.role && w.role !== filters.role) return false;

    return true;
  });

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(workers.map(worker => worker.role))];

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

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Workers
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 极速快3 0-11 0 7 7 0 0111 0z" />
                  </svg>
                </div>
      <div className="relative">
  {/* Search Icon */}
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg
      className="w-5 h-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  </div>

  {/* Search Input */}
  <input
    type="text"
    id="search"
    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
    placeholder="Search by name, role, email..."
    value={filters.search}
    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
  />
</div>

                {filters.search && (
                  <button
                    onClick={() => setFilters({ ...filters, search: "" })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="All Workers">All Workers</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
                <option value="Supervisors">Supervisors Only</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Role
              </label>
              <select
                id="role"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              >
                <option value="">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.search || filters.status !== "All Workers" || filters.role) && (
            <div className="mt-4 flex flex-wrap items-center">
              <span className="text-sm text-gray-500 mr-2">Active filters:</span>
              
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                  Search: "{filters.search}"
                  <button
                    onClick={() => setFilters({ ...filters, search: "" })}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.status !== "All Workers" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2 mb-2">
                  Status: {filters.status}
                  <button
                    onClick={() => setFilters({ ...filters, status: "All Workers" })}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.role && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2 mb-2">
                  Role: {filters.role}
                  <button
                    onClick={() => setFilters({ ...filters, role: "" })}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 极速快3M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              <button
                onClick={() => setFilters({ status: "All Workers", search: "", role: "" })}
                className="text-sm text-gray-600 hover:text-gray-800 mb-2 flex items-center"
              >
                Clear all filters
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredWorkers.length} of {workers.length} workers
          </p>
          {filteredWorkers.length === 0 && (
            <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-md text-sm">
              No workers match your search criteria
            </div>
          )}
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