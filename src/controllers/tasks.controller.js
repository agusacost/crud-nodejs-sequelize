import { Task } from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
    });
    if (!task)
      return res
        .status(500)
        .json({ status: "error", message: "Couldn't find task" });

    return res.status(200).json({ status: "success", data: task });
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

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done, projectId } = req.body;
    const taskExists = await Task.findByPk(id);
    if (!taskExists) {
      return res
        .status(500)
        .json({ status: "error", message: "The task doesn't exists" });
    }
    await Task.update(
      {
        name,
        done,
        projectId,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ status: "success" });
  } catch (error) {}
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskExists = Task.findByPk(id);
    if (!taskExists) {
      return res
        .status(500)
        .json({ status: "error", message: "The task doesn't exists" });
    }
    await Task.destroy({
      where: { id, },
    });
    return res.status(200).json({status: 'success', message: 'Task delete successfully'});
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
