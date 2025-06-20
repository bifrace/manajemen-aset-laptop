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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white pt-20">
      <Navbar role="admin" />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 tracking-tight">📊 Dashboard Statistik</h1>

        {/* GRID Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-blue-600 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Total Aset</h2>
              <p className="text-3xl font-bold">{totalAset}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Tersedia</h2>
              <p className="text-3xl font-bold">{asetTersedia}</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-400 text-black hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Disewa</h2>
              <p className="text-3xl font-bold">{asetDisewa}</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Rusak</h2>
              <p className="text-3xl font-bold">{asetRusak}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Total Penyewa</h2>
              <p className="text-3xl font-bold">{totalPenyewa}</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Aktif</h2>
              <p className="text-3xl font-bold">{transaksiAktif}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-600 hover:scale-105 transition-transform duration-200">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">Selesai</h2>
              <p className="text-3xl font-bold">{transaksiSelesai}</p>
            </CardContent>
          </Card>
        </div>

        {/* Grafik */}
        <Card className="bg-neutral-900 border border-neutral-700 mb-10">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">📈 Grafik Aset & Transaksi</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Log Transaksi */}
        <Card className="bg-neutral-900 border border-neutral-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">🕒 Log Transaksi Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-3 text-left">Penyewa</th>
                    <th className="p-3 text-left">Aset</th>
                    <th className="p-3 text-left">Tanggal Pinjam</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logTerbaru.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-400">
                        Tidak ada transaksi baru.
                      </td>
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
