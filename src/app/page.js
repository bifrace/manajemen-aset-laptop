"use client";
import { useEffect, useState } from "react";

export default function AsetPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", deskripsi: "", lokasi: "", status: "" });

  const getData = async () => {
    const res = await fetch("/api/aset");
    setData(await res.json());
  };

  const submitData = async () => {
    await fetch("/api/aset", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ nama: "", deskripsi: "", lokasi: "", status: "" });
    getData();
  };

  useEffect(() => { getData(); }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Aset Laptop</h1>
      <div className="grid grid-cols-2 gap-4">
        <input className="border p-2" placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
        <input className="border p-2" placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
        <input className="border p-2" placeholder="Lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} />
        <input className="border p-2" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <button onClick={submitData} className="col-span-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">
          Tambah Aset
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {data.map((aset) => (
          <div key={aset.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{aset.nama}</p>
              <p className="text-sm text-gray-600">{aset.lokasi}</p>
            </div>
            <p className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{aset.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
