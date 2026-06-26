"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();

        if (data.success) {
          setEmployees(data.employees);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getEmployees();
  }, []);

  const totalEmployees = employees.length;

  const totalDepartments = [
    ...new Set(employees.map((employee) => employee.department)),
  ].length;

  const recentEmployees = employees.slice(0, 5);

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FAF6F2" }}
    >
      {/* Navbar */}

      <nav
        className="shadow-md"
        style={{ backgroundColor: "#474282" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">

          <h1 className="text-white text-xl md:text-2xl font-bold break-words">
            Employee Management System
          </h1>

          <button
            onClick={logout}
            className="bg-white px-5 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ color: "#474282" }}
          >
            Logout
          </button>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">

        {/* Welcome */}

        <div className="mb-8">

          <h2
            className="text-3xl md:text-4xl font-bold break-words"
            style={{ color: "#474282" }}
          >
            Welcome User !
          </h2>

          

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Total Employees
            </p>

            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: "#474282" }}
            >
              {totalEmployees}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Departments
            </p>

            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: "#474282" }}
            >
              {totalDepartments}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Recent Employees
            </p>

            <h2
              className="text-4xl font-bold mt-3"
              style={{ color: "#474282" }}
            >
              {recentEmployees.length}
            </h2>

          </div>

        </div>

        {/* Employee Preview */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

            <h2
              className="text-2xl font-bold"
              style={{ color: "#474282" }}
            >
              Employee Preview
            </h2>

            <button
              onClick={() => router.push("/employees")}
              className="text-white px-5 py-2 rounded-lg"
              style={{ backgroundColor: "#474282" }}
            >
              View All
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="text-white"
                  style={{ backgroundColor: "#474282" }}
                >
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Email</th>
                </tr>

              </thead>

              <tbody>

                {recentEmployees.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Employees Found
                    </td>

                  </tr>

                ) : (

                  recentEmployees.map((employee) => (

                    <tr
                      key={employee._id}
                      className="border-b"
                    >

                      <td className="p-3 break-words">
                        {employee.employeeId}
                      </td>

                      <td className="p-3 break-words">
                        {employee.fullName}
                      </td>

                      <td className="p-3 break-words">
                        {employee.department}
                      </td>

                      <td className="p-3 break-words">
                        {employee.email}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <button
            onClick={() => router.push("/employees/add")}
            className="text-white text-lg py-4 rounded-xl shadow-lg transition hover:opacity-90"
            style={{ backgroundColor: "#474282" }}
          >
            Add Employee
          </button>

          <button
            onClick={() => router.push("/employees")}
            className="bg-white text-lg py-4 rounded-xl shadow-lg transition hover:bg-gray-100"
            style={{ color: "#474282" }}
          >
            Manage Employees
          </button>

        </div>

      </div>
    </div>
  );
}