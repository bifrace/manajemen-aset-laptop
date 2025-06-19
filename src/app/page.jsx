'use client'

import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from '@/app/components/ui/card'
import Navbar from '@/app/components/ui/Navbar'

export default function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  if (!data) return <div className="text-white p-10">Loading...</div>

  const {
    statistik: {
      totalAset,
      asetTersedia,
      asetDisewa,
      asetRusak,
      totalPenyewa,
      transaksiAktif,
      transaksiSelesai
    },
    logTerbaru
  } = data

  const chartData = [
    { name: 'Total Aset', value: totalAset },
    { name: 'Tersedia', value: asetTersedia },
    { name: 'Disewa', value: asetDisewa },
    { name: 'Rusak', value: asetRusak },
    { name: 'Penyewa', value: totalPenyewa },
    { name: 'Aktif', value: transaksiAktif },
    { name: 'Selesai', value: transaksiSelesai }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar role="admin" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Dashboard Statistik</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-500 text-white"><CardContent className="p-4">Total Aset<br />{totalAset}</CardContent></Card>
          <Card className="bg-green-500 text-white"><CardContent className="p-4">Tersedia<br />{asetTersedia}</CardContent></Card>
          <Card className="bg-yellow-400 text-black"><CardContent className="p-4">Disewa<br />{asetDisewa}</CardContent></Card>
          <Card className="bg-red-500 text-white"><CardContent className="p-4">Rusak<br />{asetRusak}</CardContent></Card>
          <Card className="bg-purple-500 text-white"><CardContent className="p-4">Total Penyewa<br />{totalPenyewa}</CardContent></Card>
          <Card className="bg-orange-500 text-white"><CardContent className="p-4">Aktif<br />{transaksiAktif}</CardContent></Card>
          <Card className="bg-slate-600 text-white"><CardContent className="p-4">Selesai<br />{transaksiSelesai}</CardContent></Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">📈 Grafik Aset & Transaksi</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">🕒 Log Transaksi Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-700">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2">Penyewa</th>
                    <th className="p-2">Aset</th>
                    <th className="p-2">Tanggal Pinjam</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logTerbaru.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-400">Tidak ada transaksi baru.</td>
                    </tr>
                  ) : (
                    logTerbaru.map((trx, i) => (
                      <tr key={i} className="hover:bg-gray-900">
                        <td className="p-2">{trx.penyewa.nama}</td>
                        <td className="p-2">{trx.aset.merek}</td>
                        <td className="p-2">{new Date(trx.tanggalPinjam).toLocaleDateString()}</td>
                        <td className="p-2">{trx.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
