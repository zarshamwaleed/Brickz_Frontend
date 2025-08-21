"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tasks } from "@/data/tasks";

export default function AddPhasePage({ params }) {
  const [name, setName] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const router = useRouter();

  // ✅ for now, assuming taskId is 0 (hardcoded mock)
  const taskId = params?.taskId || 0;

  const allWorkers = tasks.flatMap((t) => t.workers);
  // Remove duplicates by worker name
  const uniqueWorkers = allWorkers.filter((worker, index, self) => 
    index === self.findIndex((w) => w.name === worker.name)
  );

  const handleToggleWorker = (worker) => {
    setSelectedWorkers((prev) =>
      prev.some((w) => w.name === worker.name)
        ? prev.filter((w) => w.name !== worker.name) // remove
        : [...prev, worker] // add
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPhase = {
      id: Date.now(),
      name,
      workers: selectedWorkers,
      workPackages: [],
    };

    console.log("✅ Phase Created:", newPhase);

    // redirect to that task details page
    router.push(`/taskDetails/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create New Phase</h1>
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
            {/* Phase Name */}
            <div>
              <label htmlFor="phase-name" className="block text-sm font-medium text-gray-700 mb-2">
                Phase Name
              </label>
              <input
                id="phase-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Site Preparation"
                required
              />
            </div>

            {/* Workers Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Team Members
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-64 overflow-y-auto">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Available Workers</p>
                <div className="space-y-2">
                  {uniqueWorkers.map((w, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
                        selectedWorkers.some((sw) => sw.name === w.name)
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedWorkers.some((sw) => sw.name === w.name)}
                        onChange={() => handleToggleWorker(w)}
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
              {selectedWorkers.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Selected Team ({selectedWorkers.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkers.map((worker, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {worker.name}
                        <button
                          type="button"
                          onClick={() => handleToggleWorker(worker)}
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
                Create Phase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}