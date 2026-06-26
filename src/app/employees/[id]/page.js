"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function EmployeeDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEmployee() {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();

        if (data.success) {
          setEmployee(data.employee);
        } else {
          alert(data.message);
          router.push("/employees");
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
        router.push("/employees");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getEmployee();
    }
  }, [id, router]);

  // Loading Screen
  if (loading) {
    return (
      <MainLayout title="Employee Details">
        <div className="flex items-center justify-center h-[70vh]">
          <h2
            className="text-2xl font-semibold"
            style={{ color: "#474282" }}
          >
            Loading Employee...
          </h2>
        </div>
      </MainLayout>
    );
  }

  if (!employee) {
    return (
      <MainLayout title="Employee Details">
        <div className="flex items-center justify-center h-[70vh]">
          <h2
            className="text-2xl font-semibold text-red-600"
          >
            Employee not found
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Employee Details">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">

          <div>

            <h2
              className="text-3xl font-bold"
              style={{ color: "#474282" }}
            >
              Employee Details
            </h2>

            <p className="text-gray-600 mt-2">
              View complete employee information.
            </p>

          </div>

          <button
            onClick={() => router.push("/employees")}
            className="px-6 py-3 rounded-lg text-white transition"
            style={{ backgroundColor: "#474282" }}
          >
            Back
          </button>

        </div>

        {/* Details Card */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <p className="text-gray-500 mb-1">
                Employee ID
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.employeeId}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Full Name
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.fullName}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Email Address
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Phone Number
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.phone}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Department
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.department}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Designation
              </p>

              <h3 className="text-lg font-semibold break-words">
                {employee.designation}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Salary
              </p>

              <h3 className="text-lg font-semibold">
                ₹ {employee.salary}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Joining Date
              </p>

              <h3 className="text-lg font-semibold">
                {new Date(employee.joiningDate).toLocaleDateString()}
              </h3>
            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={() =>
                router.push(`/employees/${employee._id}/edit`)
              }
              className="px-6 py-3 rounded-lg text-white transition"
              style={{ backgroundColor: "#474282" }}
            >
              Edit Employee
            </button>

            <button
              onClick={() => router.push("/employees")}
              className="px-6 py-3 rounded-lg border transition"
              style={{
                borderColor: "#474282",
                color: "#474282",
              }}
            >
              Employee List
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}