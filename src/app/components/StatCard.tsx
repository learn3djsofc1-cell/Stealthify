import { type ReactNode } from 'react';
import Card from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          {trend && (
            <p className="mt-1 text-xs text-white/30">{trend}</p>
          )}
        </div>
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2.5 text-white/40">
          {icon}
        </div>
      </div>
    </Card>
  );
}
