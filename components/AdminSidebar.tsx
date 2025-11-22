"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "./icons/DashboardIcon";
import UsersIcon from "./icons/UsersIcon";
import AppointmentsIcon from "./icons/AppointmentsIcon";
import LogoutIcon from "./icons/LogoutIcon";

const AdminSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <DashboardIcon width="20" height="20" color="white" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <UsersIcon width="20" height="20" color="white" />,
    },
    {
      href: "/admin/appointments",
      label: "Appointments",
      icon: <AppointmentsIcon width="20" height="20" color="white" />,
    },
  ];

  return (
    <aside className="w-64 bg-[#0d1b12] text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#13ec5b]">Admin Panel</h2>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[#13ec5b] text-[#0d1b12]"
                    : "text-gray-300 hover:bg-[#4c9a66] hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button
          onClick={async () => {
            try {
              await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
              });
              window.location.href = "/login"; // Redirect to login after logout
            } catch (err) {
              console.error("Logout error:", err);
            }
          }}
          className="flex items-center w-full px-6 py-3 text-sm font-medium text-[#0d1b12] hover:bg-[#4c9a66] hover:text-white rounded transition-colors"
        >
          <span className="mr-3">
            <LogoutIcon width="20" height="20" color="#0d1b12" />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
