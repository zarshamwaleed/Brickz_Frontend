"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  FolderIcon,
  CheckCircleIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { SidebarContext } from "@/app/layout";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Tasks", href: "/tasks", icon: CheckCircleIcon },
  { name: "Users", href: "/worker-management", icon: UsersIcon },
  { name: "Attendance", href: "/attendance", icon: ClockIcon },
  { name: "Invoicing", href: "/invoicing", icon: CurrencyDollarIcon },
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Chat", href: "/chat", icon: ChatBubbleLeftIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
  { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
];

export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const pathname = usePathname();
  const user = { role: "Site Manager" };

  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col bg-slate-800 text-white transition-all duration-300 shadow-md z-50
        ${isOpen ? "w-16 md:w-64" : "w-16 md:w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 border-b border-slate-700 px-4">
        {isOpen ? (
          <div className="flex items-center gap-2 w-full">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="flex-shrink-0"
              onError={() => console.error("Failed to load logo image")}
            />
            <div className="hidden md:flex md:flex-col ml-2">
              <h1 className="text-xl font-bold">Brickz</h1>
              <span className="text-sm text-slate-300">{user.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              onError={() => console.error("Failed to load logo image")}
            />
          </div>
        )}

        {/* Toggle button - md+ */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:block p-2 rounded-md hover:bg-slate-700"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-between">
        <nav className="px-2 py-4 flex-1 flex flex-col justify-between">
          <div className="space-y-1 flex-1 flex flex-col justify-start">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 md:px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 flex-shrink-0
                  ${
                    pathname === item.href
                      ? "bg-slate-700 text-white"
                      : "hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <item.icon
                  className="h-6 w-6 text-slate-200 md:mr-3"
                  aria-hidden="true"
                />
                {isOpen && <span className="hidden md:inline">{item.name}</span>}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
