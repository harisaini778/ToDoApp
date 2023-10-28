import mongoose from "mongoose";

const todoModel = new mongoose.Schema({
    title: String,
    date: String,
    description: String,
    markedAs: String
});

export const todoData = mongoose.models.todoData || mongoose.model("todoData", todoModel);