"use client";
import React, { useState } from "react";

import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import {
  IconLayoutDashboard,
  IconLayoutKanban,
  IconArchive,
  IconUser,
  IconSettings,
  IconLogout,
  IconCurrencyDollar,
  IconChartPie,
  IconDatabase,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { href, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
    navigate("/login", { replace: true });
  };

  const avatarUrl = user?.avatar?.url || "/default-avatar.png";
  const displayName = user?.fullName || "My Account";

  const menu = [
    {
      group: [
        {
          label: "Dashboard",
          href: "/",
          icon: <IconLayoutDashboard size={28} />,
        },
      ],
    },
    {
      group: [
        {
          label: "Project Management",
          icon: <IconLayoutKanban size={28} />,
          children: [
            { label: "Project Tracker", href: "/manage/kanban" },
            { label: "Project Calendar", href: "/manage/calendar" },
            { label: "Projects Archive", href: "/archive-projects" },
          ],
        },
      ],
    },
    {
      group: [
        {
          label: "Finance Management",
          icon: <IconCurrencyDollar size={28} />,
          children: [
            { label: "Revenue Sharing", href: "/revenue-sharing" },
            { label: "Finance Tracker", href: "/finance-management" },
          ],
        },
      ],
    },
    {
      group: [
        {
          label: "Profile Data",
          icon: <IconDatabase size={28} />,
          children: [
            { label: "Archive Data Crew", href: "/crew-archive" },
            { label: "Arsip Notulensi", href: "/notes-archive" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex w-full h-screen bg-[#841618]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between">
          <div className="flex flex-col gap-4 overflow-y-auto">
            <div className="p-4">{open ? <Logo /> : <LogoIcon />}</div>
            <div className="flex flex-col gap-1">
              {menu.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  {section.group.map((item, idx) => (
                    <SidebarLink
                      key={idx}
                      link={item}
                      isOpen={open}
                      hasDivider={idx === section.group.length - 1}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 p-4 relative">
            <div
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={avatarUrl}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Avatar"
                />
                {open && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">
                      {displayName}
                    </span>
                    <span className="text-xs text-white/60">{user?.email}</span>
                  </div>
                )}
              </div>
              {open && (
                <div>
                  {profileDropdownOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              )}
            </div>

            {/* Dropdown Profile Options */}
            <AnimatePresence>
              {open && profileDropdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 ml-11 flex flex-col gap-1 overflow-hidden"
                >
                  <Link
                    to="/profile"
                    className="text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-left px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-y-auto h-screen bg-white dark:bg-neutral-900 p-4 md:p-10 rounded-tl-2xl">
        {children}
      </main>
    </div>
  );
};

export const Logo = () => (
  <a href="/" className="flex items-center gap-2">
    <img src="/alter.png" alt="Imagine House Logo" className="h-8 w-auto" />
  </a>
);

export const LogoIcon = () => (
  <a href="/" className="flex items-center justify-center">
    <img src="/vite.svg" alt="Logo Icon" className="h-8 w-auto" />
  </a>
);

export default Layout;
