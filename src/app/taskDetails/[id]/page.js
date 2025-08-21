"use client";
import { useParams } from "next/navigation";
import { tasks } from "@/data/tasks"; 
import TaskInformation from "@/components/task/TaskInformation";
import ProgressOverview from "@/components/task/ProgressOverview";
import AssignedWorkers from "@/components/task/AssignedWorkers";
import Timeline from "@/components/task/Timeline";
import TaskDiscussion from "@/components/task/TaskDiscussion";
import PhasesSection from "@/components/PhasesSection";
import Link from "next/link";

export default function TaskDetailsPage() {
  const { id } = useParams();
  
  // Convert id to number and handle potential undefined cases
  const taskId = id ? parseInt(id , 10) : -1;
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
          <p className="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
          <Link href="/tasks" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors">
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  const mockPhases = [
    {
      id: 1,
      name: "Site Preparation",
      workers: task.workers || [],
      workPackages: [
        {
          name: "Site survey and soil testing",
          description:
            "Comprehensive site survey including topographical mapping and soil composition analysis for foundation planning.",
          status: "Completed",
          priority: "High",
          dueDate: "2025-11-20",
          workers: task.workers && task.workers.length > 0 ? [task.workers[0]] : [],
        },
      ],
    },
  ];

  return (
    <main className="p-6 space-y-6 min-h-screen -mt-4 -mr-4 -ml-4">
      <div className="flex justify-between items-center mb-4">
        <Link 
          href="/tasks" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tasks
        </Link>
      </div>

      <TaskInformation task={task} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="space-y-6 lg:col-span-2">
          <AssignedWorkers task={task} />
          <Timeline task={task} />
          <ProgressOverview task={task} />
          <PhasesSection initialPhases={mockPhases} />
        </div>

        {/* Right Side - Sticky Chat */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <TaskDiscussion task={task} />
        </div>
      </div>
    </main>
  );
}