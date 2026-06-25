import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Employee from "@/models/Employee";

// ===============================
// GET ALL EMPLOYEES
// ===============================

export async function GET() {
  try {
    await connectDB();

    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      employees,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// ADD EMPLOYEE
// ===============================

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      employeeId,
      fullName,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
    } = body;

    // Required Fields

    if (
      !employeeId ||
      !fullName ||
      !email ||
      !phone ||
      !department ||
      !designation ||
      !salary ||
      !joiningDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate Employee ID

    const employeeExists = await Employee.findOne({
      employeeId,
    });

    if (employeeExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee ID already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate Email

    const emailExists = await Employee.findOne({
      email,
    });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Create Employee

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Employee Added Successfully",
        employee,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}