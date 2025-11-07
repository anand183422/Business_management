export default function StatCard({ title, value, hint }) {
  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}
