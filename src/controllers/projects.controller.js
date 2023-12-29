import { where } from "sequelize";
import { Project } from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(500).json({ status: "error", message: error.message });
    return res
      .status(200)
      .json({ status: "success", message: "Project", data: project });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;
  try {
    const newProject = await Project.create({
      name,
      priority,
      description,
    });
    return res.status(201).json({
      status: "success",
      message: "New project added",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectExist = await Project.findByPk(id);
    if (!projectExist)
      return res
        .status(404)
        .json({ status: "error", message: "The project doesn't exists" });

    const { name, priority, description } = req.body;
    const updateProject = await Project.update(
      {
        name,
        priority,
        description,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: "success",
      message: "Project updated succesfully",
    });
    console.log(updateProject);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
