import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  const adminRoutes = ['/dashboard', '/laptop', '/penyewa', '/transaksi', '/pengembalian']

  const isProtected = adminRoutes.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtected && (!token || role !== 'admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
