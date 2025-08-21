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
  const user = {
    role: "Site Manager",
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col bg-neutral-700 text-neutral-50 transition-all duration-300 shadow-md z-50
        ${isOpen ? "w-16 md:w-64" : "w-16 md:w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 border-b border-neutral-400 px-4">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={80}
              height={80}
              onError={() => console.error("Failed to load logo image")}
            />
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-xl font-bold text-white">Brickz</h1>
              <span className="text-sm text-neutral-300">{user.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={30}
              height={30}
              onError={() => console.error("Failed to load logo image")}
            />
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-neutral-600"
        >
          {isOpen ? (
            <>
              <Image
                src={logo}
                alt="Toggle Logo"
                width={30}
                height={30}
                className="inline md:hidden"
                onError={() => console.error("Failed to load toggle logo image")}
              />
              <ChevronLeftIcon className="hidden md:inline h-6 w-6 text-neutral-100" />
            </>
          ) : (
            <>
              <Image
                src={logo}
                alt="Toggle Logo"
                width={30}
                height={30}
                className="inline md:hidden"
                onError={() => console.error("Failed to load toggle logo image")}
              />
              <ChevronRightIcon className="hidden md:inline h-6 w-6 text-neutral-100" />
            </>
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
                      ? "bg-neutral-600 text-white"
                      : "hover:bg-neutral-600 hover:text-white"
                  }`}
              >
                <item.icon
                  className="h-6 w-6 text-neutral-200 md:mr-3"
                  aria-hidden="true"
                />
                {/* Show name only on md+ screens when sidebar is open */}
                {isOpen && <span className="hidden md:inline">{item.name}</span>}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}