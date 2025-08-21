// src/components/PhasesSection.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhaseCard from "@/components/PhaseCard";
import Swal from "sweetalert2";
export default function PhasesSection({ initialPhases = [] }) {
  const [phases, setPhases] = useState(initialPhases);
  const router = useRouter();

  // ✅ Delete Work Package
  const handleDeleteWorkPackage = (phaseId, pkgId) => {
    setPhases(prev =>
      prev.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              workPackages: phase.workPackages.filter(p => p.id !== pkgId),
            }
          : phase
      )
    );
  };

  // ✅ Edit Work Package
  const handleEditWorkPackage = (phaseId, pkg) => {
    console.log("Editing package:", pkg, "in phase:", phaseId);
    // TODO: open modal or route to edit page
  };

  // ✅ Delete Phase
const handleDeletePhase = async (phaseId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This phase will be permanently deleted. This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    setPhases(prev => prev.filter(p => p.id !== phaseId));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: `Phase ${phaseId} has been deleted.`,
      confirmButtonColor: '#3085d6',
    });
  }
};
  // ✅ Edit Phase
  const handleEditPhase = (phase) => {
    console.log("Editing phase:", phase);
    // TODO: open modal or route to edit page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Construction Phases</h1>
            <p className="text-gray-600 mt-2">Manage work packages and track progress across all phases</p>
          </div>
          <button
            onClick={() => router.push("/phases/add-phase")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Phase
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Phases</p>
                <p className="text-2xl font-bold text-gray-800">{phases.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {phases.filter(phase => 
                    phase.workPackages.length > 0 && 
                    phase.workPackages.every(pkg => pkg.status === "Completed")
                  ).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="rounded-lg bg-orange-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">
                  {phases.filter(phase => 
                    phase.workPackages.length > 0 && 
                    phase.workPackages.some(pkg => pkg.status !== "Completed")
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phases List */}
        <div className="space-y-6">
          {phases.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No phases yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first construction phase</p>
              <button
                onClick={() => router.push("/phases/add-phase")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Create First Phase
              </button>
            </div>
          ) : (
            phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                onDeletePhase={handleDeletePhase}
                onEditPhase={handleEditPhase}
                onDeleteWorkPackage={handleDeleteWorkPackage}
                onEditWorkPackage={handleEditWorkPackage}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}