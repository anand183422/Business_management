import { useEffect, useMemo, useState } from "react";
import { createProduct, deleteProduct, fetchProductsByAdmin, updateProduct } from "../api/endpoints";

export default function ProductsPage() {
  const user = useMemo(()=>JSON.parse(localStorage.getItem("user")||"null"),[]);
  const adminId = user?.id;

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name:"", type:"", description:"", price:"" });

  const load = async () => {
    const res = await fetchProductsByAdmin(adminId);
    setProducts(res.data || []);
  };

  useEffect(()=>{ if(adminId) load(); }, [adminId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price || 0) };
    if (editingId) await updateProduct(adminId, { ...payload, id: editingId });
    else await createProduct(adminId, payload);
    setForm({ name:"", type:"", description:"", price:"" });
    setEditingId(null);
    load();
  };

  const onEdit = (p) => {
    setForm({ name: p.name, type: p.type || "", description: p.description || "", price: p.price });
    setEditingId(p.id);
  };

  const onDelete = async (id) => { await deleteProduct(id); load(); };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Products</h1>

      <form onSubmit={onSubmit} className="bg-white rounded-2xl border p-5 mb-8 grid md:grid-cols-4 gap-4">
        <input className="border rounded-xl p-3" placeholder="Product Name"
          value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required/>
        <input className="border rounded-xl p-3" placeholder="Type (e.g. Snack)"
          value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})} required/>
        <input className="border rounded-xl p-3" placeholder="Description"
          value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} required/>
        <input type="number" className="border rounded-xl p-3" placeholder="Price"
          value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} required/>
        <div className="md:col-span-4">
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl">
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {products.map((p)=>(
          <div key={p.id} className="bg-white rounded-2xl border p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{p.name} <span className="text-gray-400">({p.type})</span></div>
              <div className="text-sm text-gray-600">{p.description}</div>
              <div className="mt-1">₹{p.price}</div>
            </div>
            <div className="space-x-3">
              <button onClick={()=>onEdit(p)} className="text-indigo-600 hover:underline">Edit</button>
              <button onClick={()=>onDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
