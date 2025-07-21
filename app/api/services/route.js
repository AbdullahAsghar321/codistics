import { NextResponse } from "next/server";
import Service from "@/models/Service"; // ✅ renamed
import dbConnect from "@/lib/mongoose";

// GET: Fetch all services
export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find(); // ✅ use `Service`
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new service
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
