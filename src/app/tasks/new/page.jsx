'use client'

import { createTask } from "@/app/_services/tasks";
import { FORM_TYPES } from "@/app/constants";

import FormTask from "@/app/components/FormTask";

const initialState = {
  title: "",
  description: "",
};

export default function NewTaskPage() {
  const onSubmit = async (task) => {
    const { error } = await createTask(task);
    if (error) {
      const err = {};
      error.errors.forEach(({ path, type, message }) => {
        err[path] = {
          type,
          message,
        };
      });
      return err
    }

  };
  return <FormTask type={FORM_TYPES.new} initialState={initialState} onSubmit={onSubmit} />;
}
