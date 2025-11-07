export default function Topbar() {

     const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4">
      <div className="font-semibold text-gray-800">Welcome 👋</div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-500">{user?.business?.name || "Your Business"}</div>
        <img
          src={user?.business?.imageUrl}
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
}
