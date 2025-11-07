import { DollarSign } from 'lucide-react';

export function BudgetDashboard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-600">预算总览</span>
      </div>
      <div className="text-lg text-gray-900">
        M1 预算: <span className="text-gray-400">￥--- / ￥---</span>
      </div>
    </div>
  );
}
