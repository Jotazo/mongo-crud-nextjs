const { NextResponse } = require("next/server");

import { STATUS } from "../../constants";

import Task from "../../models/Task";

import { handleError } from "../../utils/errorsHandler";

export async function GET(request, { params }) {
  const { id } = params;
  let taskFounded;

  try {
    taskFounded = await Task.findById(id);
  } catch (error) {
    const { status, message } = handleError(error);
    return NextResponse.json({ message }, { status });
  }

  if (!taskFounded) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: STATUS.NotFound }
    );
  }

  return NextResponse.json(taskFounded);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  let taskDeleted;

  try {
    taskDeleted = await Task.findByIdAndDelete(id);
  } catch (error) {
    const { status, message } = handleError(error);
    return NextResponse.json({ message }, { status });
  }

  if (!taskDeleted) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: STATUS.NotFound }
    );
  }
  return NextResponse.json(taskDeleted);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  let taskUpdated;

  try {
    taskUpdated = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    const { status, errors } = handleError(error);
    return NextResponse.json({ errors }, { status });
  }

  if (!taskUpdated) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: STATUS.NotFound }
    );
  }

  return NextResponse.json(taskUpdated);
}
