"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    getEmployee();
  }, []);

  async function getEmployee() {
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
    }

    setLoading(false);
  }

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
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow p-5 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-violet-600">
          Edit Employee
        </h1>

        <button
          onClick={() => router.push("/employees")}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </nav>

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold"
          >
            Update Employee
          </button>

        </form>

      </div>

    </div>
  );
}