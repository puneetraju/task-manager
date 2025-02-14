import Task from '@/models/Task';
import dbConnect from '@/lib/db';

/**
 * Handles GET requests to retrieve a specific task by its ID.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} params - Route parameters containing the task ID.
 * @returns {Response} A JSON response containing the requested task.
 */
export async function GET(request, { params }) {
  await dbConnect();
  const task = await Task.findById(params.id);
  return Response.json(task);
}