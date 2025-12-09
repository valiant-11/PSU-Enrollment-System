import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export function StatCard({ icon: Icon, title, value, subtitle, color = '#D65A1E' }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      <div className="text-gray-600 mb-1">{title}</div>
      <div className="text-gray-900 mb-2">{value}</div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
    </div>
  );
}
