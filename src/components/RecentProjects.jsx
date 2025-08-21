"use client";
import { projects, statusStyles } from "@/data/projects";

export default function RecentProjects() {
  const recentProjects = projects.slice(-2);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-md border border-neutral-100 mr-6 ml-6">
      <div className="px-6 py-5 border-b border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">
          Recent Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {recentProjects.map((project) => (
          <div
            key={project.name}
            className="group border border-neutral-200 rounded-xl p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            role="region"
            aria-label={`Project: ${project.name}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">
                {project.name}
              </h3>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[project.status].badge}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Budget: {project.budget} | Deadline: {project.deadline}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600">Progress</span>
                <span className="font-medium text-neutral-900">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-2.5 rounded-full bg-gradient-to-r ${statusStyles[project.status].bar} transition-all duration-500 group-hover:brightness-110`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}