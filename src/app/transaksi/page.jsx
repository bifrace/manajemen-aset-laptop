'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TransaksiList() {
  const [transaksi, setTransaksi] = useState([])

  useEffect(() => {
    axios.get('/api/transaksi').then(res => setTransaksi(res.data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi Aktif</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Nama Penyewa</th>
            <th className="p-2 text-left">Laptop</th>
            <th className="p-2 text-left">Tanggal Pinjam</th>
            <th className="p-2 text-left">Tanggal Kembali</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.penyewa?.nama}</td>
              <td className="p-2">{item.laptop?.nama}</td>
              <td className="p-2">{item.tanggalPinjam}</td>
              <td className="p-2">{item.tanggalKembali || '-'}</td>
              <td className="p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
