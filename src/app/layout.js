"use client";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { createContext, useState } from "react";

// Create Sidebar Context
export const SidebarContext = createContext();

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <body className="bg-neutral-100">
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
          <div className="flex">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Main content wrapper */}
            <div
              className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
                isOpen ? "ml-16 md:ml-64" : "ml-16 md:ml-20"
              }`}
            >
              {/* Navbar sticky at the top */}
              <div className="sticky top-0 z-40">
                <Navbar />
              </div>

              {/* Dashboard / children content */}
              <main className="flex-1 p-6 bg-neutral-100">{children}</main>
            </div>
          </div>
        </SidebarContext.Provider>
      </body>
    </html>
  );
}