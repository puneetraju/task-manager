import mongoose from 'mongoose';

/**
 * Defines the schema for a task in the database.
 * Each task has a title, description, due date, and a status.
 */
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

/**
 * Task model based on the defined schema.
 * Uses an existing model if available to prevent redefining it.
 */
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;