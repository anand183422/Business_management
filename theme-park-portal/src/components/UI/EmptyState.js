export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="border-2 border-dashed rounded-2xl p-10 text-center bg-white">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
      {action}
    </div>
  );
}
