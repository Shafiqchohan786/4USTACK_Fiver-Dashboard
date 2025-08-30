"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-blue-700 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left - Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide cursor-pointer">
          4U<span className="text-yellow-300">STACK</span>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-6">
          {/* Dashboard Icon */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <span className="text-xl">🏠</span>
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <span className="text-xl">👤</span>
              <span className="hidden sm:inline">Profile</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-blue-700 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
