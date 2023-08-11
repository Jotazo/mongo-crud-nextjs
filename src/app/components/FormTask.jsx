"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { deleteTask } from "@/app/_services/tasks";

import { FORM_TYPES } from "../constants";
import { TOAST_MESSAGES, TOAST_OPTIONS } from "../utils/toastify";
import { showDeleteModal } from "../utils/sweetAlert";

import "@sweetalert2/theme-dark/dark.css";
import styles from "./FormTask.module.css";

const TITLE = {
  New: "Create Task",
  Update: "Update Task",
};

const TEXT_BTN = {
  New: "Save",
  Update: "Update",
};

export default function FormTask({ type, initialState, onSubmit }) {
  const router = useRouter();

  const [task, setTask] = useState(initialState);

  const [errors, setErrors] = useState({
    title: null,
    description: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === FORM_TYPES.new) {
      const errors = await onSubmit(task);
      if (errors) {
        setErrors(errors);
        return;
      }
      toast.success(TOAST_MESSAGES.taskCreated, TOAST_OPTIONS);
    } else {
      const errors = await onSubmit(task);
      if (errors) {
        setErrors(errors);
        return;
      }
      toast.success(TOAST_MESSAGES.taskUpdated, TOAST_OPTIONS);
    }
    router.push("/");
    router.refresh();
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleDelete = async () => {
    const result = await showDeleteModal();
    if (result.isConfirmed) {
      console.log('task :>> ', task);
      const { _id: id } = task;
      await deleteTask(id);
      toast.success(TOAST_MESSAGES.taskDeleted, TOAST_OPTIONS);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="container-centered-layout flex-col">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="w-full md:w-[500px] flex flex-col gap-8 bg-gray-950 p-12 rounded-xl"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between">
          <h1 className="font-bold text-2xl md:text-3xl">{TITLE[type]}</h1>
          {type === FORM_TYPES.update && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          )}
        </header>
        <div className="relative">
          <input
            className={`${styles.input} ${errors?.title && styles.errorInput}`}
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={task?.title}
          />
          <small className="absolute left-0 bottom-[-1.25rem] text-red-500 ">
            {errors?.title?.message}
          </small>
        </div>
        <div className="relative">
          <textarea
            className={`${styles.input} ${
              errors?.description && styles.errorInput
            } resize-none`}
            name="description"
            placeholder="Description"
            rows={3}
            onChange={handleChange}
            value={task?.description}
          ></textarea>
          <small className="absolute left-0 bottom-[-.8rem] text-red-500">
            {errors.description?.message}
          </small>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
        >
          {TEXT_BTN[type]}
        </button>
      </motion.form>
    </div>
  );
}
