import Team from "@/models/Team";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Team ID is required" },
        { status: 400 }
      );
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return NextResponse.json(
        { success: false, error: "Team not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedTeam 
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Update failed",
        details: error.errors 
      },
      { status: 500 }
    );
  }
}

// DELETE team by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedTeam = await Team.findByIdAndDelete(params.id);

    if (!deletedTeam) {
      return NextResponse.json(
        { success: false, error: "Team not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Team deleted successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Deletion failed" },
      { status: 500 }
    );
  }
}