import { XMarkIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function WorkPackageCard({ pkg, phaseId, onDeleteWorkPackage, onEditWorkPackage }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-lg truncate">{pkg.name}</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pkg.description}</p>
        </div>
        <div className="flex gap-2 ml-3 flex-shrink-0">
          {/* ✏️ Edit Button */}
          <button 
            onClick={() => onEditWorkPackage(phaseId, pkg)}
            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            aria-label="Edit work package"
          >
            <PencilIcon className="h-5 w-5 text-blue-600" />
          </button>
          {/* ❌ Delete Button */}
          <button 
            onClick={() => onDeleteWorkPackage(phaseId, pkg.id)}
            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
            aria-label="Delete work package"
          >
            <XMarkIcon className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {/* Status Badge */}
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            pkg.status === "Completed"
              ? "bg-green-100 text-green-800"
              : pkg.status === "In Progress"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {pkg.status}
        </span>
        
        {/* Priority Badge */}
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
          pkg.priority === "High" 
            ? "bg-red-100 text-red-800" 
            : pkg.priority === "Medium"
            ? "bg-orange-100 text-orange-800"
            : "bg-gray-100 text-gray-800"
        }`}>
          {pkg.priority} Priority
        </span>
        
        {/* Due Date */}
        {pkg.dueDate && (
          <span className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {pkg.dueDate}
          </span>
        )}
      </div>

      {/* Workers */}
      {pkg.workers && pkg.workers.length > 0 && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">ASSIGNED WORKERS</p>
          <div className="flex flex-wrap gap-2">
            {pkg.workers.map((w, idx) => (
              <span
                key={`${pkg.id}-worker-${idx}`}
                className="px-3 py-1.5 bg-indigo-50 rounded-full text-xs font-medium text-indigo-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {w.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}