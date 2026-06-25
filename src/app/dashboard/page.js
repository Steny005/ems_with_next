"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-violet-600">
          Employee Management
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </nav>

      <div className="max-w-7xl mx-auto p-8">

        {/* Welcome */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Welcome 👋
          </h2>

          <p className="text-gray-600 mt-2">
            Employee Management Dashboard
          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Total Employees
            </h3>

            <p className="text-4xl font-bold mt-3 text-violet-600">
              0
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Departments
            </h3>

            <p className="text-4xl font-bold mt-3 text-violet-600">
              0
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Recent Employees
            </h3>

            <p className="text-4xl font-bold mt-3 text-violet-600">
              0
            </p>

          </div>

        </div>

        {/* Employee Preview */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-semibold">
              Employee List Preview
            </h2>

            <button
              onClick={() => router.push("/employees")}
              className="bg-violet-600 text-white px-4 py-2 rounded-lg"
            >
              View All
            </button>

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Employee ID
                </th>

                <th className="text-left">
                  Name
                </th>

                <th className="text-left">
                  Department
                </th>

                <th className="text-left">
                  Email
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-400"
                >
                  No Employees Found
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}