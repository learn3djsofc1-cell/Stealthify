import { type ReactNode } from 'react';
import Card from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  glow?: string;
  accentColor?: string;
}

export default function StatCard({ label, value, icon, trend, glow, accentColor }: StatCardProps) {
  return (
    <Card hover glow={glow}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-black/60 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-xl sm:text-3xl font-bold text-black tracking-tight truncate">{value}</p>
          {trend && (
            <p className="mt-1.5 text-xs text-black/55 truncate">{trend}</p>
          )}
        </div>
        <div
          className="rounded-xl p-2 sm:p-2.5 shrink-0"
          style={{
            backgroundColor: accentColor ? `${accentColor}20` : 'rgba(0,0,0,0.06)',
            border: `1px solid ${accentColor ? `${accentColor}40` : 'rgba(0,0,0,0.12)'}`,
            color: accentColor || 'rgba(0,0,0,0.65)',
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
