"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Employees",
      path: "/employees",
    },
    {
      name: "Add Employee",
      path: "/employees/add",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
        style={{ backgroundColor: "#474282" }}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}

          <div className="p-6 border-b border-white/20">

            <h1 className="text-white text-2xl font-bold break-words">
              EMS
            </h1>

            <p className="text-white/70 text-sm mt-1 break-words">
              Employee Management
            </p>

          </div>

          {/* Menu */}

          <nav className="flex-1 p-4">

            {menuItems.map((item) => {

              const active = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 mb-2 transition
                  ${
                    active
                      ? "bg-white text-[#474282] font-semibold"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

          </nav>

          {/* Logout */}

          <div className="p-4 border-t border-white/20">

            <button
              onClick={logout}
              className="w-full bg-white text-[#474282] py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </aside>
    </>
  );
}
