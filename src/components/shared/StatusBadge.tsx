import { type DocStatus, statusLabels, statusColors } from '@/data/mockData';

export default function StatusBadge({ status }: { status: DocStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
