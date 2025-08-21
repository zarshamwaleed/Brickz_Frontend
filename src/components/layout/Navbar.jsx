import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

// ✅ import image from assets
import profilePic from "@/assets/profilebgRemove.png";

export default function Navbar() {
  const user = {
    name: "John Doe",
    role: "Project Manager",
    image: profilePic, // use imported image
  };

  return (
    <div className="flex items-center justify-between h-20 bg-neutral-700 shadow-md px-6">
      {/* Search Bar */}
      <div className="flex items-center w-1/3 ml-auto">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-100" />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-600 text-neutral-50 placeholder-neutral-300 border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Right Section: Notification and User Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative p-2 text-neutral-100 hover:text-blue-400 transition-colors">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <Image
            src={user.image}
            alt="User profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-50">
              {user.name}
            </span>
            <span className="text-xs text-neutral-200">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
