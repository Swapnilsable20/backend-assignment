import express from "express";
import Task from "../models/Task.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Task (only logged-in users)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });
    res.status(201).json({ msg: "Task created", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task (only creator or admin)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Task updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task (only creator or admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-only: view all users' tasks
router.get("/admin/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
