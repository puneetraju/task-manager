'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateTask } from '@/app/actions/taskActions';
import Header from '@/components/Header';

export default function EditTask() {
  const router = useRouter();
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task details when component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error('Failed to fetch task');
        const data = await res.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await updateTask(id, formData);
      router.push('/');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-300 to-purple-200">
      <Header />
      <div className="p-4">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center uppercase">Edit Task</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={task.title}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-blue-500 hover:ring-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={task.description}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-blue-500 hover:ring-2 md:min-h-[100px]"
                required
              />
              <input
                type="date"
                name="dueDate"
                defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-2 hover:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Update Task
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
