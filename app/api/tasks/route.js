// import Task from '@/models/Task';
// import dbConnect from '@/lib/db';

// /**
//  * Handles GET requests to retrieve all tasks.
//  * Optionally filters tasks by a search query.
//  *
//  * @param {Request} request - The incoming request object.
//  * @returns {Response} A JSON response containing the filtered tasks.
//  */
// export async function GET(request) {
//   await dbConnect();
//   const { searchParams } = new URL(request.url);
//   const searchQuery = searchParams.get('search') || '';

//   const tasks = await Task.find({
//     $or: [
//       { title: { $regex: searchQuery, $options: 'i' } },
//       { description: { $regex: searchQuery, $options: 'i' } },
//     ],
//   });

//   return Response.json(tasks);
// }


import Task from "@/models/Task";
import dbConnect from "@/lib/db";

/**
 * Handles GET requests to retrieve all tasks.
 * Optionally filters tasks by a search query.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Response} A JSON response containing the filtered tasks.
 */
export async function GET(request) {
  await dbConnect();

  // Use request.nextUrl instead of new URL(request.url)
  const searchQuery = request.nextUrl.searchParams.get("search") || "";

  const tasks = await Task.find({
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ],
  });

  return Response.json(tasks);
}
