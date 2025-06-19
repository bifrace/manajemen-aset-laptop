'use client'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function DashboardAdmin() {
  const [aset, setAset] = useState([])
  const [penyewa, setPenyewa] = useState([])
  const [transaksi, setTransaksi] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [asetRes, penyewaRes, trxRes] = await Promise.all([
        fetch('/api/aset').then(res => res.json()),
        fetch('/api/penyewa').then(res => res.json()),
        fetch('/api/transaksi').then(res => res.json())
      ])
      setAset(asetRes)
      setPenyewa(penyewaRes)
      setTransaksi(trxRes)
    }
    fetchData()
  }, [])

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Aset Masuk',
        data: [19, 41, 48, 10, 45, 39],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        label: 'Transaksi',
        data: [11, 39, 39, 18, 11, 38],
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      }
    ]
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Aset" value={aset.length} />
        <Card title="Total Penyewa" value={penyewa.length} />
        <Card title="Transaksi Aktif" value={transaksi.length} />
      </div>

      <div className="bg-white p-6 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-4">Statistik 6 Bulan Terakhir</h2>
        <Bar data={chartData} />
      </div>

      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Log Transaksi Terbaru</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Penyewa</th>
              <th className="p-2 text-left">Laptop</th>
              <th className="p-2 text-left">Tanggal Pinjam</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.slice(0, 5).map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.penyewa?.nama}</td>
                <td className="p-2">{item.aset?.merek}</td>
                <td className="p-2">{new Date(item.tanggalPinjam).toLocaleDateString()}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
// admin dashboard //