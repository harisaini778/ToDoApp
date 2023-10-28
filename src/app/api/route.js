import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { conncetionSrt } from "../lib/db";
import { todoData } from "../lib/model/todoSchema";

export async function GET() {
    await mongoose.connect(conncetionSrt);
    const data = await todoData.find();
    console.log("In Route.js GET request has given this : ", data);
    return NextResponse.json(data);
}

export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(conncetionSrt);
    const postData = new todoData(payload);
    const result = await postData.save();
    console.log("In Route.js POST request has given this : ", result);
    return NextResponse.json(result);
}