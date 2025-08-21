"use client";
import StatsOverview from "../components/StatsOverview";
import RecentProjects from "../components/RecentProjects";

export default function Dashboard() {
  return (
    <div className="relative -mt-14 -ml-10 -mr-10 ">   {/* Only Dashboard shifts */}
      <StatsOverview />
      <RecentProjects />
    </div>
  );
}
