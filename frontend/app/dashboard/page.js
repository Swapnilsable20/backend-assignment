"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Session expired or unauthorized. Please login again.");
      router.push("/login");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const updateTask = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Create New Task</h3>
      <form onSubmit={createTask}>
        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <br />
        <input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <br />
        <button type="submit">Add Task</button>
      </form>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <b>{task.title}</b> - {task.status}
            <button onClick={() => updateTask(task._id, "completed")}>✔</button>
            <button onClick={() => deleteTask(task._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
