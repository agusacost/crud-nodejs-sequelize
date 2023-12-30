import { Task } from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { name, done, projectId } = req.body;
  try {
    const newTask = await Task.create({
      name,
      done,
      projectId,
    });
    return res.status(201).json({
      status: "success",
      message: "New task added",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
