"use client";
import { useEffect, useState } from "react";

export default function AsetPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: null,
    merek: "",
    serial: "",
    kondisi: "",
    status: "",
  });

  const getData = async () => {
    const res = await fetch("/api/aset");
    const json = await res.json();
    setData(json);
  };

  const submitData = async () => {
    const payload = {
      merek: form.merek,
      serial: form.serial,
      kondisi: form.kondisi,
      status: form.status,
    };

    if (form.id) {
      await fetch(`/api/aset/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/aset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setForm({ id: null, merek: "", serial: "", kondisi: "", status: "" });
    getData();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      merek: item.merek,
      serial: item.serial,
      kondisi: item.kondisi,
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/aset/${id}`, {
      method: "DELETE",
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Aset Laptop</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2"
          placeholder="Merek Laptop"
          value={form.merek}
          onChange={(e) => setForm({ ...form, merek: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Serial Number"
          value={form.serial}
          onChange={(e) => setForm({ ...form, serial: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Kondisi (baik/rusak)"
          value={form.kondisi}
          onChange={(e) => setForm({ ...form, kondisi: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Status (tersedia/disewa/rusak)"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <button
          onClick={submitData}
          className="col-span-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          {form.id ? "Update Aset" : "Tambah Aset"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Merek</th>
              <th className="p-2">Serial</th>
              <th className="p-2">Kondisi</th>
              <th className="p-2">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{item.merek}</td>
                <td className="p-2">{item.serial}</td>
                <td className="p-2">{item.kondisi}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Belum ada data aset.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
