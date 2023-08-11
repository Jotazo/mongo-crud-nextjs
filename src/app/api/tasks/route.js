import { NextResponse } from "next/server";

import "../db/mongoose";
import Task from "../models/Task";

import { handleError } from "../utils/errorsHandler";

export async function GET() {
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTask = new Task(body);
    const savedTask = await newTask.save();

    return NextResponse.json(savedTask);
  } catch (error) {
    const { status, message, errors } = handleError(error);
    if (errors) return NextResponse.json({ errors }, { status });
    return NextResponse.json({ message }, { status });
  }
}
