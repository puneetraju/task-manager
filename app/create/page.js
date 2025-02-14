'use client';
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/actions/taskActions';
import Header from '@/components/Header';
import { useState } from 'react';

export default function CreateTask() {
  const router = useRouter();
  const [error, setError] = useState(null);

  /**
   * Handles form submission to create a new task.
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await createTask(formData);
      router.push('/');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-300 to-green-300">
      <Header />
      <div className="p-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center uppercase">Create Task</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-blue-500 hover:ring-2"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-blue-500 hover:ring-2 md:min-h-[100px]"
              required
            />
            <input
              type="date"
              name="dueDate"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 hover:ring-2 hover:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
