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
    <Card tilt hover glow={glow}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</p>
          {trend && (
            <p className="mt-1.5 text-xs text-white/30">{trend}</p>
          )}
        </div>
        <div
          className="rounded-xl p-2.5"
          style={{
            backgroundColor: accentColor ? `${accentColor}15` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${accentColor ? `${accentColor}30` : 'rgba(255,255,255,0.06)'}`,
            color: accentColor || 'rgba(255,255,255,0.4)',
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
