'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PenyewaList() {
  const [penyewa, setPenyewa] = useState([])

  useEffect(() => {
    axios.get('/api/penyewa').then(res => setPenyewa(res.data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Penyewa</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Nama</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">No. HP</th>
          </tr>
        </thead>
        <tbody>
          {penyewa.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.nama}</td>
              <td className="p-2">{item.email}</td>
              <td className="p-2">{item.telepon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
