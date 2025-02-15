import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={<p></p>}>
        <TaskList />
      </Suspense>
    </div>
  );
}