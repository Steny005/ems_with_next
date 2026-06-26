import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Employee from "@/models/Employee";

// ===============================
// GET SINGLE EMPLOYEE
// ===============================

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      employee,
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
// UPDATE EMPLOYEE
// ===============================

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const employee = await Employee.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Employee Updated Successfully",
      employee,
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
// DELETE EMPLOYEE
// ===============================

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Employee Deleted Successfully",
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