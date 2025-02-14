'use server'; 
import Task from '@/models/Task';
import dbConnect from '@/lib/db';

/**
 * Creates a new task and saves it to the database.
 * @param {FormData} formData - The form data containing task details.
 */
export async function createTask(formData) {
  await dbConnect();
  const { title, description, dueDate } = Object.fromEntries(formData);
  const task = new Task({ title, description, dueDate });
  await task.save();
}

/**
 * Deletes a task by its ID.
 * @param {string} id - The ID of the task to delete.
 */
export async function deleteTask(id) {
  await dbConnect();
  await Task.findByIdAndDelete(id);
}

/**
 * Toggles the status of a task.
 * @param {string} id - The ID of the task to update.
 * @param {boolean} status - The new status of the task.
 */
export async function toggleTaskStatus(id, status) {
  await dbConnect();
  await Task.findByIdAndUpdate(id, { status });
}

/**
 * Updates an existing task with new data.
 * @param {string} id - The ID of the task to update.
 * @param {FormData} formData - The form data containing updated task details.
 */
export async function updateTask(id, formData) {
  await dbConnect();
  const { title, description, dueDate } = Object.fromEntries(formData);
  await Task.findByIdAndUpdate(id, { title, description, dueDate });
}

/**
 * Retrieves tasks from the database, optionally filtered by a search query.
 * @param {Request} req - The request object containing query parameters.
 * @param {Response} res - The response object to send the retrieved tasks.
 */
export async function getTasks(req, res) {
  await dbConnect();

  const { search } = req.query;
  const filter = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};

  const tasks = await Task.find(filter)
    .sort({ status: 1, dueDate: 1 }) 
    .exec();

  res.status(200).json(tasks);
}
