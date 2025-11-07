export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow border">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
