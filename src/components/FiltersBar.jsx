"use client";
export default function FiltersBar({ filters, setFilters }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Tasks</h3>
      
      <div className="flex flex-col gap-6">
        {/* Top Row: Status Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {["All Tasks", "In Progress", "Completed", "Not Started", "Overdue"].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilters({ ...filters, status: filter })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.status === filter
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Bottom Row: Project, Priority, and Role Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Project Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select
              value={filters.project}
              onChange={(e) => setFilters({ ...filters, project: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Projects</option>
              <option value="Downtown Office Complex">Downtown Office Complex</option>
              <option value="Residential Tower A">Residential Tower A</option>
              <option value="Shopping Mall Project">Shopping Mall Project</option>
              <option value="Hospital Renovation">Hospital Renovation</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Role</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Roles</option>
              <option>Site Supervisor</option>
              <option>Excavator Operator</option>
              <option>Safety Officer</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Laborer</option>
              <option>Inspector</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={() => setFilters({
                status: "All Tasks",
                search: "",
                project: "",
                priority: "",
                role: ""
              })}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}