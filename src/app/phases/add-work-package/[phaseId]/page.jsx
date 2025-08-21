"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWorkPackagePage({ params }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Not Started");
  const [dueDate, setDueDate] = useState("");
  const [workers, setWorkers] = useState([]);
  const router = useRouter();

  // ✅ Task ID (from URL param)
  const taskId = params?.phaseId || 0; // fallback to 0 if not passed

  // mock workers for that phase
  const phaseWorkers = [
    { name: "Ali Khan", role: "Excavator Operator" },
    { name: "Sara Ahmed", role: "Site Supervisor" },
    { name: "Bilal Khan", role: "Electrician" },
  ];

  const handleWorkerToggle = (worker) => {
    if (workers.find((w) => w.name === worker.name)) {
      setWorkers(workers.filter((w) => w.name !== worker.name));
    } else {
      setWorkers([...workers, worker]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ create new work package (for now just console.log)
    const newPkg = {
      name,
      desc,
      priority,
      status,
      dueDate,
      workers,
    };
    console.log("Work Package Created:", newPkg);

    // ✅ after creating -> go to taskDetails/:id
    router.push(`/taskDetails/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create Work Package</h1>
            <button 
              onClick={() => router.push(`/taskDetails/${taskId}`)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Work Package Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Foundation Excavation"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Describe the work package details..."
                rows={3}
              />
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Workers Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Team Members
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Available Workers</p>
                <div className="space-y-2">
                  {phaseWorkers.map((w, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
                        workers.some((wk) => wk.name === w.name)
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={workers.some((wk) => wk.name === w.name)}
                        onChange={() => handleWorkerToggle(w)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{w.name}</p>
                        <p className="text-sm text-gray-500">{w.role}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {workers.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Selected Team ({workers.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {workers.map((worker, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {worker.name}
                        <button
                          type="button"
                          onClick={() => handleWorkerToggle(worker)}
                          className="ml-1.5 text-blue-600 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/taskDetails/${taskId}`)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 px-4 py-3 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}