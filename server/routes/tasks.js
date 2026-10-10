const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/auth');

const router = express.Router();
router.use(protect); // every task route needs a logged in user

// GET /api/tasks?status=todo&priority=high&search=foo
router.get('/', async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.search) {
    // escape regex characters so a search like "(" doesn't crash the query
    const safe = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.title = new RegExp(safe, 'i');
  }
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  try {
    const task = await Task.create({
      user: req.user._id, title, description, priority, status, dueDate: dueDate || undefined
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    // filtering by user as well so nobody can edit someone else's task
    const { user, _id, ...updates } = req.body; // never let the client change the owner
    if (updates.dueDate === '') updates.dueDate = null;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
