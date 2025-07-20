import Project from "@/models/project";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";

// GET: Fetch all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
