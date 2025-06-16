"use client";
import { useEffect, useState } from "react";

export default function AsetPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: null, nama: "", deskripsi: "", lokasi: "", status: "" });

  const getData = async () => {
    const res = await fetch("/api/aset");
    setData(await res.json());
  };

  const submitData = async () => {
    const method = form.id ? "PUT" : "POST";

    await fetch("/api/aset", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ id: null, nama: "", deskripsi: "", lokasi: "", status: "" });
    getData();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      nama: item.nama,
      deskripsi: item.deskripsi,
      lokasi: item.lokasi,
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    await fetch("/api/aset", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Aset Laptop</h1>

      {/* FORM INPUT */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input className="border p-2" placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
        <input className="border p-2" placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
        <input className="border p-2" placeholder="Lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} />
        <input className="border p-2" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <button onClick={submitData} className="col-span-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">
          {form.id ? "Update Aset" : "Tambah Aset"}
        </button>
      </div>

      {/* TABEL INTERAKTIF */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Nama</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Lokasi</th>
              <th className="p-2">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{item.nama}</td>
                <td className="p-2">{item.deskripsi}</td>
                <td className="p-2">{item.lokasi}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Hapus</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">Belum ada data aset.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
