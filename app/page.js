import Header from '@/components/Header';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <TaskList />
    </div>
  );
}