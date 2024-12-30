"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile, sun } from "@/utils/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RadialCHart from "../RadialChart/RadialChart";
import Image from "next/image";

function Header() {
  const { user, updateUser, logoutUser, updateUserTheme, userLoginStatus } =
    useUserContext();
  const {
    openModalForAdd,
    activeTasks,
    completedTasks,
    tasks,
    openProfileModal,
  } = useTasks();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // To track login status

  const { name } = user;
  const userId = user._id;

  const lightTheme = () => {
    updateUserTheme({ theme: "light" });
  };

  const darkTheme = () => {
    updateUserTheme({ theme: "dark" });
  };

  useEffect(() => {
    document.documentElement.className = user.theme;
  }, [user.theme]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await userLoginStatus();
      setIsLoggedIn(loggedIn); // Set the login status
    };

    checkLoginStatus();
  }, [userLoginStatus]); // Run on mount and when userLoginStatus changes

  return (
    <div className="relative">
      {/* Header */}
      <header className="px-4 py-3 sm:px-6 w-full flex items-center justify-between bg-[#f9f9f9] dark:bg-[#0b0b0b]/60">
        <div>
          <h1 className="text-lg font-medium">
            {userId ? `Welcome!` : "Welcome to Taskly"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-2 py-1 sm:px-6 sm:py-2 md:px-8 md:py-3 bg-[#3498db] text-white rounded-[50px] text-xs sm:text-sm md:text-base hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out w-full sm:w-auto max-w-[300px] mx-auto sm:mx-0"
            onClick={() => {
              if (userId) {
                openModalForAdd();
              } else {
                router.push("/login");
              }
            }}
          >
            {userId ? "Add a new Task" : "Login / Register"}
          </button>

          {/* Theme Toggle */}
          <div className="p-1 sm:p-2 text-base sm:text-xl text-[#454e56] flex gap-1 sm:gap-2 items-center border-2 border-white dark:border-[#3C3C3C]/65 rounded-[20px] sm:rounded-[30px] shadow-sm dark:text-white/65">
            <button
              className={`text-sm sm:text-base ${
                user?.theme === "light" ? "text-yellow-500" : ""
              }`}
              onClick={() => lightTheme()}
            >
              {sun}
            </button>
            <span className="w-[0.5px] sm:w-[1px] h-full bg-white dark:bg-[#3C3C3C]/60"></span>
            <button
              className={`text-sm sm:text-base ${
                user?.theme === "dark" ? "text-white" : ""
              }`}
              onClick={() => darkTheme()}
            >
              {moon}
            </button>
          </div>

          {/* Sidebar Toggle Button */}
          {isLoggedIn && (
            <button
              className="p-2 text-[#454e56] bg-[#F1F1F1] dark:bg-[#0b0b0b] rounded-md shadow-md hover:bg-[#e0e0e0] dark:hover:bg-[#1a1a1a] transition-all"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
          )}
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-[18rem] bg-[#f9f9f9] dark:bg-[#0b0b0b] shadow-lg transition-transform transform duration-300 ease-in-out z-50 overflow-y-auto">
          <div className="p-6 flex flex-col gap-6">
            {/* Close Button */}
            <button
              className="self-end text-lg text-[#454e56] dark:text-white hover:text-[#3498db]"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>

            {/* Profile Block */}
            <div
              className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem] hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white dark:bg-[#3C3C3C]/60"
              onClick={openProfileModal}
            >
              <div>
                <Image
                  src={user?.photo || "/default-avatar.png"} // Default avatar if no photo
                  alt="avatar"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="flex flex-col text-xl">
                  <span className=" font-medium">Hello,</span>
                  <span className="font-bold">{user?.name || "Guest"}</span>
                </h1>
              </div>
            </div>

            {/* Tasks Overview */}
            <div className="mt-6 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-400">
                  <p>Total Tasks:</p>
                  <p className="pl-4 relative flex gap-2">
                    <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
                    <span className="font-medium text-4xl text-[#333] dark:text-[#F1F1F1]">
                      {tasks.length}
                    </span>
                  </p>
                </div>
                <div className="text-gray-400">
                  <p>In Progress:</p>
                  <p className="pl-4 relative flex gap-2">
                    <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
                    <span className="font-medium text-4xl text-[#333] dark:text-[#F1F1F1]">
                      {activeTasks.length}
                    </span>
                  </p>
                </div>
                <div className="text-gray-400">
                  <p>Open Tasks:</p>
                  <p className="pl-4 relative flex gap-2">
                    <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
                    <span className="font-medium text-4xl text-[#333] dark:text-[#F1F1F1]">
                      {activeTasks.length}
                    </span>
                  </p>
                </div>
                <div className="text-gray-400">
                  <p>Completed:</p>
                  <p className="pl-4 relative flex gap-2">
                    <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
                    <span className="font-medium text-4xl text-[#333] dark:text-[#F1F1F1]">
                      {completedTasks.length}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Radial Chart */}
            <RadialCHart />
          </div>
          {/* Sign Out Button */}
          <button
            className="mt-8 w-[90%] block py-4 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3498db] transition duration-200 ease-in-out mx-auto"
            onClick={logoutUser}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
