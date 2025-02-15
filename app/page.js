import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
}