"use client";
import Link from "next/link";
import { FaUserPlus, FaClock, FaUserTie, FaHardHat } from "react-icons/fa";
import profileFallback from "@/assets/profilebgRemove.png"; // ✅ import fallback image
import Image from "next/image";

export default function AssignedWorkers({ task }) {
  const getRoleIcon = (role) => {
    if (role.includes("Supervisor") || role.includes("Manager")) {
      return <FaUserTie className="w-3 h-3 text-blue-600" />;
    }
    return <FaHardHat className="w-3 h-3 text-gray-600" />;
  };

  const getRoleColor = (role) => {
    if (role.includes("Supervisor") || role.includes("Manager")) {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Assigned Team</h3>
          <p className="text-sm text-gray-500 mt-1">
            {task.workers?.length || 0}{" "}
            {task.workers?.length === 1 ? "person" : "people"} assigned to this
            task
          </p>
        </div>
        <Link
          href="/assign-worker"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
        >
          <FaUserPlus className="w-4 h-4 mr-2" />
          Assign Worker
        </Link>
      </div>

      {task.workers && task.workers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {task.workers.map((worker, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
<Image
  src={ profileFallback}
  alt={worker.name}
  width={56}
  height={56}
  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
/>


                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${getRoleColor(
                        worker.role
                      )}`}
                    >
                      {getRoleIcon(worker.role)}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-gray-900 truncate">
                      {worker.name}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        worker.role
                      )}`}
                    >
                      {worker.role}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FaClock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    <span>{worker.hours}h logged</span>
                  </div>

                  {worker.efficiency && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Efficiency</span>
                        <span>{worker.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            worker.efficiency >= 80
                              ? "bg-green-500"
                              : worker.efficiency >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${worker.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-blue-50 rounded-full">
              <FaUserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h4 className="text-gray-700 font-medium mb-1">No workers assigned</h4>
          <p className="text-gray-500 text-sm mb-4">
            Assign workers to get this task started
          </p>
          <Link
            href="/assign-worker"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaUserPlus className="w-4 h-4 mr-2" />
            Assign First Worker
          </Link>
        </div>
      )}

      {task.workers && task.workers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total hours logged</span>
            <span className="font-medium text-gray-900">
              {task.workers.reduce(
                (total, worker) => total + (worker.hours || 0),
                0
              )}
              h
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
