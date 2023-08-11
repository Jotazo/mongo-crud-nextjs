"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getTask, updateTask } from "@/app/_services/tasks";
import { FORM_TYPES } from "@/app/constants";

import FormTask from "@/app/components/FormTask";
import Loader from "@/app/components/Loader";
import Error from "@/app/components/Error";

export default function UpdateTaskPage() {
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  const onSubmit = async (task) => {
    const { _id: id, title, description } = task;
    const { error } = await updateTask(id, { title, description });
    if (error) {
      const err = {};
      error.errors.forEach(({ path, type, message }) => {
        err[path] = {
          type,
          message,
        };
      });
      return err;
    }
  };

  useEffect(() => {
    getTask(params.id)
      .then(({ error, response }) => {
        if (error) return setError(error);
        setTaskToUpdate(response);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <Loader />;

  if (error) return <Error message={error.message} />;

  return (
    <FormTask
      type={FORM_TYPES.update}
      initialState={taskToUpdate}
      onSubmit={onSubmit}
    />
  );
}
