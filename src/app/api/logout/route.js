import { NextResponse } from 'next/server';

export async function POST() {
  // Hapus cookie token dengan mengaturnya expired
  const response = NextResponse.json({ message: 'Logout berhasil' });
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // langsung expired
  });

  return response;
}
