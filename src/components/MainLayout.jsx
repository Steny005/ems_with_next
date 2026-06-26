"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  title,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FAF6F2" }}
    >
      {/* Sidebar */}

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content */}

      <div className="lg:ml-64">

        <Navbar
          title={title}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}