"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EmployeeDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    getEmployee();
  }, []);

  async function getEmployee() {
    try {
      const response = await fetch(`/api/employees/${id}`);
      const data = await response.json();

      if (data.success) {
        setEmployee(data.employee);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Loading Employee...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-white shadow p-5 flex justify-between">

        <h1 className="text-2xl font-bold text-violet-600">
          Employee Details
        </h1>

        <button
          onClick={() => router.push("/employees")}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </nav>

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <h3 className="font-semibold text-gray-500">
              Employee ID
            </h3>
            <p>{employee.employeeId}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Full Name
            </h3>
            <p>{employee.fullName}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Email
            </h3>
            <p>{employee.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Phone
            </h3>
            <p>{employee.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Department
            </h3>
            <p>{employee.department}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Designation
            </h3>
            <p>{employee.designation}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Salary
            </h3>
            <p>₹ {employee.salary}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">
              Joining Date
            </h3>
            <p>
              {new Date(employee.joiningDate).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          <button
            onClick={() =>
              router.push(`/employees/${employee._id}/edit`)
            }
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
          >
            Edit Employee
          </button>

          <button
            onClick={() => router.push("/employees")}
            className="bg-violet-600 text-white px-6 py-3 rounded-lg"
          >
            Employee List
          </button>

        </div>

      </div>

    </div>
  );
}