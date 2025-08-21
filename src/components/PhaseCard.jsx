"use client";
import { useRouter } from "next/navigation";
import { XMarkIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import WorkPackageCard from "./WorkPackageCard";

export default function PhaseCard({
  phase,
  onDeletePhase,
  onEditPhase,
  onDeleteWorkPackage,
  onEditWorkPackage,
}) {
  const router = useRouter();

  const allCompleted =
    phase.workPackages.length > 0 &&
    phase.workPackages.every((pkg) => pkg.status === "Completed");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 transition-all hover:shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{phase.name}</h2>
          <p className="text-sm text-gray-500">
            {phase.workers.length} {phase.workers.length === 1 ? 'worker' : 'workers'} assigned
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              allCompleted
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {allCompleted ? "Completed" : "In Progress"}
          </span>
          
          {/* ✏️ Edit Button */}
          <button 
            onClick={() => onEditPhase(phase)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Edit phase"
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* ❌ Delete Button */}
          <button 
            onClick={() => onDeletePhase(phase.id)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Delete phase"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Workers Section */}
      {phase.workers.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ASSIGNED WORKERS</p>
          <div className="flex flex-wrap gap-2">
            {phase.workers.map((w, idx) => (
              <div
                key={`${phase.id}-worker-${idx}`}
                className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full"
              >
                <span className="font-medium text-indigo-700 text-sm">{w.name}</span>
                <span className="text-xs text-indigo-500">({w.role})</span>
                {allCompleted && (
                  <span className="text-green-600 text-xs flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Packages Section */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700 text-lg">Work Packages</h3>
          <button
            onClick={() => router.push(`/phases/add-work-package/${phase.id}`)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Add Work Package
          </button>
        </div>

        {phase.workPackages.length > 0 ? (
          <div className="space-y-3">
            {phase.workPackages.map((pkg, index) => (
              <WorkPackageCard
                key={pkg.id || `${phase.id}-pkg-${index}`}
                pkg={pkg}
                phaseId={phase.id}
                onDeleteWorkPackage={onDeleteWorkPackage}
                onEditWorkPackage={onEditWorkPackage}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-5 text-center border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-sm">No work packages yet</p>
            <p className="text-gray-400 text-xs mt-1">Add a work package to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}