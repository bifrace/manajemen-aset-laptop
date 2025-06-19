'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ role }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">AssetRental</div>
      <div className="hidden md:flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/laptop">Aset</Link>
        <Link href="/penyewa">Penyewa</Link>
        <Link href="/transaksi">Transaksi</Link>
        {role === 'admin' && <Link href="/pengembalian">Pengembalian</Link>}
        <Link href="/login">Login</Link>
      </div>
      <div className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </div>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col gap-4 p-4 md:hidden">
          <Link href="/">Home</Link>
          <Link href="/laptop">Aset</Link>
          <Link href="/penyewa">Penyewa</Link>
          <Link href="/transaksi">Transaksi</Link>
          {role === 'admin' && <Link href="/pengembalian">Pengembalian</Link>}
          <Link href="/login">Login</Link>
        </div>
      )}
    </nav>
  )
}
