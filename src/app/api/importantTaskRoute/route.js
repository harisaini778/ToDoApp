// api/importantTaskRoute

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { ToDoImportant } from "../../lib/model/todoSchema";

export async function GET() {
    await mongoose.connect(connectionSrt);
    const data = await ToDoImportant.find();
    console.log("In Route.js GET request has given this : ", data);
    return NextResponse.json(data);
}

export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionSrt);
    const postData = new ToDoImportant(payload);
    const result = await postData.save();
    console.log("In Route.js POST request has given this : ", result);
    return NextResponse.json(result);
}