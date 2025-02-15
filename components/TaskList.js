'use client';

import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toggleTaskStatus, deleteTask } from '@/app/actions/taskActions';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * TaskList Component
 * - Fetches and displays tasks
 * - Allows toggling task status
 * - Supports deleting tasks with confirmation
 * - Enables expanding task details
 */
function TaskList() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const router = useRouter();

  // Fetch tasks whenever the search query changes
  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  /**
   * Fetches tasks from the API and sorts them by status and due date
   */
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks?search=${searchQuery}`);
      const data = await res.json();

      // Sort tasks: Pending first, then by due date
      data.sort((a, b) => {
        if (a.status === 'pending' && b.status === 'completed') return -1;
        if (a.status === 'completed' && b.status === 'pending') return 1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  /**
   * Handles toggling task status between 'completed' and 'pending'
   */
  const handleStatusChange = async (id, status) => {
    await toggleTaskStatus(id, status);
    fetchTasks();
  };

  /**
   * Handles deleting a task after confirmation
   */
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevents task expansion on delete click
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-fit">
      {/* Show loading skeleton while fetching data */}
      {loading ? (
        <div className="space-y-4 mx-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="mb-4 h-[85px] bg-gray-300 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-red-600">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`mb-4 mx-8 rounded-lg shadow-md transition-all duration-200 scale-102 ${
              task.status === 'completed'
                ? 'bg-gradient-to-br from-green-200 to-emerald-300 hover:from-green-400 hover:to-green-300'
                : 'bg-gradient-to-br from-yellow-200 to-amber-300 hover:from-yellow-400 hover:to-yellow-200'
            }`}
          >
            {/* Task Header */}
            <div className="pr-0 flex flex-row items-stretch gap-4">
              <div className="flex-1 py-4 pl-4">
                {/* Title and Arrow Container */}
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold truncate overflow-hidden sm:max-w-[350px] md:max-w-[450px]">
                    {task.title}
                  </h3>
                  {/* Arrow Button with Tooltip */}
                  <div
                    className="cursor-pointer relative group"
                    onClick={() => setExpandedTask(expandedTask === task._id ? null : task._id)}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-2 left-8 w-max bg-white  text-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {expandedTask === task._id ? 'Hide description' : 'See description'}
                    </div>
                    {/* Arrow Icon */}
                    {expandedTask === task._id ? (
                      <FaChevronUp className="text-gray-600" />
                    ) : (
                      <FaChevronDown className="text-gray-600" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-blue-700 pt-2">Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}</p>
              </div>

              {/* Status Toggle Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed');
                  }}
                  className={`px-4 py-2 rounded transition-colors duration-200 capitalize text-white ${
                    task.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  {task.status}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex">
                {/* Edit Button */}
                <div
                  className="group flex flex-col justify-center items-center w-[6vw] md:w-[3.5vw] h-full text-orange-400 hover:text-white hover:bg-orange-400 md:hover:w-[7vw] relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/edit/${task._id}`);
                  }}
                >
                  <FaEdit className="group-hover:-translate-y-1 transition-transform" />
                  <span className="absolute top-14 text-sm hidden group-hover:block">Update</span>
                </div>

                {/* Delete Button */}
                <div
                  className="group flex flex-col justify-center items-center w-[6vw] md:w-[3.5vw] h-full hover:bg-red-600 text-red-600 hover:text-white md:hover:w-[7vw] right-round relative"
                  onClick={(e) => handleDelete(task._id, e)}
                >
                  <FaTrash className="group-hover:-translate-y-1 transition-transform" />
                  <span className="absolute top-14 text-sm hidden group-hover:block">Delete</span>
                </div>
              </div>
            </div>

            {/* Task Description Expansion */}
            {expandedTask === task._id && (
              <div className="px-4 pb-4 transition-all duration-300">
                <p className="text-gray-800 break-words">{task.description}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;