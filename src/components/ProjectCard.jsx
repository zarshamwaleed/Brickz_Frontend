"use client";
import Link from "next/link";
import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { projects, statusStyles } from "@/data/projects";

export default function ProjectCard() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectList, setProjectList] = useState(projects);
  const [openMenu, setOpenMenu] = useState(null);

  const filteredProjects = projectList.filter((project) => {
    const matchesFilter = filter === "All" || project.status === filter;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete project ${id}?`)) {
      setProjectList(projectList.filter((project) => project.id !== id));
      alert(`Project ${id} deleted successfully!`);
      // In a real app, make a DELETE request: fetch(`/api/projects/${id}`, { method: 'DELETE' })
    }
    setOpenMenu(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
            <p className="text-gray-500 mt-2">Track and manage all your projects in one place</p>
          </div>
          <Link href="/add-project">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg mt-4 md:mt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Project
            </button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === "All" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter("Active")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                  filter === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${filter === "Active" ? "bg-green-500" : "bg-gray-400"}`}
                ></span>
                Active
              </button>
              <button
                onClick={() => setFilter("At Risk")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                  filter === "At Risk" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${filter === "At Risk" ? "bg-yellow-500" : "bg-gray-400"}`}
                ></span>
                At Risk
              </button>
              <button
                onClick={() => setFilter("Planning")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                  filter === "Planning" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${filter === "Planning" ? "bg-blue-500" : "bg-gray-400"}`}
                ></span>
                Planning
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              {/* Status indicator bar */}
              <div className={`h-1 bg-gradient-to-r ${statusStyles[project.status].bar}`}></div>

              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[project.status].badge} flex items-center`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${statusStyles[project.status].dot}`}></span>
                      {project.status}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
                        aria-label="Project options"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openMenu === project.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <Link href={`/edit-project/${project.id}`}>
                            <button
                              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg flex items-center gap-2"
                              onClick={() => setOpenMenu(null)}
                            >
                              <Pencil size={16} /> Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg flex items-center gap-2"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{project.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-semibold text-gray-800">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-semibold text-gray-800">{project.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Team Size</p>
                    <p className="font-semibold text-gray-800">{project.team}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tasks</p>
                    <p className="font-semibold text-gray-800">
                      {project.tasksCompleted}/{project.totalTasks}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Progress</p>
                    <p className="text-sm font-semibold text-gray-800">{project.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full bg-gradient-to-r ${statusStyles[project.status].bar}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* View Details Button */}
                <Link href={`/taskDetails/${project.id}`} className="block">
                  <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </main>
  );
}