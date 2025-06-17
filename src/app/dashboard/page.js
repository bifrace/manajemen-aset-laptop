"use client";
import { useEffect, useState } from "react";

export default function DashboardAdmin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Memuat dashboard...</p>;

  const { statistik, logTerbaru } = data;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* STATISTIK */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(statistik).map(([key, val]) => (
          <div key={key} className="bg-white shadow rounded p-4">
            <p className="text-sm text-gray-500">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-xl font-bold">{val}</p>
          </div>
        ))}
      </div>

      {/* LOG TERBARU */}
      <h2 className="text-xl font-semibold mb-3">Log Transaksi Terbaru</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Aset</th>
              <th className="p-2">Penyewa</th>
              <th className="p-2">Tanggal Pinjam</th>
              <th className="p-2">Tanggal Kembali</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logTerbaru.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.aset.nama}</td>
                <td className="p-2">{t.penyewa.nama}</td>
                <td className="p-2">{new Date(t.tanggalPinjam).toLocaleDateString()}</td>
                <td className="p-2">{t.tanggalKembali ? new Date(t.tanggalKembali).toLocaleDateString() : "-"}</td>
                <td className="p-2">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
