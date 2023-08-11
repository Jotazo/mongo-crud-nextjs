// const API_URI = process.env.NEXT_PUBLIC_API_URI;
const API_URI = process.env.NEXT_PUBLIC_API_URI || "/api";

export const getTasks = async () => {
  const res = await fetch(`${API_URI}/tasks`, {
    method: "GET",
    cache: "no-store",
  });

  return await res.json();
};

export const getTask = async (id) => {
  const res = await fetch(`${API_URI}/tasks/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) return { error: data, response: null };
  return { error: null, response: data };
};

export const createTask = async (newTask) => {
  const res = await fetch(`${API_URI}/tasks`, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) return { error: data, response: null };
  return { error: null, response: data };
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URI}/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) return { error: data, response: null };
  return { error: null, response: data };
};

export const updateTask = async (id, taskUpdates) => {
  const res = await fetch(`${API_URI}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskUpdates),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log('data :>> ', data);

  if (!res.ok) return { error: data, response: null };
  return { error: null, response: data };
};
