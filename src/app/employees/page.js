"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
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

  async function deleteEmployee(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        fetchEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow p-5 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-violet-600">
          Employee Management
        </h1>

        <button
          onClick={() => router.push("/employees/add")}
          className="bg-violet-600 text-white px-5 py-2 rounded-lg"
        >
          Add Employee
        </button>

      </nav>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Departments</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-violet-600 text-white">

              <tr>

                <th className="p-4 text-left">Employee ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Designation</th>
                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500"
                  >
                    No Employees Found
                  </td>

                </tr>

              ) : (

                filteredEmployees.map((employee) => (

                  <tr
                    key={employee._id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {employee.employeeId}
                    </td>

                    <td className="p-4">
                      {employee.fullName}
                    </td>

                    <td className="p-4">
                      {employee.email}
                    </td>

                    <td className="p-4">
                      {employee.department}
                    </td>

                    <td className="p-4">
                      {employee.designation}
                    </td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() =>
                          router.push(`/employees/${employee._id}`)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          router.push(`/employees/${employee._id}/edit`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteEmployee(employee._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}