"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
export default function EmployeesPage() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();

      if (data.success) {
        setEmployees(data.employees);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  async function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`/api/employees/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          alert("Employee deleted successfully");
          fetchEmployees();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      employee.email?.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId?.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = department ? employee.department === department : true;
    return matchesSearch && matchesDepartment;
  });

  return (
  <MainLayout title="Employees">

    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

      <h2
        className="text-3xl font-bold"
        style={{ color: "#474282" }}
      >
        Employees
      </h2>

      <button
        onClick={() => router.push("/employees/add")}
        className="text-white px-5 py-3 rounded-lg transition"
        style={{ backgroundColor: "#474282" }}
      >
        Add Employee
      </button>

    </div>

    {/* Search & Filter */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

      <input
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 bg-white"
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border rounded-lg p-3 bg-white"
      >
        <option value="">All Departments</option>
        <option>IT</option>
        <option>HR</option>
        <option>Finance</option>
        <option>Marketing</option>
        <option>Sales</option>
      </select>

    </div>

    {/* Employee Table */}

    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr
            className="text-white"
            style={{ backgroundColor: "#474282" }}
          >

            <th className="p-4 text-left">
              Employee ID
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Department
            </th>

            <th className="p-4 text-left">
              Designation
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredEmployees.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-8"
              >
                No Employees Found
              </td>

            </tr>

          ) : (

            filteredEmployees.map((employee) => (

              <tr
                key={employee._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 break-words">
                  {employee.employeeId}
                </td>

                <td className="p-4 break-words">
                  {employee.fullName}
                </td>

                <td className="p-4 break-words">
                  {employee.email}
                </td>

                <td className="p-4 break-words">
                  {employee.department}
                </td>

                <td className="p-4 break-words">
                  {employee.designation}
                </td>

                <td className="p-4">

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        router.push(`/employees/${employee._id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/employees/${employee._id}/edit`)
                      }
                      className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteEmployee(employee._id)
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </MainLayout>
);
}