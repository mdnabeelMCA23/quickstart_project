const Task = require("../models/Task");
const mongoose = require("mongoose");

/**
 * CREATE TASK
 */
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.user.id)
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * GET TASKS (with filters)
 */
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search, sort } = req.query;

    let query = {
      userId: new mongoose.Types.ObjectId(req.user.id)
    };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    let tasks = Task.find(query);

    if (sort) tasks = tasks.sort(sort);

    res.json(await tasks);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * UPDATE TASK
 */
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * DELETE TASK
 */
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ msg: "Deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * CHANGE STATUS
 */
exports.changeStatus = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: req.body.status },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
