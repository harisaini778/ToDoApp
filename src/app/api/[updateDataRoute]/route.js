
// api/[updateDataRoute]/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionSrt } from "../../lib/db";
import { todoData } from "../../lib/model/todoSchema";

export async function PUT(request, content) {
    const todoId = content.params.updateDataRoute;
    const filter = { _id: todoId };
    const payload = await request.json();
    await mongoose.connect(connectionSrt);
    try {
        const result = await todoData.findOneAndUpdate(filter, payload, { new: true });
        console.log("In Route.js PUT request has given this : ", result);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error occurred during PUT request: ", error);
        return NextResponse.error({
            status: 500,
            message: 'Internal server error occurred while processing the request',
        });
    }
}

export async function DELETE(request, content) {
    const todoId = content.params.updateDataRoute;
    const filter = { _id: todoId }
    try {
        await mongoose.connect(connectionSrt);
        const result = await todoData.deleteOne(filter);
        console.log("In Route.js DELETE request has given this: ", result);
        if (!result) {
            return NextResponse.error({
                status: 404,
                message: 'Task not found with the provided ID',
            });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error occurred during DELETE request: ", error);
        return NextResponse.error({
            status: 500,
            message: 'Internal server error occurred while processing the request',
        });
    }
}
