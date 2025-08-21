"use client";
import {
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Projects",
    value: "24",
    change: "+12% from last month",
    icon: ChartBarIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Active Workers",
    value: "156",
    change: "+8% from last month",
    icon: UserGroupIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    name: "Hours Logged",
    value: "2,847",
    change: "This week",
    icon: ClockIcon,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    name: "Budget Status",
    value: "87%",
    change: "Within budget",
    icon: BanknotesIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function StatsOverview() {
  return (
    <div className="px-6 py-8 bg-neutral-50">
      {/* Header: Improved typography and spacing */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-base text-neutral-600">
          Welcome back! Here's a snapshot of your project metrics.
        </p>
      </div>

      {/* Stats Section: Enhanced grid layout with hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="group bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-neutral-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            role="region"
            aria-label={`Statistic: ${stat.name}`}
          >
            <div>
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                {stat.name}
              </p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {stat.value}
              </p>
              <p className="text-sm text-green-600 mt-2">{stat.change}</p>
            </div>
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
            >
              <stat.icon
                className={`h-6 w-6 ${stat.iconColor}`}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}