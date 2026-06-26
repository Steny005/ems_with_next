"use client";

export default function Navbar({
  title,
  isOpen,
  setIsOpen,
}) {
  return (
    <header
      className="sticky top-0 z-30 shadow-md"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-3xl font-bold"
            style={{ color: "#474282" }}
          >
            ☰
          </button>

          <h1
            className="text-xl md:text-2xl font-bold break-words"
            style={{ color: "#474282" }}
          >
            {title}
          </h1>

        </div>

      </div>
    </header>
  );
}