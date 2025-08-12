"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Sidebar container with hover open/close logic
export const Sidebar = ({ children, open, setOpen }) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-[#841618] text-white transition-all duration-300",
        open ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  );
};

// Sidebar body wrapper
export const SidebarBody = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col h-full", className)}>{children}</div>
  );
};

// Sidebar link with optional dropdown
export const SidebarLink = ({ link, isOpen, hasDivider = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const hasChildren = link.children?.length > 0;
  const isActive = (href) => location.pathname === href;

  const handleClick = () => {
    if (hasChildren) {
      setDropdownOpen(!dropdownOpen);
    } else if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <>
      <div>
        {/* Main link */}
        {hasChildren || link.onClick ? (
          <div
            onClick={handleClick}
            className={cn(
              "flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-white/10 rounded transition-colors duration-200",
              isActive(link.href) && "bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              {link.icon && <div className="text-[24px]">{link.icon}</div>}
              {isOpen && (
                <span className="whitespace-nowrap text-base">
                  {link.label}
                </span>
              )}
            </div>
            {hasChildren &&
              isOpen &&
              (dropdownOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              ))}
          </div>
        ) : (
          <Link
            to={link.href}
            className={cn(
              "flex items-center justify-between px-4 py-2 hover:bg-white/10 rounded transition-colors duration-200",
              isActive(link.href) && "bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              {link.icon && <div className="text-[24px]">{link.icon}</div>}
              {isOpen && (
                <span className="whitespace-nowrap text-base">
                  {link.label}
                </span>
              )}
            </div>
          </Link>
        )}

        {/* Dropdown children */}
        <AnimatePresence>
          {hasChildren && dropdownOpen && isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-8 mt-1 flex flex-col gap-1 overflow-hidden"
            >
              {link.children.map((child, idx) => (
                <Link
                  key={idx}
                  to={child.href}
                  className={cn(
                    "text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200",
                    isActive(child.href)
                      ? "bg-white/10 text-white"
                      : "text-white/70"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasDivider && <div className="border-b border-white/10 mx-4 my-2" />}
    </>
  );
};
