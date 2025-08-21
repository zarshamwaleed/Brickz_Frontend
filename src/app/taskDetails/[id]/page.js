"use client";
import { useParams } from "next/navigation";
import { tasks } from "@/data/tasks"; 
import TaskInformation from "@/components/task/TaskInformation";
import ProgressOverview from "@/components/task/ProgressOverview";
import AssignedWorkers from "@/components/task/AssignedWorkers";
import Timeline from "@/components/task/Timeline";
import TaskDiscussion from "@/components/task/TaskDiscussion";
import PhasesSection from "@/components/PhasesSection";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const task = tasks[id];

  if (!task) return <div className="p-6">Task not found</div>;

  const mockPhases = [
    {
      id: 1,
      name: "Site Preparation",
      workers: task.workers,
      workPackages: [
        {
          name: "Site survey and soil testing",
          description:
            "Comprehensive site survey including topographical mapping and soil composition analysis for foundation planning.",
          status: "Completed",
          priority: "High",
          dueDate: "2025-11-20",
          workers: [task.workers[0]],
        },
      ],
    },
  ];

  return (
    <main className="p-6 space-y-6 min-h-screen -mt-4 -mr-4 -ml-4">
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