import Team from "@/models/Team";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        const teams = await Team.find();
        return NextResponse.json(teams, { status: 200 });   
    }
    catch (error){
        console.error("Error fetching teams:", error);
        return NextResponse.json({erro: "Failed to fetch teams"}, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const newTeam = new Team(data);
        await newTeam.save();
        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
}