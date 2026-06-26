"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
  });

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();

        if (data.success) {
          setFormData({
            employeeId: data.employee.employeeId,
            fullName: data.employee.fullName,
            email: data.employee.email,
            phone: data.employee.phone,
            department: data.employee.department,
            designation: data.employee.designation,
            salary: data.employee.salary,
            joiningDate: data.employee.joiningDate.split("T")[0],
          });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
      }

      setLoading(false);
    }

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Employee Updated Successfully");
        router.push("/employees");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <MainLayout title="Edit Employee">
        <div className="flex items-center justify-center h-[70vh]">
          <h2
            className="text-2xl font-semibold"
            style={{ color: "#474282" }}
          >
            Loading...
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Edit Employee">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h2
            className="text-3xl font-bold"
            style={{ color: "#474282" }}
          >
            Edit Employee
          </h2>

          <p className="text-gray-600 mt-2">
            Update employee information.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <div>
              <label className="block mb-2 font-medium">
                Employee ID
              </label>

              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-4">

              <button
                type="button"
                onClick={() => router.push("/employees")}
                className="px-6 py-3 rounded-lg border"
                style={{
                  borderColor: "#474282",
                  color: "#474282",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-white"
                style={{ backgroundColor: "#474282" }}
              >
                Update Employee
              </button>

            </div>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}