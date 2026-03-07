import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#050505]">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
